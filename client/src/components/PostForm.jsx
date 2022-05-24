import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { StyledButton, StyledForm, StyledFormWrapper } from "./Style.jsx"

function PostForm() {
  const resp_url = "/questions/responses" // to server 
  const navigate = useNavigate()
  let iterator = []; // stores form's script
  const [questions, setQuestions] = useState([])
  const [choices, setChoices] = useState([])
  const [data, setData] = useState({
    name: " ",
    colour: {
      blue: false,
      red: false,
      green: false,
      yellow: false,
      purple: false,
      pink: false
    },
    prog_lang: {
      python: false,
      java: false,
      ruby: false,
      javascript: false,
      golang: false
    },
    languages: {
      english: false,
      chinese: false,
      malay: false,
      tamil: false,
      hindi: false
    },
    would_pay: {
      yes: false,
      no: false
    }
  })

  function getField(questionId) {
    switch (questionId) {
      case "1":
        return "name"
      case "2":
        return "colour"
      case "3":
        return "prog_lang"
      case "4":
        return "languages"
      case "5":
        return "would_pay"
      default:
        return "invalid id"
    }
  }

  // fecth questions from server 
  useEffect(() => {
    const fetchData = async () => {
      const _data = await fetch("http://localhost:3500/questions/list")
      .then(res => res.json())
      .then(resJson => {setQuestions(resJson)})
    }
    
    fetchData()
    .catch(console.error)
  } , [])

    // fecth choices from server 
    useEffect(() => {
      const fetchData = async () => {
        const _data = await fetch("http://localhost:3500/questions/choice")
        .then(res => res.json())
        .then(resJson => {setChoices(resJson)})
      }
      
      fetchData()
      .catch(console.error)
    } , [])

  function handleChange(e) {
    const newData = { ...data } // copy curr data
    newData[e.target.id] = e.target.value
    setData(newData)
  }

  function handleCheckbox(e) {
    const newData = { ...data } // copy curr data
    const updatedField = newData[e.target.id]
    updatedField[e.target.value] = e.target.checked
    newData[e.target.id] = updatedField
    setData(newData)
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newResponse = {
      method: "POST",
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
    console.log("client sent: ", newResponse.body)
    const response = await fetch(resp_url, newResponse) // post request to server 
    const server_response = await response.json()
    console.log("server replied: ", server_response)
    //navigate("/Result")
  }

  /**
   * Generates HTML script to produce checkbox or radio inputs
   */
  function generateCheckBoxes(options, _id, _type) {
    let field = data[_id]
    const keys = Object.keys(options)
   
    for(var key in keys) { 
      const val = options[key]
      iterator.push(<p><input type={_type} name={_id} id={_id} value={val} onChange={handleCheckbox} checked={field[val]} /> {val}</p>) 
    }
  }

  const choice_keys = Object.values(choices)
  function getOptions(questionId) {
    let options = []
    let i = 0;
    for(var key in choice_keys) {
      let curr = choices[key]
      if(String(curr["field2"]) === questionId) {
        options[i] = curr["field3"]
        i++
      }
    }
    return options
  }

  /**
   * Generates HTML script to produce inputs
   */
  function generateInput(questionId, _type) {
    let field = getField(questionId) // value

    switch (_type) {
      case "textbox":
        iterator.push(<input type="text" required id={field} value={data.field} onChange={handleChange} />)
      case "radio":
        return generateCheckBoxes(getOptions(questionId), field, "radio")
      case "checkbox":
        return generateCheckBoxes(getOptions(questionId), field, "checkbox")
      default:
        iterator.push(<div>Loading...</div>)
    }
  }

  const qn_keys = Object.keys(questions)
  for(var key in qn_keys) {
    const curr_qn = questions[key]
    iterator.push(<div><label>{curr_qn["field2"]}</label></div>) // question
    generateInput(curr_qn["field1"], curr_qn["field3"]) // choices
  }

  return (
    <div>
      <StyledButton onClick={() => navigate(-1)}>Back</StyledButton>
      <StyledFormWrapper>
        <StyledForm onSubmit={e => handleSubmit(e)}>
          <div>
             <label>{iterator}</label>
          </div>
          <StyledButton type="submit">submit</StyledButton>
        </StyledForm>
      </StyledFormWrapper>
    </div>
  )
}

export default PostForm
