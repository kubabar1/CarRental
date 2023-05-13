package com.carrental.commons.utils.filtering.model;

import com.carrental.commons.utils.filtering.model.QueryOperator;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class Filter {

    private String field;

    private QueryOperator operator;

    private String value;

    private List<String> values = new ArrayList<>();

    public Filter(String field, QueryOperator operator, String value) {
        this.field = field;
        this.operator = operator;
        this.value = value;
    }
}
