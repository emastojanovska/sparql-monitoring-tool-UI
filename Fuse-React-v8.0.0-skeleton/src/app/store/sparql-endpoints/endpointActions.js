import EndpointTypes from "app/store/sparql-endpoints/endpointTypes";

// eslint-disable-next-line import/prefer-default-export
export const setEndpoints = data =>({
    type: EndpointTypes.SET_ALL,
    payload: data
});

export const addEndpoint = item =>({
    type: EndpointTypes.ADD_ENDPOINT,
    payload: item
});

export const removeEndpoint = item =>({
    type: EndpointTypes.REMOVE_ENDPOINT,
    payload: item
});

export const setEndpoint = item =>({
    type: EndpointTypes.SET_ENDPOINT,
    payload: item
});
