import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Tags from './Tags'
import logo from '../asset/logo.png'
import top from '../asset/top.png'
import love from '../asset/love.png'
import loved from '../asset/loved.png'

const Wrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  }
`

const Name = styled.div`
  margin: 5px;
  font-size: 18px;
  color: #3d6072;
  font-weight: bold;
`

const Title = styled.div`
  display:flex;
  align-items: center;
  margin-left: 10px;
  font-size: 14px;
  color: #243a46;
  font-weight: bold;
`

const Logo = styled.div`
  background: url(${logo}) no-repeat center/cover;
  width: 18px;
  height: 18px;
`

const Url = styled.a`
  color: #3d6072;
  font-weight: bold;
`

const Comment = styled.div`
  margin-left: 10px;
  margin-top: 10px;
  font-size: 14px;
  color: #262626;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 10px;
`

const Interact = styled.div`
  margin-left: 10px;
  margin-top: 10px;
  display: flex;
  align-items: center;
`

const Vote = styled.button`
  background: url(${top}) no-repeat center/cover;
  width: 18px;
  height: 18px;
  border: 0;
  cursor: pointer;
`

const VoteNumber = styled.div`
  margin-left: 5px;
  font-size: 14px;
  color: #243a46;
  font-weight: bold;
`

const Love = styled.button`
  background: url(${love}) no-repeat center/cover;
  width: 18px;
  height: 18px;
  border: 0;
  cursor: pointer;
  margin-left: 10px;
`

const Loved = styled.button`
  background: url(${loved}) no-repeat center/cover;
  width: 18px;
  height: 18px;
  border: 0;
  cursor: pointer;
  margin-left: 10px;
`

const TagForm = styled.form`
  margin-left: 10px;
  height: 25px;
`

const TagInput = styled.input`
  padding: 6px 2px 6px 2px;
  box-sizing: border-box;
  width: 100px;
  height: 25px;
  border: 0px;
  border-radius: 4px;
  background-color: rgba(232, 232, 232, 0.3);
  line-height: 12px;
  font-size: 12px;
  color: #595959;
  outline: none;
  resize: none;
`

const SubmitInput = styled.input`
  display: none;
`

const Song = ({signed, data, tags, setTags, userInfo, userVote, loveList, setUserVote, setUserLove, setLoveList}) => {
  const [voteNum, setVoteNum] = useState(data.vote)
  const [songTags, setSongTags] = useState([{}])
  const [loved, setLoved] = useState(false)
  const [tagWord, setTagWord] = useState("")
  const songId = data.id
  
  useEffect(() => {
    if (loveList.includes(data.id)) setLoved(true)
    let tempLst = [{}]
    let count = 0
    for (let i = 0; i < tags.length; i++) {
      if (tags[i]['song_id'] === songId) {
        tempLst[count] = tags[i]
        count += 1
      }
    }
    if (count !== 0) setSongTags(tempLst)
  }, [loveList, data.id, tags, songId])

  const upVote = () => {
    fetch('http://localhost:7000/upVote', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({'id': data.id, 'username': userInfo.username})
      }).then(response=>response.json()).then(data=>{
          if (data.status === 200) {
            setVoteNum(voteNum + 1)
            setUserVote(userVote + 1)
          }
          else window.alert(data.message)
    })
  }

  const addLove = () => {
    fetch('http://localhost:7000/addLove', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({'id': data.id, 'username': userInfo.username})
      }).then(response=>response.json()).then(data=>{
          if (data.status === 200) {
            setLoved(true)
            loveList.push(songId)
            setLoveList(loveList)
            setUserLove(loveList.length)
          }
          else window.alert(data.message)
    })
  }

  const removeLove = () => {
    fetch('http://localhost:7000/removeLove', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({'id': data.id, 'username': userInfo.username})
      }).then(response=>response.json()).then(data=>{
          if (data.status === 200) {
            setLoved(false)
            loveList.splice(loveList.indexOf(songId), 1)
            setLoveList(loveList)
            setUserLove(loveList.length)
          }
          else console.log(data.message)
    })
  }

  const createTag = (e) => {
    e.preventDefault()
    fetch('http://localhost:7000/addTag', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({'song_id': data.id, 'word': tagWord})
      }).then(response=>response.json()).then(data=>{
          if (data.status === 200) {
            setTags(data.data)
            setTagWord("")
          }
          else window.alert(data.message)
    })
  }

  return (
    <Wrapper>
      <Name>{data.username}</Name>
      <Title>
        <Logo />&nbsp;
        {data.artist} -&nbsp;
        <Url href={data.url} target="_blank"> {data.title}</Url>
      </Title>
      <Comment>{data.comment}</Comment>
      {(Object.keys(songTags[0]).length !== 0) && (<Tags tags={songTags}/>)}
      {signed && (
        <Interact>
          <Vote onClick={() => upVote()} />
          <VoteNumber>{voteNum}</VoteNumber>
          {
            loved ? (<Loved onClick={() => removeLove()} />) : (<Love onClick={() => addLove()} />)
          }
          <TagForm onSubmit={createTag}>
            <TagInput value={tagWord} onChange={e => setTagWord(e.target.value)}/>
            <SubmitInput type="submit" />
          </TagForm>
        </Interact>
      )}
    </Wrapper>
  )
}

export default Song
