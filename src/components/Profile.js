import React from 'react'
import styled from 'styled-components'
import top from '../asset/top.png'
import loved from '../asset/loved.png'

const Wrapper = styled.div`
  text-align: center;
`

const Name = styled.button`
  font-size: 18px;
  color: #3d6072;
  font-weight: bold;
  margin-bottom: 5px;
  border: 0px;
  background: transparent;
  cursor: pointer;
`

const Data = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin-left: 50px;
`

const AData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Vote = styled.div`
  background: url(${top}) no-repeat center/cover;
  width: 30px;
  height: 30px;
  margin-right: 10px;
`

const Number = styled.div`
  font-size: 16px;
  color: #243a46;
  font-weight: bold;
`

const Loved = styled.button`
  background: url(${loved}) no-repeat center/cover;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border: 0px;
  cursor: pointer;
`

const Profile = ({userInfo, userVote, userLove, setSongs}) => {

  const userPost = () => {
    fetch('http://localhost:7000/searchUserPost', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({'username': userInfo.username})
      }).then(response=>response.json()).then(data=>{
          if (data.status === 200) {
            setSongs(data.data)
          }
    })
  }

  const searchUserLove = () => {
    fetch('http://localhost:7000/searchUserLove', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({'username': userInfo.username})
      }).then(response=>response.json()).then(data=>{
          if (data.status === 200) {
            setSongs(data.data)
          }
          else window.alert(data.message)
    })
  }

  return (
    <Wrapper>
      <Name onClick={() => userPost()}>{userInfo.username}</Name>
      <Data>
        <AData>
          <Vote />
          <Number>{userVote}</Number>
        </AData>
        <AData>
          <Loved onClick={() => searchUserLove()} />
          <Number>{userLove}</Number>
        </AData>
      </Data>
    </Wrapper>
  )
}

export default Profile
