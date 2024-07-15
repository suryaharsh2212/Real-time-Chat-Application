import React, { useEffect } from 'react'
import { UserandomImages } from '../Utility/Usegetimages'

function Friendcard() {
    useEffect(()=>{
        const reqImages=()=>{
            UserandomImages()
        }
        reqImages()
    },[])
    return (
        <div>
            <div className=" bg-violet-950 text-white  p-3 md:h-48  text-center rounded-md">

                <div className='flex flex-col justify-center items-center'>
                    <div className="avatar">
                        <div className=" ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                            {/* <img src="https://cdn-icons-png.flaticon.com/128/4202/4202843.png" />  */}
                            <img src={`${UserandomImages()}`}/>
                        </div>
                    </div>
                    <div className='text-pretty text-lg mt-1 text-black-500'> Surya Prakash </div>
                    <div className='flex w-full justify-center items-center'>
                        <button className='border border-sky-500 rounded-md px-5 py-2 w-full font-extralight flex justify-center'>Connect<span><img className='h-6 w-6  ml-2' src="https://cdn-icons-png.flaticon.com/128/11302/11302025.png" alt="" /></span></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Friendcard
