import { Suspense, useState } from 'react'
import './App.css'
import AvailableTickets from './components/AvailableTickets/AvailableTickets'
import '@fortawesome/fontawesome-free/css/all.min.css'

const fetchTickets = async () => {
  const res = await fetch("/tickets.json")
  return res.json()
}

function App() {
  const ticketsPromise = fetchTickets()

  const [inProgress, setInProgress] = useState(0)
  const [resolved, setResolved] = useState(0)

  return (
    <>
      {/* NAVBAR */}
      <header>
        <nav className="flex justify-between items-center px-6 md:px-[80px] py-[16px] flex-wrap gap-2">
          <div className="flex gap-2 items-center">
            <h1 className="font-bold text-2xl">CS — Ticket System</h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Hide links on mobile */}
            <div className="hidden md:flex justify-center items-center gap-8 top-actions flex-wrap">
              <a href="">Home</a>
              <a href="">FAQ</a>
              <a href="">Changelog</a>
              <a href="">Blog</a>
              <a href="">Download</a>
              <a href="">Contact</a>
            </div>
            <button className="btn text-white text-base font-semibold rounded-md bg-gradient-to-l from-[#9f62f2] to-[#632ee3]">
              + New Ticket
            </button>
          </div>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="bg-gray-100 py-10 px-4 md:px-20">
        
        {/* PROGRESS + RESOLVED */}
        <section className="progress-resolved-bar flex flex-col md:flex-row justify-around items-center max-w-[1440px] mx-auto gap-6 md:gap-8 px-4 md:px-6 mb-20">
          <div className="progress-section flex flex-col items-center justify-center w-full md:w-1/2 h-[200px] text-white text-center rounded-lg bg-progress">
            <h1 className="text-xl font-medium mb-3">In-Progress</h1>
            <span className="font-bold text-6xl">{inProgress}</span>
          </div>

          <div className="resolved-section flex flex-col items-center justify-center w-full md:w-1/2 h-[200px] text-white text-center rounded-lg bg-resolved">
            <h1 className="text-xl font-medium mb-3">Resolved</h1>
            <span className="font-bold text-6xl">{resolved}</span>
          </div>
        </section>

        {/* CUSTOMER TICKETS */}
        <h2 className='font-semibold text-2xl mb-4'>Customer Tickets</h2>
        <Suspense fallback={<span className="loading loading-spinner loading-xl"></span>}>
          <AvailableTickets 
            ticketsPromise={ticketsPromise} 
            inProgress={inProgress} 
            setInProgress={setInProgress}
            resolved={resolved}
            setResolved={setResolved}
          />
        </Suspense>
      </main>

      {/* FOOTER */}
      <section className='max-w-auto min-h-[420px] bg-black px-6 py-12'>
        <div className="grid md:flex justify-around gap-8">
          <div className="mt-6">
            <h2 className="text-white font-bold text-[24px] mb-4">CS — Ticket System</h2>
            <p className="text-white font-extralight text-sm leading-6">
              Lorem Ipsum is simply dummy text of the <br /> printing and typesetting industry. Lorem <br /> Ipsum has been the industry's standard <br /> dummy text ever since the 1500s.
            </p>
          </div>

          <div className="text-white mt-6">
            <h2 className='font-bold text-[20px] mb-4'>Company</h2>
            <div>
              <li>About Us</li>
              <li>Our Mission</li>
              <li>Contact Sales</li>
            </div>
          </div>

          <div className="text-white mt-6">
            <h2 className='font-bold text-[20px] mb-4'>Service</h2>
            <div>
              <li>Products & Services</li>
              <li>Customer Stories</li>
              <li>Download Apps</li>
            </div>
          </div>

          <div className="text-white mt-6">
            <h2 className='font-bold text-[20px] mb-4'>Information</h2>
            <div>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Join Us</li>
            </div>
          </div>

          <div className="text-white mt-6">
            <h2 className='font-bold text-[20px] mb-4'>Social Links</h2>
            <div className="flex flex-col gap-2">
              <a href=""><i className="fa-brands fa-x-twitter mr-2"></i>Thread</a>
              <a href=""><i className="fa-brands fa-linkedin mr-2"></i>LinkedIn</a>
              <a href=""><i className="fa-brands fa-facebook mr-2"></i>Facebook</a>
              <a href=""><i className="fa-solid fa-envelope mr-2"></i>Message</a>
            </div>
          </div>
        </div>

        <p className="parra text-white mt-12 text-sm text-center">© 2025 CS — Ticket System. All rights reserved.</p>
      </section>
    </>
  )
}

export default App
