'use client'
import { contactDetails } from '@/utils/contact'
import React from 'react'

function ContactBar() {
  return (
    <div className='bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex justify-between  px-2 sm:px-10  py-1.5'>
   
      <div className='flex space-x-5 text-white'>
        
        
          <a  href={contactDetails.phone.href} className=" text-sm flex items-center gap-2">
            <i className="icon-[ph--phone-light] size-5 "></i>
          <p className=' hover:text-orange-400   text-xs md:text-sm'>{contactDetails.phone.value}</p>
          </a>
          <a  href={contactDetails.email.href}  className=" text-sm flex items-center gap-2">
          <i className="icon-[mdi--email] text-white  size-6 "></i>
          <p className=' hover:text-orange-400  text-xs md:text-sm' >{contactDetails.email.value} </p>
           
          </a>
       </div>
             {/* Social Media Icons */}

        <a href={contactDetails.whatsapp.href} target="_blank" className="group flex items-center  text-white  space-x-2 cursor-pointer">
        <span className='icon-[ic--sharp-whatsapp] size-6 md:size-10  text-green-500'></span>
        <div  className='hidden md:block group-hover:text-green-500'>
          <small>Whatsapp</small>
          <p className='font-semibold text-sm  group-hover:text-orange-400 '>{contactDetails.whatsapp.value}</p>
        </div>
      </a>


    </div>
  )
}

export default ContactBar