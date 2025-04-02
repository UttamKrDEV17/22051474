import React,{useEffect,useState} from 'react'
import {topUsers} from '../assets/data.js'
function TopUsers() {
    const [data,setData] = useState([])
        useEffect(() => {
            const fetchData =async () =>
                {
                    const file =  await Promise.resolve([topUsers()])
                    setData(file)
                }
                fetchData()
        }, [])
  return (
    <div className="user-container">
    {data.map((item, index) => (
      <div key={index} className="card">
        <h3 className="card-title">{item.user}</h3>
        <p className="card-description">Posts: {item.postCount}</p>
      </div>
    ))}
  </div>
  )
}

export default TopUsers