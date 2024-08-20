import React from 'react'

const Button = ({value,onClick}) => {
  return (
    <div className='bg-black text-white h-fit pl-4 pr-4 pt-2 pb-2 text-center rounded-[5px]' onClick={onClick}>{value}</div>
  )
}

export default Button