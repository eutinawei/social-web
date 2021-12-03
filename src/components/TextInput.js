import React from 'react'
import styled from 'styled-components'

const Title = styled.div`
  font-size: 14px;
  margin-right: 10px;
  color: #243a46;
  font-weight: bold;
  white-space: nowrap;
`

const Input = styled.textarea`
  padding: 11px 8px 11px 8px;
  box-sizing: border-box;
  width: 250px;
  height: ${props => props.height || '40px'};
  border: 0px;
  border-radius: 4px;
  background-color: rgba(232, 232, 232, 0.3);
  line-height: 16px;
  font-size: 14px;
  color: #595959;
  outline: none;
  resize: none;
`

const TextInput = ({title, inputValue, inputFunc, inputHeight}) => {
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Input type="text" value={inputValue} onChange={inputFunc} height={inputHeight} />
    </React.Fragment>
  )
}

export default TextInput
