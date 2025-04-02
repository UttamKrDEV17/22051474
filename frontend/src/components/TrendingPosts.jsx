import React,{useEffect,useState} from 'react'
import {topTrendingPosts} from '../assets/data.js'
function TrendingPosts() {
    const [data,setData] = useState([])
    useEffect(() => {
        const fetchData =async () =>
            {
                const file =  await Promise.resolve([topTrendingPosts()])
                setData(file)
            }
            fetchData()
    }, [])
     
    
  return (
    <div className="post-container">
    {data.map((item, index) => (
      <div key={index} className="card">
        <h3 className="card-title">{item.user}</h3>
        <p className="card-description">Posts: {item.postCount}</p>
      </div>
    ))}
  </div>
  )
}

export default TrendingPosts