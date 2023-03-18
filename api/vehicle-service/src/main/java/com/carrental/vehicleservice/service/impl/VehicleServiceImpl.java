package com.carrental.vehicleservice.service.impl;

import com.carrental.vehicleservice.model.dto.*;
import com.carrental.vehicleservice.model.entity.*;
import com.carrental.vehicleservice.repository.*;
import com.carrental.vehicleservice.service.VehicleRatingService;
import com.carrental.vehicleservice.service.VehicleService;
import org.apache.commons.io.FilenameUtils;
import org.h2.engine.Mode;
import org.modelmapper.ModelMapper;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.Tuple;
import javax.persistence.criteria.*;
import java.io.IOException;
import java.math.BigInteger;
import java.util.*;

import java.util.stream.Collectors;

public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository vehicleRepository;

    private final ColorRepository colorRepository;

    private final BodyTypeRepository bodyTypeRepository;

    private final FuelTypeRepository fuelTypeRepository;

    private final BrandRepository brandRepository;

    private final ModelRepository modelRepository;

    private final VehicleStatusRepository vehicleStatusRepository;

    private final ModelMapper modelMapper;

    private final VehicleRatingService vehicleRatingService;

    private final RabbitTemplate rabbitTemplate;

    private final EntityManager entityManager;


    public VehicleServiceImpl(
            VehicleRepository vehicleRepository,
            ColorRepository colorRepository,
            BodyTypeRepository bodyTypeRepository,
            FuelTypeRepository fuelTypeRepository,
            BrandRepository brandRepository,
            ModelRepository modelRepository,
            VehicleStatusRepository vehicleStatusRepository,
            ModelMapper modelMapper,
            VehicleRatingService vehicleRatingService,
            RabbitTemplate rabbitTemplate,
            EntityManager entityManager
    ) {
        this.vehicleRepository = vehicleRepository;
        this.colorRepository = colorRepository;
        this.bodyTypeRepository = bodyTypeRepository;
        this.fuelTypeRepository = fuelTypeRepository;
        this.brandRepository = brandRepository;
        this.modelRepository = modelRepository;
        this.vehicleStatusRepository = vehicleStatusRepository;
        this.modelMapper = modelMapper;
        this.vehicleRatingService = vehicleRatingService;
        this.rabbitTemplate = rabbitTemplate;
        this.entityManager = entityManager;
    }

    @Override
    public Page<VehicleResponseDTO> getVehicles(Pageable pageable) {
        Page<VehicleEntity> vehicles = vehicleRepository.findAll(pageable);
        List<VehicleResponseDTO> vehicleResponseDTOList = vehicles.getContent()
                .stream()
                .map(vehicleEntity -> modelMapper.map(vehicleEntity, VehicleResponseDTO.class))
                .collect(Collectors.toList());

        vehicleRatingService.setVehiclesAverageRating(vehicleResponseDTOList);

        return new PageImpl<>(vehicleResponseDTOList, pageable, vehicles.getTotalElements());
    }

    @Override
    public Page<VehicleResponseDTO> getBestOffersVehicles(Pageable pageable) {
        Page<VehicleEntity> vehicles = vehicleRepository.findByBestOfferTrue(pageable);
        List<VehicleResponseDTO> vehicleResponseDTOList = vehicles.getContent()
                .stream()
                .map(vehicleEntity -> modelMapper.map(vehicleEntity, VehicleResponseDTO.class))
                .collect(Collectors.toList());
        return new PageImpl<>(vehicleResponseDTOList, pageable, vehicles.getTotalElements());
    }

    @Override
    public Set<VehicleResponseDTO> getAvailableVehicles() {
        return vehicleRepository
                .findAllAvailable()
                .stream()
                .map(vehicleEntity -> modelMapper.map(vehicleEntity, VehicleResponseDTO.class))
                .collect(Collectors.toSet());
    }

    @Override
    public Page<VehicleResponseDTO> getUnavailableVehicles(Pageable pageable) {
        Page<VehicleEntity> vehicleEntities = vehicleRepository.findAllUnavailable(pageable);
        List<VehicleResponseDTO> vehicleResponseDTOS = vehicleEntities
                .getContent()
                .stream()
                .map(vehicleEntity -> modelMapper.map(vehicleEntity, VehicleResponseDTO.class))
                .collect(Collectors.toList());
        return new PageImpl<>(vehicleResponseDTOS, pageable, vehicleEntities.getTotalElements());
    }

    @Override
    public VehicleResponseDTO getVehicleById(Long vehicleId) throws NoSuchElementException {
        VehicleEntity vehicleEntity = vehicleRepository.findById(vehicleId).orElseThrow();
        return modelMapper.map(vehicleEntity, VehicleResponseDTO.class);
    }

    @Override
    public VehicleResponseDTO addVehicle(VehiclePersistDTO vehiclePersistDTO, MultipartFile vehicleImage) throws IOException {
        String vehicleImageName = generateVehicleFileName(vehicleImage);
        VehicleDetailsEntity vehicleDetailsEntityToSave = mapVehicleDetailsDtoToVehicleDetailsEntity(
                vehiclePersistDTO.getVehicleDetailsDTO(),
                vehicleImageName,
                new VehicleDetailsEntity()
        );
        VehicleEntity vehicleEntityToSave = mapVehicleDtoToVehicleEntity(vehiclePersistDTO, new VehicleEntity());
        vehicleEntityToSave.setVehicleDetails(vehicleDetailsEntityToSave);
        VehicleEntity vehicleEntitySaved = vehicleRepository.save(vehicleEntityToSave);

        uploadImage(vehicleImageName, vehicleImage);

        return modelMapper.map(vehicleEntitySaved, VehicleResponseDTO.class);
    }

    @Override
    public OptionDTO addBrand(OptionDTO optionDTO) {
        BrandEntity brandEntity = brandRepository.save(new BrandEntity(optionDTO.getValue()));
        return new OptionDTO(brandEntity.getBrand());
    }

    @Override
    public OptionDTO addBodyType(OptionDTO optionDTO) {
        BodyTypeEntity bodyTypeEntity = bodyTypeRepository.save(new BodyTypeEntity(optionDTO.getValue()));
        return new OptionDTO(bodyTypeEntity.getBodyType());
    }

    @Override
    public OptionDTO addFuelType(OptionDTO optionDTO) {
        FuelTypeEntity fuelTypeEntity = fuelTypeRepository.save(new FuelTypeEntity(optionDTO.getValue()));
        return new OptionDTO(fuelTypeEntity.getFuelType());
    }

    @Override
    public OptionDTO addColor(OptionDTO optionDTO) {
        ColorEntity colorEntity = colorRepository.save(new ColorEntity(optionDTO.getValue()));
        return new OptionDTO(colorEntity.getColor());
    }

    @Override
    public VehicleModelDTO addVehicleModel(VehicleModelDTO vehicleModelDTO) {
        ModelEntity modelEntity = new ModelEntity();
        modelEntity.setBrand(brandRepository.getById(vehicleModelDTO.getBrand()));
        modelEntity.setModel(vehicleModelDTO.getModel());
        return modelMapper.map(modelRepository.save(modelRepository.save(modelEntity)), VehicleModelDTO.class);
    }

    @Override
    public VehicleResponseDTO updateVehicleById(Long vehicleId, VehiclePersistDTO vehiclePersistDTO, MultipartFile vehicleImage) throws NoSuchElementException, IOException {
        VehicleEntity vehicleEntityToUpdate = vehicleRepository.findById(vehicleId).orElseThrow();
        String imageName = vehicleEntityToUpdate.getVehicleDetails().getImageName();
        VehicleDetailsEntity vehicleDetailsEntityToSave = mapVehicleDetailsDtoToVehicleDetailsEntity(
                vehiclePersistDTO.getVehicleDetailsDTO(),
                imageName,
                vehicleEntityToUpdate.getVehicleDetails()
        );
        VehicleEntity vehicleEntityToSave = mapVehicleDtoToVehicleEntity(vehiclePersistDTO, vehicleEntityToUpdate);
        vehicleEntityToSave.setVehicleDetails(vehicleDetailsEntityToSave);

        VehicleEntity vehicleEntitySaved = vehicleRepository.save(vehicleEntityToSave);

        if (vehicleImage != null) {
            uploadImage(imageName, vehicleImage);
        }

        return modelMapper.map(vehicleEntitySaved, VehicleResponseDTO.class);
    }

    @Override
    public VehicleOptionsDTO getVehiclesOptions() {
        VehicleOptionsDTO vehicleOptionsDTO = new VehicleOptionsDTO();
        vehicleOptionsDTO.setBodyTypes(bodyTypeRepository.findAll().stream().map(BodyTypeEntity::getBodyType).collect(Collectors.toSet()));
        vehicleOptionsDTO.setBrands(brandRepository.findAll().stream().map(BrandEntity::getBrand).collect(Collectors.toSet()));
        vehicleOptionsDTO.setColors(colorRepository.findAll().stream().map(ColorEntity::getColor).collect(Collectors.toSet()));
        vehicleOptionsDTO.setFuelTypes(fuelTypeRepository.findAll().stream().map(FuelTypeEntity::getFuelType).collect(Collectors.toSet()));

        Set<LocationResponseDTO> locationResponseDTOS = rabbitTemplate.convertSendAndReceiveAsType(
                "getLocationQueue",
                "",
                new ParameterizedTypeReference<>() {
                }
        );

        vehicleOptionsDTO.setLocations(locationResponseDTOS);

        return vehicleOptionsDTO;
    }

    @Override
    public VehicleOptionsWithAssocCountDTO getVehiclesOptionsWithAssocCnt() {
        VehicleOptionsWithAssocCountDTO vehicleOptionsWithAssocCountDTO = new VehicleOptionsWithAssocCountDTO();
        vehicleOptionsWithAssocCountDTO.setBrands(brandRepository.getBrandsWithAssociatedVehiclesCount());
        vehicleOptionsWithAssocCountDTO.setModels(modelRepository.getModelsWithAssociatedVehicles());
        vehicleOptionsWithAssocCountDTO.setColors(colorRepository.getColorsWithAssociatedVehiclesCount());
        vehicleOptionsWithAssocCountDTO.setBodyTypes(bodyTypeRepository.getBodyTypesWithAssociatedVehiclesCount());
        vehicleOptionsWithAssocCountDTO.setFuelTypes(fuelTypeRepository.getFuelTypesWithAssociatedVehiclesCount());
        return vehicleOptionsWithAssocCountDTO;
    }

    @Override
    public Set<String> getVehicleModelsByBrand(String brand) {
        if (brand != null) {
            return modelRepository.findByBrand(brand);
        }
        return new HashSet<>();
    }

    @Override
    public OptionDTO deleteBrand(String brand) throws EntityNotFoundException {
        BrandEntity brandEntity = brandRepository.findById(brand).orElseThrow();
        brandRepository.delete(brandEntity);
        return new OptionDTO(brandEntity.getBrand());
    }

    @Override
    public OptionDTO deleteModel(String model) throws EntityNotFoundException {
        ModelEntity modelEntity = modelRepository.findById(model).orElseThrow();
        modelRepository.delete(modelEntity);
        return new OptionDTO(modelEntity.getModel());
    }

    @Override
    public OptionDTO deleteBodyType(String bodyType) throws EntityNotFoundException {
        BodyTypeEntity bodyTypeEntity = bodyTypeRepository.findById(bodyType).orElseThrow();
        bodyTypeRepository.delete(bodyTypeEntity);
        return new OptionDTO(bodyTypeEntity.getBodyType());
    }

    @Override
    public OptionDTO deleteFuelType(String fuelType) throws EntityNotFoundException {
        FuelTypeEntity fuelTypeEntity = fuelTypeRepository.findById(fuelType).orElseThrow();
        fuelTypeRepository.delete(fuelTypeEntity);
        return new OptionDTO(fuelTypeEntity.getFuelType());
    }

    @Override
    public OptionDTO deleteColor(String color) throws EntityNotFoundException {
        ColorEntity colorEntity = colorRepository.findById(color).orElseThrow();
        colorRepository.delete(colorEntity);
        return new OptionDTO(colorEntity.getColor());
    }

    @Override
    public Set<VehicleResponseDTO> getAvailableVehiclesByLocation(Long locationId) {
        return vehicleRepository
                .findAllAvailableByLocationId(locationId)
                .stream()
                .map(v -> modelMapper.map(v, VehicleResponseDTO.class))
                .collect(Collectors.toSet());
    }

    private void uploadImage(String vehicleImageName, MultipartFile vehicleImage) throws IOException {
        UploadVehicleImageDTO uploadVehicleImageDTO = new UploadVehicleImageDTO();
        uploadVehicleImageDTO.setImageName(vehicleImageName);
        uploadVehicleImageDTO.setImageFile(vehicleImage.getBytes());
        rabbitTemplate.convertAndSend("uploadVehicleImageQueue", uploadVehicleImageDTO);
    }

    private String generateVehicleFileName(MultipartFile image) {
        return UUID.randomUUID().toString() + "." + FilenameUtils.getExtension(image.getOriginalFilename());
    }

    private VehicleEntity mapVehicleDtoToVehicleEntity(VehiclePersistDTO vehiclePersistDTO, VehicleEntity vehicleEntity) {
        vehicleEntity.setRegistration(vehiclePersistDTO.getRegistration());
        vehicleEntity.setBrand(brandRepository.getById(vehiclePersistDTO.getBrand()));
        vehicleEntity.setModel(modelRepository.getById(vehiclePersistDTO.getModel()));
        vehicleEntity.setDailyFee(vehiclePersistDTO.getDailyFee());
        vehicleEntity.setLocationId(vehiclePersistDTO.getLocationId());
        vehicleEntity.setBestOffer(vehiclePersistDTO.isBestOffer());
        vehicleEntity.setVehicleStatus(vehicleStatusRepository.getById(vehiclePersistDTO.getVehicleStatus()));
        return vehicleEntity;
    }

    private VehicleDetailsEntity mapVehicleDetailsDtoToVehicleDetailsEntity(VehicleDetailsDTO vehicleDetailsDTO, String vehicleImageName, VehicleDetailsEntity vehicleDetailsEntity) {
        vehicleDetailsEntity.setProductionYear(vehicleDetailsDTO.getProductionYear());
        vehicleDetailsEntity.setFuelType(fuelTypeRepository.getById(vehicleDetailsDTO.getFuelType()));
        vehicleDetailsEntity.setPower(vehicleDetailsDTO.getPower());
        vehicleDetailsEntity.setGearbox(vehicleDetailsDTO.getGearbox());
        vehicleDetailsEntity.setFrontWheelDrive(vehicleDetailsDTO.isFrontWheelDrive());
        vehicleDetailsEntity.setDoorsNumber(vehicleDetailsDTO.getDoorsNumber());
        vehicleDetailsEntity.setSeatsNumber(vehicleDetailsDTO.getSeatsNumber());
        vehicleDetailsEntity.setMetallic(vehicleDetailsDTO.isMetallic());
        vehicleDetailsEntity.setImageName(vehicleImageName);
        vehicleDetailsEntity.setDescription(vehicleDetailsDTO.getDescription());
        vehicleDetailsEntity.setColor(colorRepository.getById(vehicleDetailsDTO.getColor()));
        vehicleDetailsEntity.setBodyType(bodyTypeRepository.getById(vehicleDetailsDTO.getBodyType()));
        return vehicleDetailsEntity;
    }
}
