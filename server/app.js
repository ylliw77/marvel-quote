if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    }
console.clear()
const express = require('express');
const app = express()
const cors = require('cors');
const PORT = process.env.PORT || 3000
const router = require('./routes/routes');
const errorHandler = require('./middlewares/error-handler');


app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use(router)

app.use(errorHandler)
app.listen(PORT, () => {
    console.log("App running on port : " + PORT);
})

