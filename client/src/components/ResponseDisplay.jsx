import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {EditButton, StyledButton, StyledDiv, StyledForm, StyledFormWrapper, StyledHeader} from "./Style.jsx"

function ResponseDisplay() {

  const navigate = useNavigate()
  const [list, setList] = useState([])

  async function handleEdit(index) {
    navigate(`/Summary/${index}`) // navigates to summary page 
  }

  // fetch data
  useEffect(() => {
    fetch("http://localhost:3500/questions/responses")
      .then(res => res.json())
      .then(resJson => {
        setList(resJson.data)
        console.log("display fetched: ", resJson.data)
      })
  }, [])

  function displayBox(item) {
    return (
      <label>
        <p>name: {item.name}</p>
        <p>would_pay: {JSON.stringify(item.would_pay)}</p>
      </label>
    )
  }

  function displayResult(items=[]) {
    items.forEach((item, index) => {
      responses.push(<StyledDiv>
        <EditButton id={index} onClick={() =>{handleEdit(index)}}>Edit</EditButton>
        {displayBox(item)}
        </StyledDiv>)
    })
  }

  let responses = []
  displayResult(list)

  return (
    <div>
      <button onClick={() => {navigate(-1)}}>Back</button>
      <div>{responses}</div>
    </div>
  )
}

export default ResponseDisplay