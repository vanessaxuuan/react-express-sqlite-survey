import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StyledWrapper, StyledHeader, StyledButton, nextButton } from "./Style.jsx"
import ViewForm from "./ViewForm.jsx";

function ResponseDisplay() {

  const navigate = useNavigate()
  let { id } = useParams()
  let _id = Number(id)
  //let forms = []
  const [count, setCount] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const _data = await fetch("http://localhost:3500/questions/responses/count")
        .then(res => res.json())
        .then(resJson => setCount(resJson.total))
    }

    fetchData()
      .catch(console.error)
  }, [])

  const max = count["count(`id`)"]
  let prev_valid = _id > 1 ? false : true
  let next_valid = _id < max ? false : true

  // forms.push(ViewForm(_id))

  return (
    <div>
      <button onClick={() => { navigate("/Home") }}>Home</button>
      <div align="center">
        <StyledHeader>Response {_id}/{max}</StyledHeader>
        <button disabled={prev_valid} onClick={() => { navigate(`/Result/${_id - 1}`) }}>Prev</button>
        <button disabled={next_valid} onClick={() => { navigate(`/Result/${_id + 1}`) }}>Next</button>
      </div>
      <StyledWrapper>
        <div>{ViewForm(_id)}</div>
      </StyledWrapper>
    </div>
  )
}

export default ResponseDisplay