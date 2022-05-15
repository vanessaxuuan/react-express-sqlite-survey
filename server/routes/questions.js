import express from 'express'
import cors from 'cors'
import {questions_list, responses_server} from "../storage/database.js"

const router = express.Router();
const corsOptions ={
  origin:'*', 
  credentials:true, //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

router.use(cors(corsOptions)) 

router.get("/list", (req, res) => {
  try {
    res.status(200).json({
      data: questions_list
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

router.get("/responses", (req, res) => {
  try {
    res.status(200).json({
      data: responses_server
    })
  } catch (err) {
    res.status(400).json({
      message: "Some error occured"
    })
  }
})

router.post("/responses", (req, res) => {
  try {
    // add to database
    let next_id = responses_server.length
    responses_server[next_id] = req.body 
    console.log(responses_server[next_id])

    res.json({
      status: 'success',
      id: next_id
    })
  } catch (err) {
    res.status(400).json({
      message: "Some error occured"
    })
  }
})

router.put("/responses/:id", (req, res) => {
  try {
    // edit database
    let { id } = req.params;
    id = Number(id);
    responses_server[id] = req.body
    console.log("PUT: server response: ", responses_server[id], req.body)

    res.json({
      status: `success edited response ${id}`
    })
  } catch (err) {
    res.status(400).json({
      message: "Some error occured"
    })
  }
})

router.get("/responses/:id", (req, res) => {
  let { id } = req.params;
  id = Number(id);
  try {
    let resp = responses_server[id]
    res.status(200).json({
      data: resp
    })
  } catch {
    res.status(400).json({
      message: "Some error occured",
      err
    })
  }
})

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  id = Number(id);
  try {
    let question = questions.find(q => q._id === id);
    res.status(200).json({
      data: question
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

export {router}
