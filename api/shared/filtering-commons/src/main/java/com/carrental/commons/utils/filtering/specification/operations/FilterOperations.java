package com.carrental.commons.utils.filtering.specification.operations;

import com.carrental.commons.utils.filtering.model.Filter;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public interface FilterOperations<T> {

    Predicate equalsPredicate(Filter filter, Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder);

    Predicate greaterThanPredicate(Filter filter, Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder);

    Predicate lessThanPredicate(Filter filter, Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder);
}
