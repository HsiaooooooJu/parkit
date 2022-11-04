import { useState, useEffect, useCallback } from 'react'
import Loading from '../components/Loading'

export default function QuickNav() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [parkRemain, setParkRemain] = useState([])

  const fetchParkRemain = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(
        'https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_allavailable.json'
      )

      if (!response.ok) {
        throw new Error('發生錯誤')
      }
      const { data } = await response.json()
      const changeRemain = data.park.slice(0, 10)

      setParkRemain(changeRemain)
    } catch (error) {
      setError(error.message)
      console.log(error)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchParkRemain()
  }, [fetchParkRemain])

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <p className='quick-container_content'>{error}</p>
  }

  return (
    <div className='quick-container'>
      <div className='quick-container_title'>快速導引</div>
      <button onClick={fetchParkRemain}>fetch data</button>
      {parkRemain.map((item) => (
        <p key={item.id}>{item.id}</p>
      ))}
    </div>
  )
}
