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
      <header>
        <nav className="flex justify-between items-center px-[80px] py-[16px] flex-wrap gap-2">
          <div className="flex gap-2 items-center">
            <h1 className="font-bold text-2xl">CS — Ticket System</h1>
          </div>
          <div className="flex justify-center items-center gap-8 top-actions flex-wrap">
            <a href="">Home</a>
            <a href="">FAQ</a>
            <a href="">Changelog</a>
            <a href="">Blog</a>
            <a href="">Download</a>
            <a href="">Contact</a>
            <button className="btn text-white text-base font-semibold items-center rounded-md bg-gradient-to-l from-[#9f62f2] to-[#632ee3] hidden sm:flex">+ New Ticket</button>
          </div>
        </nav>
      </header>

      <main className="bg-gray-100 py-10 px-20">
        
        <section className="progress-resolved-bar flex justify-around items-center max-w-[1440px] mx-auto gap-8 px-6 mb-20">
          
          <div className="progress-section flex flex-col items-center justify-center w-1/2 h-[200px] text-white text-center rounded-lg bg-progress">
            <h1 className="text-xl font-medium mb-3">In-Progress</h1>
            <span className="font-bold text-6xl">{inProgress}</span>
          </div>

         
          <div className="resolved-section flex flex-col items-center justify-center w-1/2 h-[200px] text-white text-center rounded-lg bg-resolved">
            <h1 className="text-xl font-medium mb-3">Resolved</h1>
            <span className="font-bold text-6xl">{resolved}</span>
          </div>
        </section>

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
      <section className='max-w-auto h-[420px] bg-black '>
          <div className="div ">

         <div className="mt-20">
            <h2 className="text-white font-bold text-[24px] mb-4">CS — Ticket System </h2>
            <p className="text-white font-extralight">Lorem Ipsum is simply dummy text of the <br /> printing and typesetting industry. Lorem <br /> Ipsum has been the industry's standard <br /> dummy text ever since the 1500s, when an <br /> unknown printer took a galley of type and <br /> scrambled it to make a type specimen book. </p>
        </div>
        <div className="text-white mt-20 ">
            <h2 className='font-bold text-[20px] mb-4'>Company</h2>
           <div>
              <li>About Us</li>
              <li>Our Mission</li>
              <li>Contact Saled</li>
           </div>
        </div>
        <div className="text-white mt-20">
            <h2 className='font-bold text-[20px] mb-4'>Service</h2>
            <div>
                <li>Products & Services</li>
                <li>Customer Stories</li>
                <li>Download Apps</li>
            </div>
        </div>
        <div className="text-white mt-20">
            <h2 className='font-bold text-[20px] mb-4'>Information</h2>
            <div>
               <li>Privacy Policy</li>
               <li>Terms & Conditions</li>
               <li>Join Us</li>
            </div>
        </div>
        <div className="text-white mt-20">
            <h2 className='font-bold text-[20px] mb-4'>Scoial Links</h2>
            <div>
                <a href=""><i className="mb-4 fa-brands fa-x-twitter"></i>Thread</a>
                <br /> 
                <a href=""><i className="mb-4 fa-brands fa-linkedin"></i>Linkdin</a>
                <br />
                <a href=""><i className="mb-4 fa-brands fa-facebook"></i>Facebook</a>
                <br />
                <a href=""><i className="mb-4 fa-solid fa-envelope"></i>Message</a>
            </div>
        </div>

       </div>

       <p className="parra text-white mt-20">© 2025 CS — Ticket System. All rights reserved.</p>

        </section>
    </>
  )
}

export default App
