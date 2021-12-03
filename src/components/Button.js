import React from 'react'
import styled from 'styled-components'

const Btn = styled.button`
  padding: 11px 8px 11px 8px;
  margin-top: 10px;
  box-sizing: border-box;
  width: ${props => props.width || '125px'};
  height: 40px;
  border: 0px;
  border-radius: 4px;
  cursor: pointer;
  color: #243a46;
  font-weight: bold;
  font-size: 14px;
  background-color: rgba(232, 232, 232, 0.3);
  &:hover {
    background-color: rgba(61, 96, 114, 0.8);
    color: rgba(232, 232, 232, 0.8);
  }
`

const Button = ({text, btnWidth}) => (
  <Btn width={btnWidth}>{text}</Btn>
)

export default Button
