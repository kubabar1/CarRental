package com.carrental.vehicleservice.service.impl;

import com.carrental.vehicleservice.model.dto.AverageRateResponseDTO;
import com.carrental.vehicleservice.model.dto.VehicleResponseDTO;
import com.carrental.vehicleservice.model.entity.VehicleEntity;
import com.carrental.vehicleservice.repository.VehicleRepository;
import com.carrental.vehicleservice.service.FilteringService;
import com.carrental.vehicleservice.service.VehicleRatingService;
import org.modelmapper.ModelMapper;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.carrental.vehicleservice.model.constants.FilteringParamsEnum.*;
import static com.carrental.vehicleservice.model.entity.VehicleDetailsEntity.*;
import static com.carrental.vehicleservice.model.entity.VehicleEntity.*;

public class FilteringServiceImpl implements FilteringService {

    private final EntityManager entityManager;

    private final ModelMapper modelMapper;

    private final VehicleRepository vehicleRepository;

    private final VehicleRatingService vehicleRatingService;

    public FilteringServiceImpl(
            EntityManager entityManager,
            ModelMapper modelMapper,
            VehicleRepository vehicleRepository,
            VehicleRatingService vehicleRatingService
    ) {
        this.entityManager = entityManager;
        this.modelMapper = modelMapper;
        this.vehicleRepository = vehicleRepository;
        this.vehicleRatingService = vehicleRatingService;
    }

    @Override
    public Page<VehicleResponseDTO> filterVehicles(Map<String, String> filtersMap, Pageable pageable) throws NumberFormatException {
        if (filtersMap.isEmpty()) {
            Page<VehicleEntity> vehicleEntityPage = vehicleRepository.findAll(pageable);
            List<VehicleResponseDTO> vehicleResponseDTOList = vehicleEntityPage
                    .getContent()
                    .stream()
                    .map(vehicleEntity -> modelMapper.map(vehicleEntity, VehicleResponseDTO.class))
                    .collect(Collectors.toList());
            return new PageImpl<>(vehicleResponseDTOList, pageable, vehicleEntityPage.getTotalElements());
        }

        CriteriaBuilder cb = entityManager.getCriteriaBuilder();

        CriteriaQuery<VehicleEntity> cq = cb.createQuery(VehicleEntity.class);
        Root<VehicleEntity> vehicle = cq.from(VehicleEntity.class);
        Predicate[] predicates = getVehicleFiltersPredicates(filtersMap, cb, vehicle);
        cq.where(predicates);

        int pageNumber = pageable.getPageNumber();
        int pageSize = pageable.getPageSize();

        TypedQuery<VehicleEntity> query = entityManager.createQuery(cq);
        query.setFirstResult(pageNumber * pageSize);
        query.setMaxResults(pageSize);

        List<VehicleResponseDTO> vehicles = query
                .getResultList()
                .stream()
                .map(vehicleEntity -> modelMapper.map(vehicleEntity, VehicleResponseDTO.class))
                .collect(Collectors.toList());

        CriteriaQuery<Long> criteriaQueryCount = cb.createQuery(Long.class);
        Root<VehicleEntity> vehiclesCount = criteriaQueryCount.from(VehicleEntity.class);
        Predicate[] countPredicates = getVehicleFiltersPredicates(filtersMap, cb, vehiclesCount);
        criteriaQueryCount.where(countPredicates);
        criteriaQueryCount.select(cb.count(vehiclesCount));
        long totalVehiclesCount = entityManager.createQuery(criteriaQueryCount).getSingleResult();

        vehicleRatingService.setVehiclesAverageRating(vehicles);

        return new PageImpl<>(vehicles, pageable, totalVehiclesCount);
    }

    private Predicate[] getVehicleFiltersPredicates(
            Map<String, String> filtersMap,
            CriteriaBuilder cb,
            Root<VehicleEntity> vehicleEntityRoot
    ) {
        String brand = filtersMap.get(BRAND_FIELD_FILTER.getFilterName());
        String model = filtersMap.get(MODEL_FIELD_FILTER.getFilterName());
        String bodyType = filtersMap.get(BODY_TYPE_FIELD_FILTER.getFilterName());
        String color = filtersMap.get(COLOR_FIELD_FILTER.getFilterName());
        String dailyFeeFrom = filtersMap.get(DAILY_FEE_FROM_FILTER.getFilterName());
        String seatsNumberFrom = filtersMap.get(SEATS_NUMBER_FROM_FILTER.getFilterName());
        String doorsNumberFrom = filtersMap.get(DOORS_NUMBER_FROM_FILTER.getFilterName());
        String productionYearFrom = filtersMap.get(PRODUCTION_YEAR_FROM_FILTER.getFilterName());
        String dailyFeeTo = filtersMap.get(DAILY_FEE_TO_FILTER.getFilterName());
        String seatsNumberTo = filtersMap.get(SEATS_NUMBER_TO_FILTER.getFilterName());
        String doorsNumberTo = filtersMap.get(DOORS_NUMBER_TO_FILTER.getFilterName());
        String productionYearTo = filtersMap.get(PRODUCTION_YEAR_TO_FILTER.getFilterName());

        List<Predicate> predicates = new ArrayList<>();

        if (brand != null) {
            predicates.add(cb.like(cb.upper(vehicleEntityRoot.get(BRAND_FIELD)), "%" + brand.toUpperCase() + "%"));
        }
        if (model != null) {
            predicates.add(cb.like(cb.upper(vehicleEntityRoot.get(MODEL_FIELD)), "%" + model.toUpperCase() + "%"));
        }
        if (bodyType != null) {
            predicates.add(cb.like(cb.upper(vehicleEntityRoot.get(VEHICLE_DETAILS_FIELD).get(BODY_TYPE_FIELD)), "%" + bodyType.toUpperCase() + "%"));
        }
        if (color != null) {
            predicates.add(cb.like(cb.upper(vehicleEntityRoot.get(VEHICLE_DETAILS_FIELD).get(COLOR_FIELD)), "%" + color.toUpperCase() + "%"));
        }
        if (dailyFeeFrom != null) {
            predicates.add(cb.ge(vehicleEntityRoot.get(DAILY_FEE_FIELD), Double.valueOf(dailyFeeFrom)));
        }
        if (dailyFeeTo != null) {
            predicates.add(cb.le(vehicleEntityRoot.get(DAILY_FEE_FIELD), Double.valueOf(dailyFeeTo)));
        }
        if (seatsNumberFrom != null) {
            predicates.add(cb.ge(vehicleEntityRoot.get(VEHICLE_DETAILS_FIELD).get(SEATS_NUMBER_FIELD), Double.valueOf(seatsNumberFrom)));
        }
        if (seatsNumberTo != null) {
            predicates.add(cb.le(vehicleEntityRoot.get(VEHICLE_DETAILS_FIELD).get(SEATS_NUMBER_FIELD), Double.valueOf(seatsNumberTo)));
        }
        if (productionYearFrom != null) {
            predicates.add(cb.ge(vehicleEntityRoot.get(VEHICLE_DETAILS_FIELD).get(PRODUCTION_YEAR_FIELD), Double.valueOf(productionYearFrom)));
        }
        if (productionYearTo != null) {
            predicates.add(cb.le(vehicleEntityRoot.get(VEHICLE_DETAILS_FIELD).get(PRODUCTION_YEAR_FIELD), Double.valueOf(productionYearTo)));
        }
        if (doorsNumberFrom != null) {
            predicates.add(cb.ge(vehicleEntityRoot.get(VEHICLE_DETAILS_FIELD).get(DOORS_NUMBER_FIELD), Double.valueOf(doorsNumberFrom)));
        }
        if (doorsNumberTo != null) {
            predicates.add(cb.le(vehicleEntityRoot.get(VEHICLE_DETAILS_FIELD).get(DOORS_NUMBER_FIELD), Double.valueOf(doorsNumberTo)));
        }

        Predicate[] pr = new Predicate[predicates.size()];
        predicates.toArray(pr);

        return pr;
    }
}
