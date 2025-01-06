import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:4444/'
}) 

//axios.get('http://localhost:4444/posts')

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')

    return config
})

export default instance