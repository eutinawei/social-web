import React from 'react'
import styled from 'styled-components'
import soulwave from '../asset/soulwave.png'

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

const Logo = styled.div`
  background: url(${soulwave}) no-repeat center/cover;
  height: 64px;
  width: 250px;
  margin-left: -20px;
`

const Bar = () => (
  <Wrapper>
    <Logo />
  </Wrapper>
)

export default Bar
