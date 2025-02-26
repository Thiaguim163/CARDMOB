import { useState } from 'react'
import './App.css'

import Counter from './componnents/Counter'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <>
  
    < Counter title="Contando..."/>
    < Counter initial={100}/>

    </>
  )
}

export default App
