export const createURLQueryFromPrimeVue = (params) => {
    if (!params || params === {})
        return "";
    console.log(JSON.parse(JSON.stringify(params)));
    let query = [];

    // Format paging
    if (params.first === Number) query.push(`first=${params.first}`);
    if (params.rows === Number) query.push(`rows=${params.rows}`);

    // Format sorting
    if (params.sortField) {
        query.push(`sort=${params.sortField}`);
        query.push(`order=${typeof params.sortOrder === Number ? params.sortOrder : 1}`);
    }

    // Format filters
    if (!!params.filters) {
        const filterColumns = Object.keys(params.filters);
        let filterList = [];
        
        for (let column in filterColumns) {
            // for some reason, <column> is the index within <filterColumns> here
            // so you need to do filterColumns[column] to get the value 
            let field = filterColumns[column];
            let filter = params.filters[field];

            console.groupCollapsed("filters");
            console.log("column", column);
            console.log("filterColumns", field);
            console.log("params.filters", filter);
            console.groupEnd();

            if (filter.value !== null)
                filterList.push(`{"${field}":"${filter.value}"}`);
        }

        if (filterList.length > 0) {
            const filterString = `filter=[${filterList.join(',')}]`;
            query.push(filterString);
        }
    }
    
    return "?" + query.join('&');
}