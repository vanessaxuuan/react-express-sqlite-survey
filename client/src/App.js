import React from 'react'
import { useNavigate } from "react-router-dom";
import { GlobalStyle, WelcomeButton } from "./components/Style.js"

function App() {

  const navigate = useNavigate()
  const navigateTo = () => {
    navigate("/Home")
  }

  return (
    <>
    <GlobalStyle/>
      <nav>
        <ul>
          <div>
            <WelcomeButton onClick={navigateTo}>Start Survey</WelcomeButton>
          </div>
        </ul>
      </nav>
    </>
  )
}

export default App;