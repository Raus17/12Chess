import React from 'react'

export const Button = ({onClick , children} : {onClick :() => void ,  children : React.ReactNode}) => {
  return (
    <button onClick={onClick} className='px-8 py-4 text-2xl bg-green-500 hover:bg-green-600 text-white rounded  duration-300 ease-in-out'>
      {children}
    </button>

  )
}
