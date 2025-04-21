import { useState } from 'react'
import Header from './Header'

function Tasks() {
  const [inputValue, setInputValue] = useState('')

  const [message, setMessage] = useState(['Ola mundo!', 'FSW, muito louco!'])

  function handleButtonClick() {
    setMessage([...message, inputValue])
  }

  return (
    <div className="app">
      <input
        className="input"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="button" onClick={handleButtonClick}>
        Adicionar
      </button>
      <Header>
        <h1>- Mensagens -</h1>
      </Header>
      <ul className="messages">
        {message.map((item, index) => (
          <li key={index}>
            {index + 1} - {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Tasks
