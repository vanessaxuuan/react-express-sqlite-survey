import styled, { createGlobalStyle, css } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%
  }
  body {
    font-family: Arial, Helvetica, sans-serif;
    background: linear-gradient(to bottom, #008080, #e1eec3);
    height: 100%;
    margin: 0;
    color: rgb(255,255,255);
  }
`;

export const sharedStyles = css`
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
`;

export const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  margin-bottom: 10px;
`;

export const StyledDiv = styled.div`
  background-color: #B0C4DE;
  color: #000000;
  font-size: 0.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
  padding: 0 20px;
  margin: 10px
`;

export const StyledForm = styled.form`
  width: 100%;
  max-width: 700px;
  height: 100%;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
  margin-bottom: 2%;
`;

export const EmptyForm = styled.form`
  width: 100vh;
  max-width: 700px;
  height: 60vh;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
  margin-left: 30%;
  margin-top: 5%;
`;

export const StyledInput = styled.input`
  display: block;
  width: 100%;
  ${sharedStyles}
`;

export const StyledTextArea = styled.textarea`
  background-color: #eee;
  width: 100%;
  min-height: 100px;
  resize: none;
  ${sharedStyles}
`;
export const StyledButton = styled.button`
  display: block;
  background-color: #f7797d;
  color: #fff;
  font-size: 0.9rem;
  border: 0;
  border-radius: 5px;
  height: 40px;
  padding: 0 20px;
  cursor: pointer;
  box-sizing: border-box;
`;

export const EditButton = styled.button`
  display: block;
  font-size: 0.8rem;
  margin: 5px;
  display: flex;
  justify-content: right;
  align-items: center;
`;

export const WelcomeButton = styled.button`
  display: block;
  background-color: #f7797d;
  color: #fff;
  font-size: 0.9rem;
  border: 10;
  border-radius: 5px;
  height: 40px;
  padding: 0 20px;
  cursor: pointer;
  margin-top: 25%;
  box-sizing: border-box;
`;

export const StyledFieldset = styled.fieldset`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 20px 0;
  legend {
    padding: 0 10px;
  }
  label {
    padding-right: 20px;
  }
  input {
    margin-right: 10px;
  }
`;

export const StyledHeader = styled.header`
  min-height: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2%;
  font-size: calc(10px + 2vmin);
  color: black;
`;

export const StyledAlert = styled.ale
