import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './Button'
import TextInput from './TextInput'

const Form = styled.form`
  &:not(:last-child) {
    margin-bottom: 30px;
  }
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`

const Sign = ({setSigned, setUserInfo, setLoveList, setUserVote, setUserLove}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [signupName, setSignupName] = useState('')
  const [signupPassword, setSignupPassword] = useState('')

  const handleSignIn = (e) => {
    e.preventDefault()
    fetch('http://localhost:7000/signIn', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({'username': username, 'password': password})
      }).then(response=>response.json()).then(data=>{
          if (data.status === 200) {
            setSigned(true)
            setUserInfo(data.data[0])
            setUserVote(data.data[0].vote)
            fetch('http://localhost:7000/love', {
              method: 'post',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({'username': username})
              }).then(response=>response.json()).then(data=>{
                  if (data.status === 200) {
                    let loveList = []
                    for (let i = 0; i < data.data.length; i++) {
                      loveList.push(data.data[i]['song_id'])
                    }
                    setLoveList(loveList)
                    setUserLove(loveList.length)
                  }
                  else window.alert(data.message)
              })
            }
          else window.alert(data.message)
    })
  }

  const handleSignUp = (e) => {
    e.preventDefault()
    fetch('http://localhost:7000/signUp', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({'username': signupName, 'password': signupPassword})
      }).then(response=>response.json()).then(data=>{
          if (data.status === 200) {
            setSigned(true)
            setUserInfo({'username':signupName, 'password':signupPassword, 'vote':0})
          }
          else window.alert(data.message)
    })
  }
  return (
    <React.Fragment>
      <Form onSubmit={handleSignIn}>
        <Row>
          <TextInput title="Username" inputValue={username} inputFunc={e => setUsername(e.target.value)} />
        </Row>
        <Row>
          <TextInput title="Password" inputValue={password} inputFunc={e => setPassword(e.target.value)} />
        </Row>
        <Row>
          <Button text="Sign In" type="submit" />
        </Row>
      </Form>
      <Form onSubmit={handleSignUp}>
        <Row>
          <TextInput title="Username" inputValue={signupName} inputFunc={e => setSignupName(e.target.value)} />
        </Row>
        <Row>
          <TextInput title="Password" inputValue={signupPassword} inputFunc={e => setSignupPassword(e.target.value)} />
        </Row>
        <Row>
          <Button text="Sign Up" type="submit" />
        </Row>
      </Form>
    </React.Fragment>
    
  )
}

export default Sign
