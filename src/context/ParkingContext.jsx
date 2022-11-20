import React, { useState, createContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchAllPark, fetchAllRemain } from '../apis/ParkingAPI'
import { converter } from '../utils/Converter'

export const ParkingContext = createContext()

export function ParkingProvider(props) {
  const [allPark, setAllPark] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)

    const timer = window.setTimeout(() => {
      Promise.all([fetchAllPark(), fetchAllRemain()])
        .then(([dataPark, dataRemain]) => {
          const parks = dataPark.park.map((item) => {
            const latlng = converter(item.tw97x, item.tw97y)
            const spaces = dataRemain.park.find((i) => i.id === item.id)
            return {
              id: item.id,
              area: item.area,
              name: item.name,
              address: item.address.length ? item.address : '無資料',
              tel: item.tel ? item.tel : '無資料',
              payex: item.payex ? item.payex : '無資料',
              latlng,
              serviceTime: item.serviceTime ? item.serviceTime : '無資料',
              totalCar: item.totalcar,
              availableCar: spaces ? spaces.availablecar : '無資料'
            }
          })
          setAllPark(parks)
        })
        .catch(() => {
          alert('網路連線不穩定，請稍後再試')
          return navigate('/')
        })
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <ParkingContext.Provider
      value={{ allPark, isLoading }}
    >
      {props.children}
    </ParkingContext.Provider>
  )
}
