'use client'
import React from 'react'

function ContactBar() {
  return (
    <div className='bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex justify-between  px-2 sm:px-10  py-1.5'>
   
      <div className='flex space-x-5 text-white'>
        
        
          <a  href="tel:+971505996321" className=" text-sm flex items-center gap-2">
            <i className="icon-[ph--phone-light] text-lg"></i>
            <p  className=' hover:text-orange-400 '>+971-50-599-6321</p>
          </a>
          <a href="mailto:rak@marjanuae.com" className=" text-sm flex items-center gap-2">
          <i className="icon-[mdi--email] text-white text-lg"></i>
          <p className=' hover:text-orange-400 ' >rak@marjanuae.com</p>
           
          </a>
       </div>
             {/* Social Media Icons */}

        <a href={"https://api.whatsapp.com/send/?phone=971505996321&text=Hi+%2AAL+MORJAN+RENT+CARS%2A%21+I+need+more+info+about+Rental+https%3A%2F%2Fmarjanuae.com%2Ffleet&type=phone_number&app_absent=0"} target="_blank" className="group flex items-center  text-white  space-x-2 cursor-pointer">
        <span className='icon-[ic--sharp-whatsapp] size-8 md:size-10  text-green-500'></span>
        <div  className='hidden md:block group-hover:text-green-500'>
          <small>Whatsapp</small>
          <p className='font-semibold text-sm  group-hover:text-orange-400 '>971505996321</p>
        </div>
      </a>


    </div>
  )
}

export default ContactBar