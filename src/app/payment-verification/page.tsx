"use client"

import { useSearchParams, useRouter } from "next/navigation"
import type React from "react"
import { useEffect, useState } from "react"
import { ArrowLeft, CheckCircle2, AlertCircle, Info } from "lucide-react"
import { motion } from "framer-motion"
import HelpSection from "@/components/HelpSection"

const PaymentVerification: React.FC = () => {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams?.toString())
  const router = useRouter()

  
  const orderId = params.get("oderId")
  const status = params.get("status")
  const [message, setMessage] = useState<string | null>(null)



  useEffect(() => {
    if (status === "success") {
      setMessage("Your booking has been saved. A confirmation email has been sent.")
    } else {
      setMessage(
        "Your booking has been saved, but payment was not received due to a technical issue. You can pay upon car pickup.",
      )
    }
  }, [status])

  return (
    <div className="min-h-screen mt-32 flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full border border-gray-100"
      >
        <div className="flex justify-between items-center mb-6">
          <button
            className="text-gray-600 hover:text-primary transition-colors duration-200 flex items-center gap-1 group"
            onClick={() => router.replace("/fleet")}
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" size={20} />
            <span>Back</span>
          </button>

          <div className="px-4 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
            {status === "success" ? "Completed" : "Pending"}
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-1">Order Reference</h2>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif">{orderId}</h1>
        </div>

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className={`rounded-xl p-6 mb-6 text-center ${
            status === "success" ? "bg-green-50 border border-green-100" : "bg-red-50 border border-red-100"
          }`}
        >
          {status === "success" ? (
            <>
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"
                  >
                    <CheckCircle2 className="text-green-600" size={40} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <span className="text-white text-xs">✓</span>
                  </motion.div>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-green-700 mb-2">Payment Successful</h2>
              <p className="text-green-600">Thank you for your payment. Your order is being confirmed.</p>
            </>
          ) : (
            <>
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="text-red-600" size={40} />
                </div>
              </div>
              <h2 className="text-xl font-semibold text-red-700 mb-2">Payment Not Completed</h2>
              <p className="text-red-600">
                We encountered a technical issue. You can complete your payment upon car pickup.
              </p>
            </>
          )}
        </motion.div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }}
            className="p-4 bg-blue-50 border border-blue-100 text-primary rounded-lg flex items-start gap-3"
          >
            <Info className="text-primary mt-0.5 flex-shrink-0" size={18} />
            <p className="text-sm text-blue-700">{message}</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors duration-200 inline-flex items-center gap-2"
          >
            Return to Homepage
          </button>
        </motion.div>
      </motion.div>


        
<HelpSection/>

    </div>
  )
}

export default PaymentVerification

