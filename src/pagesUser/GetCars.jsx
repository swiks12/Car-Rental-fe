import React from 'react'
import { useParams } from 'react-router-dom'

const GetCars = () => {
    const params=useParams();
    const id=params.id;
    console.log(id,"from get cars")
  return (
    <div>GetCars hi</div>
  )
}

export default GetCars