package com.carrental.bookingservice.service.impl.filter;

import com.carrental.bookingservice.model.constants.BookingStateCodeEnum;
import com.carrental.bookingservice.model.entity.BookingStateEntity;
import com.carrental.commons.utils.filtering.model.Filter;
import com.carrental.commons.utils.filtering.specification.operations.impl.DefaultFilterOperations;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class BookingFilterOperation<T> extends DefaultFilterOperations<T> {

    @Override
    public Predicate equalsPredicate(Filter filter, Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        if (root.get(filter.getField()).getJavaType().equals(BookingStateEntity.class)) {
            return criteriaBuilder.equal(root.join(filter.getField()).get("bookingCode"), BookingStateCodeEnum.valueOf(filter.getValue()));
        } else {
            return super.equalsPredicate(filter, root, query, criteriaBuilder);
        }
    }
}
