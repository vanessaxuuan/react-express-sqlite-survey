import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { qnBuffer, choiceBuffer } from "./Home";
import {StyledButton, StyledForm, StyledFormWrapper, StyledHeader} from "./Style.js"

function Summary() {

  const userId = parseInt(useParams().id)
  const resp_url = "/questions/responses"
  const navigate = useNavigate()
  const [enableEdit, setEnableEdit] = useState("disabled") // editing disabled initially 
  const [resp, setResp] = useState({
    name: " ",
    colour: {
      Blue: false,
      Red: false,
      Green: false,
      Yellow: false,
      Purple: false,
      Pink: false
    },
    prog_lang: {
      Python: false,
      Java: false,
      Ruby: false,
      JavaScript: false,
      Golang: false
    },
    languages: {
      English: false,
      Chinese: false,
      Malay: false,
      Tamil: false,
      Hindi: false
    },
    would_pay: {
      Yes: false,
      No: false
    }
  })

  const handleEdit = () => {
    setEnableEdit(!enableEdit) // allow editing, activate submit button 
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newResponse = {
      method: "PUT",
      mode: "cors",
      headers: {'Content-Type': 'application/json'},
      id: userId,
      body: JSON.stringify(resp)
    }
    const response = await fetch(resp_url, newResponse) // post request to server 
    const server_response = await response.json()
    console.log("server replied:", server_response)
    setEnableEdit(!enableEdit) // back to initial state 
    alert("Response updated")
  }

  useEffect(() => {
    fetch(`http://localhost:3500/questions/responses/${userId}`)
      .then(res => res.json())
      .then(resJson => {
        setResp(resJson.data)
      })
  }, [])

  async function buffer() {
    const result = await resp
    console.log("resp fetched: ", result)
  }
  buffer()

  function handleChange(e) {
    const newData = { ...resp } // copy curr data
    newData[e.target.id] = e.target.value
    setResp(newData)
  }

  function handleCheckbox(e) {
    const newData = { ...resp } // copy curr data
    const updatedField = newData[e.target.id]
    updatedField[e.target.value] = e.target.checked
    newData[e.target.id] = updatedField
    setResp(newData)
  }

  /**
   * Generates HTML script to produce checkbox or radio inputs
   */
   function generateCheckBoxes(arr = [], field, _type) {
    let field_data = resp[field]
    return (
      arr.map(item =>
        <p><input type={_type} name={field} id={field} value={item} disabled={enableEdit} onChange={handleCheckbox} checked={field_data[item]} /> {item}</p>
      )
    )
  }

  /**
   * Generates HTML script to produce inputs
   */
  function generateInput(choices =[], _type) {
    let field = choices[0] // value
    switch(_type) {
      case "0":
        return(<input type="text" required id={field} value={resp[field]} disabled={enableEdit} onChange={handleChange} />)
      case "1":
        return generateCheckBoxes(choices[1], field, "radio")
      case "2":
        return generateCheckBoxes(choices[1], field, "checkbox")
      default:
        return (<div>Loading...</div>)
    }
  }

  let iterator = []; // stores form's script
  qnBuffer.forEach((item, index) => {
    iterator.push(<div><label>{item[0]}</label></div>) // question
    iterator.push(<div>{generateInput(choiceBuffer[index], item[1])}</div>) // choices
  })

  return (
    <div>
      <StyledButton onClick={() => navigate("/")}>Home</StyledButton>
      <StyledHeader>Your response has been submitted</StyledHeader>
      <StyledFormWrapper>
        <StyledForm onSubmit={e => handleSubmit(e)}>
          <div>
            <label>{iterator}</label>
          </div>
          <button disabled={enableEdit} type="submit">submit</button>
          <button disabled={!enableEdit} onClick={handleEdit}>Edit</button>
        </StyledForm>
      </StyledFormWrapper>
    </div>
  )
};
  
export default Summary;