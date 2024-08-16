'use client'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import getStripe from '@/lib/stripe/get-stripe'
import {Progress} from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge';


const ResultPage = () => {
  const router = useRouter()
  const  searchParams = useSearchParams()
  const sessionId= searchParams.get('session_id')

  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!sessionId) return

      try {
        const res = await fetch(`/api/checkout_session?session_id=${sessionId}`)
        const sessionData = await res.json()
        if (res.ok) {
          setSession(sessionData)
        }else {
          setError(sessionData.error)
        }
      } catch (err) {
        setError('An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchCheckoutSession()
  }, [sessionId])

  if (loading) {
    return (
      <Progress value={10} />
    );
  }
  if (error) {return (<p>{error}</p>)}


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  {session && session.payment_status === 'paid' ? (
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful! 🎉</h1>
      <p className="text-gray-700 mb-2">Thank you for your purchase! You're all set to start enhancing your study sessions.</p>
      <p className="text-gray-600 text-sm mb-4">Session ID: {sessionId}</p>
      <p className="text-gray-700 mb-6">We have received your payment. You will receive an email with the order details shortly.</p>
      <div className="flex space-x-4">
        <button 
          onClick={() => navigateTo('/create-deck')} 
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Create a Beautiful Deck
        </button>
        <button 
          onClick={() => navigateTo('/home')} 
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg"
        >
          Return to Home
        </button>
      </div>
    </div>
  ) : (
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Failed 😞</h1>
      <p className="text-gray-700 mb-6">Oops! Something went wrong with your payment. Please try again or contact support if the issue persists.</p>
      <div className="flex space-x-4">
        <button 
          onClick={() => router.push('../api/checkout_session')} 
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Try Again
        </button>
        <button 
         onClick={() => router.push('/')} 
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg"
        >
          Return to Home
        </button>
      </div>
    </div>
  )}
</div>

  
);
   
}
export default ResultPage
      



