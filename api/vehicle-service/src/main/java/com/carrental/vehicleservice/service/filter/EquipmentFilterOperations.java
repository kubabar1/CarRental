package com.carrental.vehicleservice.service.filter;

import com.carrental.commons.utils.filtering.model.Filter;
import com.carrental.commons.utils.filtering.specification.operations.impl.DefaultFilterOperations;
import com.carrental.vehicleservice.model.constants.VehicleStatCodeEnum;
import com.carrental.vehicleservice.model.entity.VehicleStatusEntity;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class EquipmentFilterOperations<T> extends DefaultFilterOperations<T> {

    @Override
    public Predicate equalsPredicate(Filter filter, Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        if (root.get(filter.getField()).getJavaType().equals(VehicleStatusEntity.class)) {
            return criteriaBuilder.equal(criteriaBuilder.upper(root.join(filter.getField()).get("vehicleStatusCode")), VehicleStatCodeEnum.valueOf(filter.getValue().toUpperCase()));
        } else {
            return super.equalsPredicate(filter, root, query, criteriaBuilder);
        }
    }
}
