'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './Button'

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
                  <Button
                  onClick={()=> router.push('/game')}
                  >
                    PLAY ONLINE</Button>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Landing