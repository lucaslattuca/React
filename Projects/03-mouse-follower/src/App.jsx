import { useState } from 'react'
import './App.css'
import { FollowMouse } from './components/FollowMouse'

function App() {
  const [mounted, setMounted] = useState(true)
  return (
    <>
      <h3>Proyecto 3</h3>
      {
        mounted && <FollowMouse />
      }
      <br />
      <button onClick={() => setMounted(!mounted)}>Toggle mounted FollowMouse component</button>
    </>
  )
}

export default App
