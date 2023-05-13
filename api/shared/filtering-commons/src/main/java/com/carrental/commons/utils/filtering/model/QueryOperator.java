package com.carrental.commons.utils.filtering.model;

import java.util.Arrays;

public enum QueryOperator {
    EQUALS(":"),
    GREATER_THAN(">"),
    LESS_THAN("<");

    private final String operator;

    QueryOperator(String operator) {
        this.operator = operator;
    }

    public String getOperator() {
        return operator;
    }

    public static QueryOperator getByOperator(String operator) {
        return Arrays.stream(QueryOperator.values()).filter(it -> it.operator.equals(operator)).findFirst().orElse(null);
    }
}
