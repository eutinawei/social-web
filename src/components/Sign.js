import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './Button'
import TextInput from './TextInput'

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`

const Sign = ({setSigned, setUserInfo, setLoveList, setUserVote, setUserLove}) => {
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
          if (data.status === 200) {
            setSigned(true)
            setUserInfo(data.data[0])
            setUserVote(data.data[0].vote)
          }
          else window.alert(data.message)
    })
    if (isSignIn) {
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
  }

  const handleSignUp = (e) => {
    e.preventDefault()
    fetch('http://localhost:7000/signUp', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({'username': username, 'password': password})
      }).then(response=>response.json()).then(data=>{
          if (data.status === 200) {
            setSigned(true)
            setUserInfo({'username':username, 'password':password, 'vote':0})
          }
          else window.alert(data.message)
    })
  }
  return (
    <form onSubmit={isSignIn ? handleSignIn : handleSignUp}>
      <Row>
        <TextInput title="Username" inputValue={username} inputFunc={e => setUsername(e.target.value)} />
      </Row>
      <Row>
        <TextInput title="Password" inputValue={password} inputFunc={e => setPassword(e.target.value)} />
      </Row>
      <Row>
        <Button text="Sign In" type="submit" onClick={() => setIsSignIn(true)} />
        <Button text="Sign Up" type="submit" onClick={() => setIsSignIn(false)} />
      </Row>
    </form>
  )
}

export default Sign
