import React from 'react'

const App = () => {

  async function getRes() {
    const res = await fetch("http://localhost:4000/")
    let data = await res.json();
    console.log(data)
  }

  return (
    <div>
      <button onClick={()=>getRes()}>Send</button>
    </div>
  )
}

export default App