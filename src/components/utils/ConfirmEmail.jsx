'use client'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

const ConfirmEmail = () => {
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const token = searchParams.get('token')
    setIsLoading(true)
    fetch('/api/v1/auth/confirm-mail', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(async res => {
        const data = await res.json()
        if (res.ok) {
          return data
        } else {
          const error = new Error(data.message || 'Something went wrong!')
          throw error
        }
      })
      .then(data => {
        router.push('/auth/login')
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        console.log('finally')
        setIsLoading(true)
      })
  }, [])
  return (
    <>
      <span>hola</span>
    </>
  )
}

export default ConfirmEmail