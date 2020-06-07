import axios from 'axios'

const http = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    'Content-Type': 'multipart/form-data'
})

export default http;