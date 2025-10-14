import { Suspense, useState } from 'react'

import './App.css'
import AvailableTickets from './components/AvailableTickets/AvailableTickets'


const fetchTickets = async () =>{
  const res = await fetch("/tickets.json")
  return res.json()
}

function App() {
  const ticketsPromise = fetchTickets()

  return (
    <>
     <header>
      <nav className="flex justify-between items-center  px-[80px] py-[16px] flex-wrap gap-2 ">
            <div className="flex gap-2 items-center">
                <h1 className="font-bold text-2xl ">CS — Ticket System</h1>
            </div>
            <div className="flex justify-center items-center gap-8 top-actions flex-wrap">
                 <a href="">Home</a>
                 <a href="">FAQ</a>
                 <a href="">Changelog</a>
                 <a href="">Blog</a>
                 <a href="">Download</a>
                 <a href="">Contact</a>
                <button className="btn text-white text-base font-semibold items-center rounded-md  bg-gradient-to-l from-[#9f62f2] to-[#632ee3] hidden sm:flex">+ New Ticket</button>
            </div>
        </nav>
     </header>

     <main className="bg-gray-100 py-10">
  <section className="progress-resolved-bar flex justify-between items-center max-w-[1440px] mx-auto gap-8 px-6">
    {/* /* <!-- In-Progress --> */} 
    <div className="progress-section flex flex-col items-center justify-center w-1/2 h-[200px]  text-white text-center rounded-lg bg-progress">
      <h1 className="text-xl font-medium mb-3">In-Progress</h1>
      <span className="font-bold text-6xl">0</span>
    </div>

    {/* <!-- Resolved --> */}
    <div className="resolved-section flex flex-col items-center justify-center w-1/2 h-[200px]  text-white text-center rounded-lg bg-resolved">
      <h1 className="text-xl font-medium mb-3">Resolved</h1>
      <span className="font-bold text-6xl">0</span>
    </div>
  </section>
     </main>

    <Suspense fallback={<span className="loading loading-spinner loading-xl"></span>}>
       <AvailableTickets ticketsPromise={ticketsPromise}></AvailableTickets>
    </Suspense>
    </>
  )
}

export default App
