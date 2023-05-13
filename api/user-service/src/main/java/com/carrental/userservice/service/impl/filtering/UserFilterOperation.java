package com.carrental.userservice.service.impl.filtering;

import com.carrental.commons.utils.filtering.model.Filter;
import com.carrental.commons.utils.filtering.specification.operations.impl.DefaultFilterOperations;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.Set;

public class UserFilterOperation<T> extends DefaultFilterOperations<T> {

    @Override
    public Predicate equalsPredicate(Filter filter, Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        if (root.get(filter.getField()).getJavaType().equals(Set.class)) {
            return criteriaBuilder.equal(root.join(filter.getField()).get("id"), Double.valueOf(filter.getValue()));
        } else {
            return super.equalsPredicate(filter, root, query, criteriaBuilder);
        }
    }
}
