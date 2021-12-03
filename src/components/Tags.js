import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
`

const Tag = styled.div`
  margin-left: 10px;
  margin-top: 10px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 5px;
  font-size: 12px;
  color: #243a46;
  font-weight: bold;
`

const Tags = ({tags}) => {
  return (
    <Wrapper>
      {tags.map(tag => (
        <Tag key={Math.random()} >#{tag.word}</Tag>
      ))}
    </Wrapper>
  )
}

export default Tags
