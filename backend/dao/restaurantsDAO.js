// DAO means data access object

import mongodb from "mongodb"

// we need access to object id***
// convert string to mongodb object id
const ObjectId = mongodb.ObjectId

//reference to restaurants collection
let restaurants


export default class RestaurantsDAO {
    // inject database method, initially connects to database
    // method is called when server is called
    static async injectDB(conn) {
        // if restaurants are already filled do nothing
        if (restaurants) {
            return
        } 
        // restaurants variable references database
        try {
            // look at restaurant database, go to collection restaurants
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in restaurantsDAO: ${e}`,
            )
        }  
    }

    //when you call this method...
    // *this is a query
    static async getRestaurants({
        // sorts restaurants
        filters = null,
        // default page number
        page = 0,
        restaurantsPerPage = 20,
    } = {}) {
        // query is empty unless get restaurant is called with filters
        let query
        // three different filters
        if (filters) {
            // search by name, cuisine, or zipcode
            if ("name" in filters) {
                //getRestuarants method is called with name, cuisine, or zipcode passed in
                //cuisine and zipcode are database FIELDS***
                query = { $text: { $search: filters["name"] } }
            } else if ("cuisine" in filters) {
                query = { "cuisine": { $eq: filters["cuisine"] } }
            } else if ("zipcode" in filters) {
                query = {"address.zipcode": { $eq: filters["zipcode"] } }
            }
        }

        let cursor

        try {
            // find all restaurants in database that go along with the query
            // if there is no query, show all restaurants
            cursor = await restaurants
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command ${e}`)
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }

        //31:49

        // skip to a specific page
        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)

        try {
            // turn restaurant list with query to an array
            const restaurantsList = await displayCursor.toArray()
            // restaurant count
            const totalNumRestaurants = await restaurants.countDocuments(query)

            return { restaurantsList, totalNumRestaurants }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`
            )
            return { restaurantsLists: [], totalNumRestaurants: 0 }
        }
    }

    static async getRestaurantByID(id) {
        try {
          const pipeline = [
            {
                $match: {
                    _id: new ObjectId(id),
                },
            },
                  {
                      $lookup: {
                          from: "reviews",
                          let: {
                              id: "$_id",
                          },
                          pipeline: [
                              {
                                  $match: {
                                      $expr: {
                                          $eq: ["$restaurant_id", "$$id"],
                                      },
                                  },
                              },
                              {
                                  $sort: {
                                      date: -1,
                                  },
                              },
                          ],
                          as: "reviews",
                      },
                  },
                  {
                      $addFields: {
                          reviews: "$reviews",
                      },
                  },
              ]
          return await restaurants.aggregate(pipeline).next()
        } catch (e) {
          console.error(`Something went wrong in getRestaurantByID: ${e}`)
          throw e
        }
      }
      
      // returns an array of cuisines. Each cuisine is unique
      static async getCuisines() {
        let cuisines = []
        try {
            // .distinct() takes away duplicates
          cuisines = await restaurants.distinct("cuisine")
          return cuisines
        } catch (e) {
          console.error(`Unable to get cuisines, ${e}`)
          return cuisines
        }
      }
}