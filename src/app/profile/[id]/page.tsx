import React from 'react'

function userprofile({params}: any) {
  return (
    <div className="flex flex-col items-center justify-center
    min-h-screen py-2
   ">
      <h1>Profile1</h1>
      <hr/>

      <p className='text-4xl'>Profile page{params.id}</p>
  <span className='p-2 rounded text-black bg-orange-400'>{params.id}</span>
       
    </div>
  )
}

export default userprofile
