import axios from "axios"

export default axios.create({
    // url of backend server (in server.js)
    baseURL: "https://food-finder-p5j8.onrender.com",
    headers: {
        "Content-type": "application/json"
    }
});