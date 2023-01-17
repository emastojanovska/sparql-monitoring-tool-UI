import QueryDataTypes from "app/store/query-data/queryDataTypes";

const INITIAL_STATE = {
    queryData: null,
    queryTypes: null
}

const queryDataReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case QueryDataTypes.GET_RESULT_DATA:
            return{
                ...state,
                queryData: action.payload,
            }
        case QueryDataTypes.GET_QUERY_TYPES:
            return{
                ...state,
                queryTypes: action.payload,
            }
        default:
            return state;
    }
}

export default queryDataReducer;