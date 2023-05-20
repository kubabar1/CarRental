package com.carrental.vehicleservice.service.filter;

import com.carrental.commons.utils.filtering.model.Filter;
import com.carrental.commons.utils.filtering.specification.operations.impl.DefaultFilterOperations;
import com.carrental.vehicleservice.model.constants.VehicleStatCodeEnum;
import com.carrental.vehicleservice.model.entity.VehicleStatusEntity;

import javax.persistence.criteria.*;

public class EquipmentFilterOperations<T> extends DefaultFilterOperations<T> {

    @Override
    public Predicate equalsPredicate(Filter filter, Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        String topField = getTopField(filter.getField());
        From<T, ?> rootPath = joinFields(root, filter.getField());
        if (rootPath.get(topField).getJavaType().equals(VehicleStatusEntity.class)) {
            return criteriaBuilder.equal(criteriaBuilder.upper(rootPath.join(topField).get("vehicleStatusCode")), VehicleStatCodeEnum.valueOf(filter.getValue().toUpperCase()));
        } else {
            return super.equalsPredicate(filter, root, query, criteriaBuilder);
        }
    }
}
