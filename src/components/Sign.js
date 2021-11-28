import React, { useState } from 'react'
import styled from 'styled-components'

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`

const Title = styled.div`
  font-size: 14px;
  margin-right: 10px;
  color: #243a46;
  font-weight: bold;
`

const SignBtn = styled.button`
  padding: 11px 8px 11px 8px;
  margin-top: 10px;
  box-sizing: border-box;
  width: 125px;
  height: 40px;
  border: 0px;
  border-radius: 4px;
  cursor: pointer;
  color: #243a46;
  font-weight: bold;
  font-size: 14px;
  background-color: rgba(232, 232, 232, 0.3);
  &:hover {
    background-color: rgba(36, 58, 70, 0.8);
    color: rgba(232, 232, 232, 0.8);
  }
`

const Input = styled.input`
  padding: 11px 8px 11px 8px;
  box-sizing: border-box;
  width: 250px;
  height: 40px;
  border: 0px;
  border-radius: 4px;
  background-color: rgba(232, 232, 232, 0.3);
  line-height: 16px;
  font-size: 14px;
  color: #595959;
  outline: none;
`

const Sign = ({setSigned, setName}) => {
  const [isSignIn, setIsSignIn] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = (e) => {
    e.preventDefault()
    fetch('http://localhost:7000/signIn', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({'username': username, 'password': password})
      }).then(response=>response.json()).then(data=>{
          window.alert(data.message)
          if (data.status === 200) {
            setSigned(true)
            setName(username)
          }
    })
  }

  const handleSignUp = (e) => {
    e.preventDefault()
    fetch('http://localhost:7000/signUp', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({'username': username, 'password': password})
      }).then(response=>response.json()).then(data=>{
          window.alert(data.message)
          if (data.status === 200) {
            setSigned(true)
            setName(username)
          }
    })
  }
  return (
    <form onSubmit={isSignIn ? handleSignIn : handleSignUp}>
      <Row>
        <Title>Username</Title>
        <Input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Row>
      <Row>
        <Title>Password</Title>
        <Input type="text" value={password} onChange={e => setPassword(e.target.value)} />
      </Row>
      <Row>
        <SignBtn type="submit" onClick={() => setIsSignIn(true)}>Sign In</SignBtn>
        <SignBtn type="submit" onClick={() => setIsSignIn(false)}>Sign Up</SignBtn>
      </Row>
    </form>
  )
}

export default Sign
