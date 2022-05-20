import React from 'react'
import { useState, useEffect } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import PostForm from './PostForm';

var qnBuffer = []
var choiceBuffer = []

function Home() {

  const [list, setList] = useState([])

  // fecth data from server 
  useEffect(() => {
    fetch("http://localhost:3500/questions/list")
      .then(res => res.json())
      .then(resJson => setList(resJson.data))
  }, [])

  async function buffer() {
    var i = 0;
    try {
        await list.map(qn => {
        qnBuffer[i] = [qn.question, qn.questionType]
        choiceBuffer[i] = [qn._value, qn.choices]
        i++;})
    } catch (error) {
      console.log("ERROR! List not ready")
      console.log(error)
    }
  }
  buffer()

  return (
    <div>
      <PostForm />
    </div>
  )
}

export default Home;
export {qnBuffer, choiceBuffer};
