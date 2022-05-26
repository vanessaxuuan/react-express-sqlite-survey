import React from "react";
import { useState, useEffect } from 'react';
import { StyledForm, StyledFormWrapper } from "./Style.jsx"

function ViewForm(userId) {
  let iterator = []; // stores form's script
  const resp_url = `http://localhost:3500/questions/responses/${userId}`
  const [enable, enableEdit] = useState("disable")
  const [questions, setQuestions] = useState([])
  const [choices, setChoices] = useState([])
  const [data, setData] = useState({
    name: '',
    id: userId,
    blue: false,
    red: false,
    green: false,
    yellow: false,
    purple: false,
    pink: false,
    python: false,
    java: false,
    ruby: false,
    javascript: false,
    golang: false,
    english: false,
    chinese: false,
    malay: false,
    tamil: false,
    hindi: false,
    yes: false,
    no: false
  })

  // fetch user's response
  useEffect(() => {
    const fetchData = async () => {
      const _data = await fetch(`http://localhost:3500/questions/responses/${userId}`)
        .then(res => res.json())
        .then(resJson => {
          setData(resJson.userData[0])
        })
    }

    const fetchQn = async () => {
      const _data = await fetch("http://localhost:3500/questions/list")
        .then(res => res.json())
        .then(resJson => { setQuestions(resJson) })
    }

    const fetchChoice = async () => {
      const _data = await fetch("http://localhost:3500/questions/choice")
        .then(res => res.json())
        .then(resJson => { setChoices(resJson) })
    }

    fetchData()
    .then(() => fetchQn())
    .then(() => fetchChoice())
    .catch(console.error)

  }, [userId])

  function handleChange(e) {
    const newData = { ...data } // copy curr data
    newData[e.target.id] = e.target.value
    setData(newData)
  }

  function handleCheckbox(e) {
    const newData = { ...data } // copy curr data
    newData[e.target.id] = e.target.checked
    setData(newData)
  }

  function handleEdit(e) {
    e.preventDefault();
    enableEdit(!enable)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    enableEdit(!enable)

    const newResponse = { // update database
      method: "PUT",
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
    const response = await fetch(resp_url, newResponse) // put request to server 
    // const server_response = await response.json()
  }

  /**
   * Generates HTML script to produce checkbox or radio inputs
   */
  function generateCheckBoxes(options, _id, _type) {
    let len = options.length

    for (let i = 0; i < len; i++) {
      const val = options[i] // e.g. blue
      iterator.push(<p><input type={_type} name={_id} id={val} value={val} disabled={enable} checked={data[val]} onChange={handleCheckbox} /> {val}</p>)
    }
  }

  function getOptions(questionId) {
    let options = []
    let j = 0
    let len = choices.length
    for (let i = 0; i < len; i++) {
      let curr = choices[i]
      if (curr["question_id"] === questionId) {
        options[j] = curr["option"]
        j++
      }
    }
    return options
  }

  function getField(_id) {
    switch (String(_id)) {
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

  /**
   * Generates HTML script to produce inputs
   */
  function generateInput(questionId, _type) {
    let field = getField(questionId) // value

    switch (_type) {
      case "textbox":
        iterator.push(<input type="text" required id={field} value={data[field]} disabled={enable} onChange={handleChange} />)
        break
      case "radio":
        return generateCheckBoxes(getOptions(questionId), field, "radio")
      case "checkbox":
        return generateCheckBoxes(getOptions(questionId), field, "checkbox")
      default:
        iterator.push(<div>Loading...</div>)
    }
  }

  const qn_keys = Object.keys(questions)
  for (var key in qn_keys) {
    const curr_qn = questions[key]
    iterator.push(<div><label>{curr_qn["question"]}</label></div>) // question
    generateInput(curr_qn["id"], curr_qn["type"]) // choices
  }

  return (
    <div>
      <StyledFormWrapper>
        <StyledForm onSubmit={e => handleSubmit(e)}>
          <div>
            <label>{iterator}</label>
          </div>
          <button disabled={!enable} onClick={handleEdit}>edit</button>
          <button disabled={enable} type="submit">update</button>
        </StyledForm>
      </StyledFormWrapper>
    </div>
  )
}

export default ViewForm
