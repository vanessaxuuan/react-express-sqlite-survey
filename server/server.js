import express from 'express'
import bodyParser from 'body-parser'
import {router} from "./routes/questions.js"

const app = express()
const port = 3500

// body parser middleware setup
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// routes
app.use("/questions", router)

// main route
app.get("/", (req, res) => {
  res.send("hello world");
});

// start server on port 3500
app.listen(port, () => console.log(`Listening on port ${port}`));
