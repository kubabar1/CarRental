package com.carrental.commons.utils.filtering.specification.operations.impl;

import com.carrental.commons.utils.filtering.model.Filter;
import com.carrental.commons.utils.filtering.specification.operations.FilterOperations;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.criteria.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class DefaultFilterOperations<T> implements FilterOperations<T> {

    @Override
    public Predicate equalsPredicate(Filter filter, Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        String topField = getTopField(filter.getField());
        From<T, ?> rootPath = joinFields(root, filter.getField());
        if (StringUtils.isNumeric(filter.getValue()) && !String.class.equals(rootPath.get(topField).getJavaType())) {
            return criteriaBuilder.equal(rootPath.get(topField), Double.valueOf(filter.getValue()));
        } else if (isBoolean(filter.getValue())) {
            return criteriaBuilder.equal(rootPath.get(topField), Boolean.valueOf(filter.getValue()));
        } else {
            return criteriaBuilder.like(
                    criteriaBuilder.lower(rootPath.get(topField)),
                    "%" + filter.getValue().toLowerCase() + "%"
            );
        }
    }

    @Override
    public Predicate greaterThanPredicate(Filter filter, Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        String topField = getTopField(filter.getField());
        From<T, ?> rootPath = joinFields(root, filter.getField());
        if (StringUtils.isNumeric(filter.getValue())) {
            return criteriaBuilder.gt(rootPath.get(topField), Double.valueOf(filter.getValue()));
        } else if (isValidDate(filter.getValue())) {
            return criteriaBuilder.greaterThan(rootPath.get(topField), LocalDate.parse(filter.getValue()));
        } else {
            return criteriaBuilder.greaterThan(rootPath.get(topField), filter.getValue());
        }
    }

    @Override
    public Predicate lessThanPredicate(Filter filter, Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        String topField = getTopField(filter.getField());
        From<T, ?> rootPath = joinFields(root, filter.getField());
        if (StringUtils.isNumeric(filter.getValue())) {
            return criteriaBuilder.lt(rootPath.get(topField), Double.valueOf(filter.getValue()));
        } else if (isValidDate(filter.getValue())) {
            return criteriaBuilder.lessThan(rootPath.get(topField), LocalDate.parse(filter.getValue()));
        } else {
            return criteriaBuilder.lessThan(rootPath.get(topField), filter.getValue());
        }
    }

    protected From<T, ?> joinFields(Root<T> root, String filterFields) {
        From<T, ?> rootPath = root;
        String[] fields = getFieldsToJoin(filterFields);
        if (fields.length > 1) {
            for (int i = 0; i < fields.length - 1; i++) {
                rootPath = rootPath.join(fields[i]);
            }
        }
        return rootPath;
    }

    private String[] getFieldsToJoin(String filterFields) {
        return filterFields.split("\\.");
    }

    protected String getTopField(String filterFields) {
        String[] fields = getFieldsToJoin(filterFields);
        return fields.length > 1 ? fields[fields.length - 1] : filterFields;
    }

    protected boolean isBoolean(String booleanStr) {
        return booleanStr.equals("true") || booleanStr.equals("false");
    }

    protected boolean isValidDate(String dateStr) {
        try {
            LocalDate.parse(dateStr, DateTimeFormatter.ISO_DATE);
        } catch (DateTimeParseException e) {
            return false;
        }
        return true;
    }
}
