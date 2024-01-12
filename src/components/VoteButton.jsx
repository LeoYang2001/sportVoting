import React, { useEffect, useState } from 'react'

function VoteButton({teamImg, progress, ifWin}) {
    const [progressWidth, setProgressWidth] = useState(0); // Initial progress width

    
    useEffect(() => {
      setProgressWidth(progress)
    }, [])
    
  return (
    <div 
    
    style={{minWidth:100, width:'40%'}} className='relative shadow-md text-center bg-gray-500 rounded-md px-4 py-2 cursor-pointer'>
        <span className=' font-semibold text-white flex items-center  justify-center'>
            {progressWidth}%
            <img src={teamImg} className="h-10" />
        </span>
        <div style={{width:`${progressWidth}%`, height:'100%', opacity:.4,backgroundColor: ifWin ? "green" : 'red' }} 
        className='progressBar rounded-md left-0 top-0 absolute  transition-width duration-1000'></div>
    </div>
  )
}

export default VoteButton