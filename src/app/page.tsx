import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='m-40'>

    <Link href="/users" className='ml-20  '>
      <h2>TO User Page </h2>
      <p>users</p>
    </Link>
    </div>
  )
}

export default page