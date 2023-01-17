import QueryDataTypes from "app/store/query-data/queryDataTypes";


export const setQueryData = data =>({
    type: QueryDataTypes.GET_RESULT_DATA,
    payload: data
});

export const setQueryTypes = data => ({
    type: QueryDataTypes.GET_QUERY_TYPES,
    payload: data
});