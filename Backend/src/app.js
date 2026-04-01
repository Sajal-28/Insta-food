const express = require('express');
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/auth.routes")
const foodRoutes = require("./routes/food.routes")
const foodPartnerRoutes = require('./routes/food-partner.routes')
const cors = require("cors")

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/food", foodRoutes)
app.use('/api/food-partner', foodPartnerRoutes)

app.get("/", (req, res) => {
    res.send("Hellow World!")
})

module.exports = app