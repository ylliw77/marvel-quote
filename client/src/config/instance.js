import axios from "axios";

const instance = axios.create({
    baseURL : "http://localhost:3000"
    // baseURL : "https://i-project.ylliw.lol"
})

export default instance