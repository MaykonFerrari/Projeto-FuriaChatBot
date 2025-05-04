import { useState } from 'react'
import './App.css'
import ChatBox from './componentes/Chat/ChatBox'
import Login from './componentes/Login/Login'
import ChatOnline from './componentes/ChatOnline/ChatOnline';


function App() {
  const [usuario, setUsuario] = useState(null);

  const handleLogout = () => {
    setUsuario(null);
  }

  return (
    <>
      {usuario ? (
        <ChatOnline usuario={usuario} deslogar={handleLogout} />
      ) : (
        < Login onLogin={setUsuario} />
    )}
      <ChatBox/>
    </>

  )
}

export default App
