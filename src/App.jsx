import { useEffect } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { logo } from './assets'
import { Home, CreatePost } from './pages'
import pjson from "../package.json"


const baseURL = () => {
  if (import.meta.env.MODE === "production") {
    return 'https://ai-image-generator-server-gamma.vercel.app'
  }
  return 'http://localhost:3000'
}


export const App = () => {
  useEffect(() => {
    (async () => {
      console.log(`client version: ${pjson.version}`)
      const response = await fetch(`${baseURL()}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        const result = await response.json()
        console.log(`server version: ${result.version}`)
      }
    })()
  }, [])

  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
        <Link to='/'>
          <img src={logo} alt='logo' className='w-28 object-contain' />
        </Link>
        <Link to='/create-post' className='bg-transparent hover:bg-pink-400 text-pink-500 font-semibold hover:text-white py-2 px-4 border border-pink-500 hover:border-transparent rounded'>Create</Link>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#f6f6f8] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
