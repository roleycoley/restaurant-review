import http from "../http-common";


// where we make api calls and return info from api calls
// these strings are added to the end of backend server.js url
// front end url is different from backend
// notice how urls with a / bring you to a specific route
// these methods are called by components and can be given arguments
// needs to be imported

class RestaurantDataService {
    getAll(page = 0) {
        return http.get(`?page=${page}`);
    }

    get(id) {
        return http.get(`/id/${id}`);
    }

    find(query, by = "name", page = 0) {
        return http.get(`?${by}=${query}&page=${page}`);
    }

    createReview(data) {
        return http.post("/review", data);
    }

    updateReview(data) {
        return http.put("/review", data);
    }

    deleteReview(id, userId) {
        return http.delete(`/review?id=${id}`, {data:{user_id: userId}})
    }

    getCuisines() {
        return http.get(`/cuisines`);
    }
}

export default new RestaurantDataService();