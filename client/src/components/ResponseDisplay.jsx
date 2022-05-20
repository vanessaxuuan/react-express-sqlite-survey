import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StyledDiv, StyledWrapper, StyledHeader } from "./Style.jsx"

function ResponseDisplay() {

  const navigate = useNavigate()
  const [list, setList] = useState([])

  async function handleEdit(index) {
    navigate(`/Edit/${index}`) // navigates to summary page 
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

  function displayBox(person) {
    let content = [];
    const keys = Object.keys(person)
    const len = keys.length
    for (let i = 0; i < len; i++) {
      if (keys[i] === "name") {
        content.push(<div>name :{person[keys[i]]}</div>)
      } else {
        let selected = displaySelected(person[keys[i]])
        content.push(<p>{keys[i]}: {selected}</p>)
      }
    }
    return content
  }

  function displaySelected(field) {
    const keys = Object.keys(field)
    const len = keys.length
    let res = ""
    for (let i = 0; i < len; i++) {
      if (field[keys[i]]) {
        res += keys[i] + ", "
      } else {
        // continue
      }
    }
    return res.length === 0 ? "None" : res
  }

  function displayResult(items = []) {
    items.forEach((result, index) => {
      responses.push(<StyledDiv onClick={() => { handleEdit(index) }}>
        <p>{displayBox(result)}</p>
      </StyledDiv>)
    })
  }

  let responses = []
  displayResult(list)

  return (
    <div>
      <button onClick={() => { navigate(-1) }}>Back</button>
      <StyledHeader>Summary</StyledHeader>
      <StyledWrapper>
        <label>You may click on the response to view or edit</label>
        <div>{responses}</div>
      </StyledWrapper>
    </div>
  )
}

export default ResponseDisplay