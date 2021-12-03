import React from 'react'
import styled from 'styled-components'
import soulwave from '../asset/soulwave.png'
import Search from './Search'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  widht: 100vw;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 1;
`

const Logo = styled.button`
  background: url(${soulwave}) no-repeat center/cover;
  height: 64px;
  width: 250px;
  margin-left: -20px;
  border: 0px;
  cursor: pointer;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  margin-right: 16px;
`

const Bar = ({signed, setSongs, userInfo}) => {

  const resetSongs = () => {
    fetch('http://localhost:7000/songs', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
      }).then(response=>response.json()).then(data=>{
          if (data.status === 200) {
            setSongs(data.data)
          }
    })
  }

  return (
    <Wrapper>
      <Logo onClick={() => resetSongs()} />
      {signed && (
        <Row>
          <Search setSongs={setSongs} userInfo={userInfo} />
        </Row>
      )}
    </Wrapper>
  )
}

export default Bar
