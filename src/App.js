import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Bar from './components/Bar'
import Sign from './components/Sign'
import Chat from './components/Chat'
import sea from './asset/sea.png'
import Profile from './components/Profile'
import Post from './components/Post'

const Wrapper = styled.div`
  min-height: 100vh;
  height: 100%;
  font-family: "Noto Sans";
  margin: -8px;
  background: url(${sea}) no-repeat center/cover;
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: no-wrap;
  align-items: flex-start;
`

const SignWrapper = styled.div`
  float: right;
  max-height: calc(100vh - 100px);
  width: 300px;
  padding: 16px;
  margin: 16px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5);
`

const RightPart = styled.div`
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 100px);
`


const App = () => {
  const [signed, setSigned] = useState(false)
  const [songs, setSongs] = useState([{}])
  const [tags, setTags] = useState([{}])
  const [userInfo, setUserInfo] = useState({})
  const [userVote, setUserVote] = useState(0)
  const [userLove, setUserLove] = useState(0)
  const [loveList, setLoveList] = useState([])

  useEffect( () => {
    fetch('http://localhost:7000/songs', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
      }).then(response=>response.json()).then(data=>{
          if (data.status === 200) {
            setSongs(data.data)
          }
    })
    fetch('http://localhost:7000/getTags', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
      }).then(response=>response.json()).then(data=>{
          if (data.status === 200) {
            setTags(data.data)
          }
    })
   }, [setSongs, setTags])

  return (
    <Wrapper>
      <Bar signed={signed} setSongs={setSongs} userInfo={userInfo} />
      <Content>
        <Chat signed={signed} songs={songs} tags={tags} setTags={setTags} setSongs={setSongs} userInfo={userInfo} loveList={loveList} userVote={userVote} setUserVote={setUserVote} setUserLove={setUserLove} setLoveList={setLoveList} />
        <RightPart>
        <SignWrapper>
          { signed ? (
            <Profile userInfo={userInfo} loveList={loveList} userVote={userVote} userLove={userLove} setSongs={setSongs} />
          ) :(
            <Sign setSigned={setSigned} setUserInfo={setUserInfo} setLoveList={setLoveList} setUserVote={setUserVote} setUserLove={setUserLove} />
          )}
        </SignWrapper>
        { signed && (
          <SignWrapper>
            <Post username={userInfo.username} setSongs={setSongs} />
          </SignWrapper>
        )}
        </RightPart>
      </Content>
    </Wrapper>
  )
}

export default App
