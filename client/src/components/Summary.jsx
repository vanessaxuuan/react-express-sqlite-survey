import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { qnBuffer } from "./Home";
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
      .then(resJson => {setResp(resJson.data)})
  }, [])

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

  return (
  <div>
    <StyledButton onClick={() => {navigate("/")}}>Home</StyledButton>
    <StyledHeader>Your response</StyledHeader>
    <StyledFormWrapper>
      <StyledForm onSubmit={e => handleSubmit(e)}>
        <div>
          <label>{qnBuffer[0]}</label>
          <p><input type="text" id="name" value={resp.name} disabled={enableEdit} onChange={handleChange} /></p>
        </div>
        <div>
          <label>{qnBuffer[1]}</label>
          <p><input type="checkbox" id="colour" value="Blue" onChange={handleCheckbox} disabled={enableEdit} checked={resp.colour.Blue}/> Blue</p>
          <p><input type="checkbox" id="colour" value="Red" onChange={handleCheckbox} disabled={enableEdit} checked={resp.colour.Red}/> Red</p>
          <p><input type="checkbox" id="colour" value="Green" onChange={handleCheckbox} disabled={enableEdit} checked={resp.colour.Green}/> Green</p>
          <p><input type="checkbox" id="colour" value="Yellow" onChange={handleCheckbox} disabled={enableEdit} checked={resp.colour.Yellow}/> Yellow</p>
          <p><input type="checkbox" id="colour" value="Purple" onChange={handleCheckbox} disabled={enableEdit} checked={resp.colour.Purple}/> Purple</p>
          <p><input type="checkbox" id="colour" value="Pink" onChange={handleCheckbox} disabled={enableEdit} checked={resp.colour.Pink}/> Pink</p>
        </div>
        <div>
          <label>{qnBuffer[2]}</label>
          <p><input type="radio" name="prog_lang" id="prog_lang" value="Python" disabled={enableEdit} checked={resp.prog_lang.Python} onChange={handleCheckbox}/> Python</p>
          <p><input type="radio" name="prog_lang" id="prog_lang" value="Java" disabled={enableEdit} checked={resp.prog_lang.Java} onChange={handleCheckbox}/> Java</p>
          <p><input type="radio" name="prog_lang" id="prog_lang" value="Ruby" disabled={enableEdit} checked={resp.prog_lang.Ruby} onChange={handleCheckbox}/> Ruby</p>
          <p><input type="radio" name="prog_lang" id="prog_lang" value="JavaScript" disabled={enableEdit} checked={resp.prog_lang.JavaScript} onChange={handleCheckbox}/> JavaScript</p>
          <p><input type="radio" name="prog_lang" id="prog_lang" value="Golang" disabled={enableEdit} checked={resp.prog_lang.Golang} onChange={handleCheckbox}/> Golang</p>
        </div>
        <div>
          <label>{qnBuffer[3]}</label>
          <p><input type="checkbox" id="languages" value="English" disabled={enableEdit} onChange={handleCheckbox} checked={resp.languages.English}/> English</p>
          <p><input type="checkbox" id="languages" value="Chinese" disabled={enableEdit} onChange={handleCheckbox} checked={resp.languages.Chinese}/> Chinese</p>
          <p><input type="checkbox" id="languages" value="Malay" disabled={enableEdit} onChange={handleCheckbox} checked={resp.languages.Malay}/> Malay</p>
          <p><input type="checkbox" id="languages" value="Tamil" disabled={enableEdit} onChange={handleCheckbox} checked={resp.languages.Tamil}/> Tamil</p>
          <p><input type="checkbox" id="languages" value="Hindi" disabled={enableEdit} onChange={handleCheckbox} checked={resp.languages.Hindi}/> Hindi</p>
        </div>
        <div>
          <label>{qnBuffer[4]}</label>
          <p><input type="radio" name="would_pay" id="would_pay" value="Yes" disabled={enableEdit} checked={resp.would_pay.Yes} onChange={handleCheckbox}/> Yes</p>
          <p><input type="radio" name="would_pay" id="would_pay" value="No" disabled={enableEdit} checked={resp.would_pay.No} onChange={handleCheckbox}/> No</p>
        </div>
        <button disabled={enableEdit} type="submit">Submit</button>
        <button disabled={!enableEdit} onClick={handleEdit}>Edit</button>
      </StyledForm>
      </StyledFormWrapper>
    </div>
  )
};
  
export default Summary;