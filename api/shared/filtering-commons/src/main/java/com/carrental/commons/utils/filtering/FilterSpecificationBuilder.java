package com.carrental.commons.utils.filtering;

import com.carrental.commons.utils.filtering.model.Filter;
import com.carrental.commons.utils.filtering.parser.FilterParser;
import com.carrental.commons.utils.filtering.specification.FilterSpecification;
import com.carrental.commons.utils.filtering.specification.operations.FilterOperations;
import com.carrental.commons.utils.filtering.specification.operations.impl.DefaultFilterOperations;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public class FilterSpecificationBuilder<T> {

    private final FilterOperations<T> filterOperations;

    public FilterSpecificationBuilder() {
        this.filterOperations = new DefaultFilterOperations<>();
    }

    public FilterSpecificationBuilder(FilterOperations<T> filterOperations) {
        this.filterOperations = filterOperations;
    }

    public Specification<T> build(String filterString) {
        List<Filter> filters = FilterParser.parse(filterString);
        if (filters.isEmpty()) {
            return null;
        }
        Specification<T> result = new FilterSpecification<>(filters.get(0), filterOperations);
        for (int i = 1; i < filters.size(); i++) {
            result = Specification.where(result).and(new FilterSpecification<>(filters.get(i), filterOperations));
        }
        return result;
    }
}
