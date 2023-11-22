import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

function MainContent() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-700 text-sm">
      <Sidebar />

      <Header />

      <main className="xl:pl-[270px] xl:pr-[35px] py-5  px-4 min-h-screen flex justify-center items-center">
        <Outlet />
      </main>
    </div>
  )
}

export default MainContent