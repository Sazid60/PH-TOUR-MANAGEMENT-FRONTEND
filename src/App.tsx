
import { Outlet } from 'react-router';



function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <h1>This is App Component!</h1>
      <Outlet/>
    </div>
  )
}

export default App