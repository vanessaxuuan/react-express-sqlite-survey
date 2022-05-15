import React from 'react'
import { useNavigate } from "react-router-dom";
import { GlobalStyle, WelcomeButton } from "./components/Style.jsx"

function App() {

  const navigate = useNavigate()

  return (
    <>
    <GlobalStyle/>
      <nav>
        <ul>
          <div>
            <WelcomeButton onClick={() => {navigate("/Home")}}>Start Survey</WelcomeButton>
            <WelcomeButton onClick={() => {navigate("/Result")}}>Responses</WelcomeButton>
          </div>
        </ul>
      </nav>
    </>
  )
}

export default App;