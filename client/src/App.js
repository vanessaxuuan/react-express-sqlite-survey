import React from 'react'
import { useNavigate } from "react-router-dom";
import { GlobalStyle, StyledWrapper, WelcomeButton } from "./components/Style.jsx"

function App() {

  const navigate = useNavigate()

  return (
    <>
    <GlobalStyle/>
      <nav>
        <ul>
          <StyledWrapper>
            <WelcomeButton onClick={() => {navigate("/Survey")}}>Start Survey</WelcomeButton>
            <WelcomeButton onClick={() => {navigate("/Result/0")}}>Summary</WelcomeButton>
          </StyledWrapper>
        </ul>
      </nav>
    </>
  )
}

export default App;