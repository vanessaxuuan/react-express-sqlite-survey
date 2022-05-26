import React from 'react'
import { useNavigate } from "react-router-dom";
import { GlobalStyle, StyledFormWrapper, WelcomeButton } from "./components/Style.jsx"

function App() {

  const navigate = useNavigate()

  return (
    <>
    <GlobalStyle/>
      <nav>
        <ul>
          <StyledFormWrapper>
            <WelcomeButton onClick={() => {navigate("/Survey")}}>Start Survey</WelcomeButton>
            <WelcomeButton onClick={() => {navigate("/Result/1")}}>Responses</WelcomeButton>
          </StyledFormWrapper>
        </ul>
      </nav>
    </>
  )
}

export default App;