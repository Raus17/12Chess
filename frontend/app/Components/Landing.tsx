'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const Landing = () => {
  const router = useRouter();
  return (
    <div className='flex justify-center'>
        <div className='pt-8 max-w-screen-lg'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='flex justify-center'>
              <img src={'/chess.webp'} className='max-w-96'/>
            </div>
            <div className='p-16'>
              <div className='flex justify-center'>
                <h1 className='text-4xl font-bold text-white'>Play Chess online on the site</h1>
              </div>
                <div className='mt-8 flex justify-center'>
                  <button
                  onClick={()=> router.push('/game')}
                  className=' px-8 py-4 bg-green-500 hover:bg-green-700 text-white font-bold  rounded justify-between'
                  >
                    PLAY ONLINE</button>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Landing