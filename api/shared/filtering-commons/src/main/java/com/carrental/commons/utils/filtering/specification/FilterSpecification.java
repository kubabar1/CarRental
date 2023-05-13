package com.carrental.commons.utils.filtering.specification;

import com.carrental.commons.utils.filtering.model.Filter;
import com.carrental.commons.utils.filtering.specification.operations.FilterOperations;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;

public class FilterSpecification<T> implements Specification<T> {

    protected final Filter filter;

    protected final FilterOperations<T> filterOperations;

    public FilterSpecification(Filter filter, FilterOperations<T> filterOperations) {
        this.filter = filter;
        this.filterOperations = filterOperations;
    }

    @Override
    public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        switch (filter.getOperator()) {
            case EQUALS:
                return filterOperations.equalsPredicate(filter, root, query, criteriaBuilder);
            case GREATER_THAN:
                return filterOperations.greaterThanPredicate(filter, root, query, criteriaBuilder);
            case LESS_THAN:
                return filterOperations.lessThanPredicate(filter, root, query, criteriaBuilder);
            default:
                throw new RuntimeException("Operation not supported");
        }
    }
}
