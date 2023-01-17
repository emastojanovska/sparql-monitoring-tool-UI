// eslint-disable-next-line import/prefer-default-export
export const removeEndpoint = (endpointsList, endpointId) => {
    return endpointsList.filter(item => item.id !== endpointId);
};

export const addEndpoint = (endpointsList, endpointToAdd) =>{
    return [...endpointsList, endpointToAdd ]
}