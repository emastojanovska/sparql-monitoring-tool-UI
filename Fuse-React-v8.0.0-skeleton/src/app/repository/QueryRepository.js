import axios from '../axios/axios'

const QueryRepository = {
    executeQuery: (queryDTO) => {
        return axios.post('/queries/getQueryData', queryDTO)
    },

    getAvgResponseTime: (type) => {
        return axios.get(`/queries/getAverageResponseTime?type=${type}`)
    },

    getAllQueryTypes: () => {
        return axios.get('/queries/getQueryTypes')
    },

    getAllResponseTimes: () => {
        return axios.get('/queries/getAllAverageResponseTimes')
    },

    getAllByEndpoint: () => {
        return axios.get('/queries/getAllByEndpoint')
    },
}

export default QueryRepository;