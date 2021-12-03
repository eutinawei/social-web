import React from 'react'
import styled from 'styled-components'
import Song from './Song'

const Wrapper = styled.div`
  width: calc(100% - 350px);
  padding: 16px;
  padding-right: 22px;
  margin: 16px;
  box-sizing: border-box;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5);
  max-height: calc(100vh - 100px);
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.5);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`

const Chat = ({signed, songs, tags, setTags, userInfo, loveList, userVote, setUserVote, setUserLove, setLoveList}) => {
  return (
    <Wrapper>
      {songs.map(song => (
        <Song key={`song-${song.id}`} data={song} tags={tags} setTags={setTags} signed={signed} userInfo={userInfo} userVote={userVote} loveList={loveList} setUserVote={setUserVote} setUserLove={setUserLove} setLoveList={setLoveList} />
      ))}
    </Wrapper>
  )
}

export default Chat
