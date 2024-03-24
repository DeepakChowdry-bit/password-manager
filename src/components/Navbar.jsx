import React from 'react'

const Navbar = () => {
  return (
    <div className='flex items-center justify-center h-16 fixed w-full shadow-md bg-slate-900'>
      <div className='flex items-center justify-between w-[85%]'>
        <h3 className='font-semibold text-base tracking-wider text-[#eee]'>
          <span className='text-green-500 font-black text-lg'>&lt;</span> 
          PASSMAN 
          <span className='text-green-500 font-black text-lg'>&gt;</span>
        </h3>
        {/* <div className='flex items-center justify-center gap-6 text-[#eee]'>
          <p>Home</p>
          <p>About</p>
          <p>Contact</p>
        </div> */}
      </div>
    </div>
  )
}

export default Navbar