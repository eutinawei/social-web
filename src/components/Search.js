import React, { useState } from 'react'
import styled from 'styled-components'
import search from '../asset/search.png'

const Wrapper = styled.form`
  display: flex;
  align-items: center;
`

const Input = styled.textarea`
  padding: 11px 8px 11px 8px;
  box-sizing: border-box;
  width: 266px;
  height: 40px;
  border: 0px;
  border-radius: 4px;
  background-color: rgba(232, 232, 232, 0.3);
  line-height: 16px;
  font-size: 14px;
  color: #595959;
  outline: none;
  margin-right: 10px;
  resize: none;
`

const SearchBtn = styled.button`
  background: url(${search}) no-repeat center/cover;
  width: 25px;
  height: 25px;
  opacity: 0.5;
  border: 0;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`

const Search = ({setSongs, userInfo}) => {
  const [searchText, setSearchText] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    fetch('http://localhost:7000/search', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({'text': `%${searchText}%`, 'username': userInfo.username})
      }).then(response=>response.json()).then(data=>{
          if (data.status === 200) {
            setSongs(data.data)
            setSearchText("")
          }
          else window.alert(data.message)
    })
  }

  return (
    <Wrapper onSubmit={handleSearch} >
      <Input value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      <SearchBtn type="submit" />
    </Wrapper>
  )
}

export default Search
