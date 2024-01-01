import axios from "axios";


const instance = axios.create({
    baseURL: "https://bookstore-api-8x8b.onrender.com"
})

export default instance