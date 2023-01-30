// eslint-disable-next-line import/prefer-default-export
export const removeEndpoint = (endpointsList, endpointId) => {
    return endpointsList.filter(item => item.id !== endpointId);
};

export const addEndpoint = (endpointsList, endpointToAdd) =>{
    return [...endpointsList, endpointToAdd ]
}

export const editEndpoint = (endpointList, endpointToEdit) => {
    console.log('Endpoint to edit', endpointToEdit)
    const endpoint = endpointList.find(x => x.id === endpointToEdit.id)
    endpoint.name = endpointToEdit.name
    return [endpointList.filter(x => x.id !== endpointToEdit.id), endpointToEdit].sort((a, b) => a.id < b.id ?  -1 :  1)
}