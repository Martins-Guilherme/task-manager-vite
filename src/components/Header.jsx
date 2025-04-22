import React from 'react'

function Header(params) {
  return (
    <>
      <header className="header">
        console.log(params);
        <h1>{params.text}</h1>
      </header>
    </>
  )
}

export default Header
