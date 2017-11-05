import axios from 'axios';


const api = {
    getAllBuses: () => {
        return axios.get('http://192.168.100.100:8000/api/v1/beacons/')
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            })
    },

    postNewBus: (bus) => {
        axios.post('http://192.168.100.100:8000/api/v1/beacons/', bus)
            .then((response) => {
                console.log(response.data);
                return response;
            })
            .catch((error) => {
                console.log(error)
            })
    },

    deleteBus: (id) => {
        axios.delete('http://192.168.100.100:8000/api/v1/beacons/' + id)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error)
            })
    }

};

export default api;
