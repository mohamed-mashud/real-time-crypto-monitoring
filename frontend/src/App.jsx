import { useState } from "react"
import Login from "./pages/Login"
import Main from "./pages/Main"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <>
    {isLoggedIn ? (
      <Main /> 
      ): (
      <Login onLogin={() => setIsLoggedIn(true)} />
    )}
    </>
  )
}


// dev usages 
// function App() {
//   return (
//     <>
//       <Main />
//     </>
//   )
// }

export default App
