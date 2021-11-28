import React, { useState } from 'react'
import styled from 'styled-components'
import Bar from './components/Bar'
import Sign from './components/Sign'
import sea from './asset/sea.png'

const Wrapper = styled.div`
  min-height: 100vh;
  height: 100%;
  font-family: "Noto Sans";
  margin: -8px;
  background: url(${sea}) no-repeat center/cover;
`

const SignWrapper = styled.div`
  float: right;
  width: 300px;
  padding: 16px;
  margin: 16px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5);
`


const App = () => {
  const [signed, setSigned] = useState(false)
  const [name, setName] = useState("")

  return (
    <Wrapper>
      <Bar />
      <SignWrapper>
        { signed ? (
          <p>hi {name}</p>
        ) :(
          <Sign setSigned={setSigned} setName={setName}/>
        )}
      </SignWrapper>
    </Wrapper>
  )
}

export default App
