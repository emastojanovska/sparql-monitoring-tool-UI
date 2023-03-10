import axios from '../axios/axios'

const EndpointRepository = {
    getAllEndpoints: (queryDTO) => {
        return axios.get('/endpoints')
    },

    createEndpoint: (dto) => {
        return axios.post('/endpoints/create', dto)
    },

    editEndpoint: (dto) => {
        return axios.post(`/endpoints/edit/${dto.id}?endpointName=${dto.name}`)
    },

    removeEndpoint: (dto) => {
        return axios.post(`/endpoints/remove`, dto)
    },

    downloadVoid: (id, format) => {
        return axios.post(`/endpoints/download/${id}?format=${format}`, {
            responseType: 'blob',
        })
    },

    getVoidData: (id) => {
        return axios.get(`/endpoints/void/${id}`)
    }
}

export default EndpointRepository;