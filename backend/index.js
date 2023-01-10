import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"
dotenv.config()

//get access from mongo client
const MongoClient = mongodb.MongoClient

// process.env = process an environment variable
const port = process.env.PORT || 8000

// connect to databse
MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        // only 50 people can connect at a time
        maxPoolSize:50,
        // after 2500ms request will timeout
        wtimeoutMS: 2500,
        useNewURLParser: true 
    }
) // catch any errors
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then (async client => {
    // get initial reference to restaurants when server starts
    await RestaurantsDAO.injectDB(client)
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})