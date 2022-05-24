import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StyledWrapper, StyledHeader } from "./Style.jsx"
import ViewForm from "./ViewForm.jsx";

function ResponseDisplay() {

  const navigate = useNavigate()
  const [responses, setResponse] = useState([])
  const clear_url = "/questions/responses"

  // // fetch data
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await fetch("http://localhost:3500/questions/responses")
  //     .then(res => res.json())
  //     .then(resJson => {
  //       console.log(resJson)
  //       })
  //   }
    
  //   fetchData()
  //   .then(() => {setResponse(data)
  //     console.log(responses)})
  //   .catch(console.error)
  // } , [])

  const forms = []

  // const list_keys = Object.keys(responses)
  // const len = list_keys.length
  for(let i = 0; i < 3; i++) {
    forms.push(ViewForm(i))
    forms.push(<p></p>)
  }

  return (
    <div>
      <button onClick={() => { navigate(-1) }}>Back</button>
      <StyledHeader>Responses</StyledHeader>
      <StyledWrapper>
        <div>{forms}</div>
      </StyledWrapper>
    </div>
  )
}

export default ResponseDisplay