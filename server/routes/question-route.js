import express from 'express'
import cors from 'cors'
import allResponses, { createResponse, getCount, getResponse, resetData, updateResponse } from "../controllers/SurveyControllers.js"
import myKnex from "../db/knex.js"

const router = express.Router();
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

router.use(cors(corsOptions))

// get list of questions
router.get("/list", (req, res) => {
  try {
    myKnex
    .select('*').from("question")
    .then(qns => res.send(qns))
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
})

// get list of choices
router.get("/choice", (req, res) => {
  try {
    myKnex("choice")
    .then(data => { 
      res.send(data)
    })
  } catch (err) {
    res.json({
      message: "Some error occured",
      err
    });
  }
})

// manage user responses with SurveyControllers
router.get("/responses", allResponses) // get responses
router.post("/responses", createResponse) // add new response
router.put("/responses", resetData) // clear all responses
router.get("/responses/count", getCount) // get number of responses
router.get("/responses/:id", getResponse) // view a response
router.put("/responses/:id", updateResponse) // edit a response

export { router }
