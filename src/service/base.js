import axios from 'axios'
// write a frontend program to get the data from our custom Node server

const ERR_OK = 0
const baseURL = '/'

axios.defaults.baseURL = baseURL

export function get(url, params) {
    return axios.get(url, {
        params
    }).then((res) => {
        const serverData = res.data
        if (serverData.code === ERR_OK) {
            return serverData.result
        }
    }).catch((e) => {
        console.log(e)
    })
}
