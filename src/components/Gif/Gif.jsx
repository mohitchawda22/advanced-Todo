import React, { useEffect, useState } from 'react'
import { GIFKEY } from '../../constants/Gif'
import "./gif.scss"

function Gif() {

    const [gif,setGif]=useState(null)

    useEffect(()=>{
        const description="weather"
        fetch(`https://tenor.googleapis.com/v2/search?q=${description}&key=${GIFKEY}&limit=50`)
        .then(res=>res.json())
        .then(data=>{
            if(data.results && data.results.length>0){
                const random=Math.floor(Math.random()*data.results.length)
                const url=data.results[random].media_formats.gif.url
                setGif(url)}        
            })
        .catch(err=>err)
    },[])

    // console.log("mmmmm",gif);

    if (!gif) return <p>loading......</p>
  return (
    <div className='gif-container'>
      <img src={gif} alt="" />
    </div>
  )
}

export default Gif
