import axios from "axios"

const baseURL = "http://localhost:3001"

export const publicAxios = axios.create({ baseURL })

export const privateAxios = axios.create({
    baseURL,
    withCredentials: true,
    headers: {"Content-Type": "application/json"} 
})