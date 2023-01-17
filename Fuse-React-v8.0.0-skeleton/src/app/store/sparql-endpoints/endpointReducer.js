import EndpointTypes from "app/store/sparql-endpoints/endpointTypes";
import {addEndpoint, removeEndpoint} from "app/store/sparql-endpoints/endpointUtils";

const INITIAL_STATE = {
    endpointsList: [],
    hasVoid: null,
    noVoid: null,
    endpoint: {}
}

const EndpointReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case EndpointTypes.SET_ALL: return{
            endpointsList: action.payload,
            hasVoid: action.payload.map(x => x.voID).filter(x => x===true).length,
            noVoid: action.payload.map(x => x.voID).filter(x => x===false).length
        }
        case EndpointTypes.ADD_ENDPOINT: return{
            ...state,
            endpointsList: addEndpoint(state.endpointsList, action.payload)
        };
        case EndpointTypes.SET_ENDPOINT: return{
            ...state,
            endpoint: action.payload
        };
        case EndpointTypes.REMOVE_ENDPOINT: return{
            ...state,
            endpointsList: removeEndpoint(state.endpointsList, action.payload)
        };
        default: return state;
    }
}

export default EndpointReducer;