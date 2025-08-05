
import { Outlet } from 'react-router';
import CommonLayout from './components/layouts/CommonLayout';



function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <CommonLayout>
        <Outlet />
      </CommonLayout>
    </div>
  )
}

export default App