import React from 'react'

function Header(params) {
  return (
    <>
      <header className="header">
        <h1>{params.text}</h1>
      </header>
    </>
  )
}

export default Header
