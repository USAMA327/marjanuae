import React from 'react'
import {Icon} from "@iconify/react";
export default function HelpSection() {
  return (
  
        <div className="my-6 p-6 bg-white shadow-md rounded-lg w-full text-center flex flex-col justify-center items-center">
          <h3 className="text-lg font-semibold text-primary bg-[#1572D310]  px-4 py-3 rounded-sm mb-4 text-center">Need help booking?</h3>

        <p className="text-gray-600 mt-2">
          Call our customer service team to speak to one of our advisers.
        </p>
        <a
          href="tel:+971505996321"
          className="mt-4 text-lg group font-semibold text-primary flex items-center justify-center"
        >
                 <Icon icon="mdi:phone" className="text-lg text-primary " />
          <p className=' group-hover:text-orange-400 '>+971-50-599-6321</p>
          
        </a>
          </div>
      
  )
}
