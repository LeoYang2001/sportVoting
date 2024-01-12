import React, { useEffect, useState } from 'react'
import VoteButton from './VoteButton'

function Event() {


    const apiEndPoint = "https://0pb03n9zj7.execute-api.us-east-2.amazonaws.com/dev"
    const [gameInfo, setGameInfo] = useState(null)
    const [TeamAVote, setTeamAVote] = useState(null)
    const [TeamBVote, setTeamBVote] = useState(null)

    useEffect(() => {
         const fetchGame = async () => {
            try {
                const res = await fetch(apiEndPoint);

                // Ensure the response is OK before trying to parse JSON
                if (!res.ok) {
                    throw new Error(`Failed to fetch data. Status: ${res.status}`);
                }

                const data = await res.json();
          

                // If you need to work with gameInfo specifically
                const gameInfo = JSON.parse(data.body).gameInfo;
                setGameInfo(gameInfo)
                console.log(gameInfo)
            } catch (error) {
                console.error('Error fetching game data:', error);
            }
        };

        setTimeout(()=>{
            fetchGame()
        },1000)
    }, [])
    

    // ifTeamAWin = [true or false or null]
    const [ifTeamAWin, setIFTeamAWin] = useState(null)

    const voteTeam = async (winTeam)=>{
        try {
            const response = await fetch('https://arrhfxvxo9.execute-api.us-east-2.amazonaws.com/dev', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ GameID: '20240110NBA', winTeam: winTeam }),
            });
      
            if (response.ok) {
              const data = await response.json();
              console.log(JSON.parse(data.body).TeamAVote.N)
              setTeamAVote(parseInt(JSON.parse(data.body).TeamAVote.N))
              setTeamBVote(parseInt(JSON.parse(data.body).TeamBVote.N))
              setIFTeamAWin(winTeam == "TeamA")
            } else {
              console.error('API call failed:', response.statusText);
            }
          } catch (error) {
            console.error('Error during API call:', error.message);
          }
    }
   

  return (
    <>
    <div style={{maxWidth:900, width:'100%'}} className=' shadow-md py-3 px-4 rounded-md bg-gray-100 flex'>
        {
            gameInfo ? (
                <>
                <div className=' flex-1'>
            <div className=' text-sm font-bold mb-2'>
               {gameInfo.date} {":"}
               <span className=' text-sm text-gray-500 font-semibold'> {gameInfo.time} </span>
            </div>
            <div className=' flex flex-col gap-6'>
                <div className='flex items-center gap-3'>
                    <img className=' h-8' src={gameInfo.teamInfo.teamA.img}   />
                    <div className=' flex flex-col text-sm font-semibold'>
                        <span>{gameInfo.teamInfo.teamA.name}</span>
                        <span className=' text-xs text-gray-500'>{gameInfo.teamInfo.teamA.standing}</span>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <img className=' h-8' src={gameInfo.teamInfo.teamB.img}   />
                    <div className=' flex flex-col text-sm font-semibold'>
                        <span>{gameInfo.teamInfo.teamB.name}</span>
                        <span className=' text-xs text-gray-500'>{gameInfo.teamInfo.teamB.standing}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex-1 flex justify-center items-center gap-4'>
            {
                ifTeamAWin === null && (
                    <>
                        <div onClick={()=>{
                            voteTeam("TeamA")
                        }} style={{minWidth:100, width:'40%'}} className='VoteBtn shadow-md text-center bg-gray-500 rounded-md p-4 cursor-pointer'>
                            <span className=' font-semibold text-white '>
                                BOS Celtics
                            </span>
                        </div>
                        <div onClick={()=>{
                            voteTeam("TeamB")
                        }} style={{minWidth:100, width:'40%'}}  className='VoteBtn shadow-md text-center bg-gray-500 rounded-md p-4 cursor-pointer'>
                            <span className=' font-semibold text-white '>
                                MIL Bucks
                            </span>
                        </div>
                    </>
                )
            }
               
            {
                ifTeamAWin !== null && (
                    <>
                         <VoteButton teamImg={gameInfo.teamInfo.teamA.img} progress={Math.ceil((TeamAVote/(TeamAVote+TeamBVote)) * 100) } ifWin={ifTeamAWin}/>
                         <VoteButton teamImg={gameInfo.teamInfo.teamB.img} progress={100 - Math.ceil((TeamAVote/(TeamAVote+TeamBVote)) * 100)  } ifWin={!ifTeamAWin}/>
                    </>
                )
            }
            </div>
                </>
            ):(
                <>
                    loading...
                </>
            )
        }
        </div>
        </>
  )
}

export default Event