import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js"

const app = express()

app.use(cors())
// app can accept json files
app.use(express.json())

// our MAIN URL, route is in restaurants file
app.use("/api/v1/restaurants", restaurants)
// when a user goes to a route that does not exist
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

// allows you to import this module in the file that accesses the database
export default app



