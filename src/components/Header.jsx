import PropTypes from 'prop-types'
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

Header.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Header
