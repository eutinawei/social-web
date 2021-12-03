import React, { useState } from 'react'
import styled from 'styled-components'
import TextInput from './TextInput'
import Button from './Button'

const Wrapper = styled.form`
  text-align: center;
`

const Title = styled.div`
  font-size: 18px;
  color: #243a46;
  font-weight: bold;
  margin-bottom: 10px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`

const Post = ({username, setSongs}) => {
  const [artist, setArtist] = useState("")
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [comment, setComment] = useState("")

  const createSong = (e) => {
    e.preventDefault()
    fetch('http://localhost:7000/createSong', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          'artist': artist,
          'title': title,
          'url': url,
          'comment': comment,
          'username': username
        })
      }).then(response=>response.json()).then(data=>{
          window.alert(data.message)
          setArtist("")
          setTitle("")
          setUrl("")
          setComment("")
          if (data.status === 200) {
            fetch('http://localhost:7000/songs', {
              method: 'get',
              headers: { 'Content-Type': 'application/json' },
              }).then(response=>response.json()).then(data=>{
                  if (data.status === 200) {
                    setSongs(data.data)
                  }
            })
          }
    })
  }
 
  return (
    <Wrapper onSubmit={createSong}>
      <Title>Create Post</Title>
      <Row>
        <TextInput title="Artist" inputValue={artist} inputFunc={e => setArtist(e.target.value)} />
      </Row>
      <Row>
        <TextInput title="Song Title" inputValue={title} inputFunc={e => setTitle(e.target.value)} />
      </Row>
      <Row>
        <TextInput title="Url" inputValue={url} inputFunc={e => setUrl(e.target.value)} />
      </Row>
      <Row>
        <TextInput title="Comment" inputHeight="200px" inputValue={comment} inputFunc={e => setComment(e.target.value)} />
      </Row>
      <Row>
        <Button text="Submit" type="submit" btnWidth="280px" />
      </Row>
    </Wrapper>
  )
}

export default Post
