'use client'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import getStripe from '@/lib/stripe/get-stripe'


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
        const res = await fetch(`/api/checkout-sessions?session_id=${sessionId}`)
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

  if (loading) {return (<p>loading...</p>)}
  if (error) {return (<p>{error}</p>)}
  return (
    <div>
      {session && session.payment_status === 'paid' ? (
        <div>
          <h1>Payment successful</h1>
          <p>Thank you for your purchase</p>
          <p>Session ID: {sessionId} </p>
          <p>we have received your payment. You will receive an email with the order details shortly.</p>
        </div>
      ) : (
        <div>
          <h1>Payment Failed</h1>
          <p>Your payment was not successful. Please try again. </p>
        </div>
      )}
    </div>
  );
}
export default ResultPage
      



