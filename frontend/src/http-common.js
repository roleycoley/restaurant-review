import axios from "axios"

export default axios.create({
    // url of backend server (in server.js)
    baseURL: "http://localhost:60001/api/v1/restaurants",
    headers: {
        "Content-type": "application/json"
    }
});