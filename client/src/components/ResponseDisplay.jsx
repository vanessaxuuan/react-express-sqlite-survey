import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StyledHeader } from "./Style.jsx"
import ViewForm from "./ViewForm.jsx";

function ResponseDisplay() {

  let { id } = useParams() // indexed at 0
  let curr_id = 0
  let pos = Number(id)
  const [ids, setIds] = useState([])
  const navigate = useNavigate()

  // fetch list of id from responses
  useEffect(() => {
    const fetchData = async () => {
      const _data = await fetch("http://localhost:3500/questions/responses/total/ids")
        .then(res => res.json())
        .then(resJson => setIds(resJson.data))
    }

    fetchData()
      .catch(console.error)
  }, [])

  curr_id = ids[pos]
  const max = ids.length
  let prev_invalid = pos > 0 ? false : true
  let next_invalid = pos < max - 1 ? false : true
  let pos_ifDeleted = prev_invalid ? (next_invalid ? 0 : pos + 1) : pos - 1

  function handleNavigate(e, next) {
    e.preventDefault()
    navigate(`/Result/${next}`)
  }

  async function handleDelete(e) {
    e.preventDefault()
    if (window.confirm("Confirm delete?")) {

      const newResponse = { // update database
        method: "PUT",
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ curr_id })
      }
      const response = await fetch("http://localhost:3500/questions/responses/delete", newResponse) // put request to server 
      // const server_response = await response.json()
      navigate(`/Result/${pos_ifDeleted}`)
    } else {
      console.log("Response not deleted")
    }
  }

  return (
    <div>
      <button onClick={() => { navigate("/") }}>Home</button>
      <div align="center">
        <StyledHeader>Response {pos + 1}/{max}</StyledHeader>
        <button disabled={prev_invalid} onClick={e => { handleNavigate(e, pos - 1) }}>Prev</button>
        <button disabled={next_invalid} onClick={e => { handleNavigate(e, pos + 1) }}>Next</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <div>{ViewForm(curr_id)}</div>
    </div>
  )
}

export default ResponseDisplay