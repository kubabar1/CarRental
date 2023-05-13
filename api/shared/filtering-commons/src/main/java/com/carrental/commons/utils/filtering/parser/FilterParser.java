package com.carrental.commons.utils.filtering.parser;

import com.carrental.commons.utils.filtering.model.Filter;
import com.carrental.commons.utils.filtering.model.QueryOperator;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class FilterParser {

    public static final String FILTER_DELIMITER = ",";

    public static List<Filter> parse(String filterString) {
        Matcher matcher = createFilterRegex().matcher(filterString + FILTER_DELIMITER);
        List<Filter> filters = new ArrayList<>();
        while(matcher.find()) {
            if (matcher.groupCount() == 3) {
                String field = matcher.group(1);
                QueryOperator operator = QueryOperator.getByOperator(matcher.group(2));
                String value = matcher.group(3);
                if (operator != null) {
                    filters.add(new Filter(field, operator, value));
                }
            }
        }
        return filters;
    }

    private static Pattern createFilterRegex() {
        String fieldRegex = "([^" + FILTER_DELIMITER + "]+)";
        String valueRegex = "([^" + FILTER_DELIMITER + "]+)";
        String operatorsRegex = Arrays.stream(QueryOperator.values())
            .map(QueryOperator::getOperator)
            .collect(Collectors.joining("|"));
        return Pattern.compile(fieldRegex + "(" + operatorsRegex + ")" + valueRegex);
    }
}
