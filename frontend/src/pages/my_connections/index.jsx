import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import React, { useEffect } from 'react'

import styles from './index.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { AcceptConnection, getMyConnectionRequests } from '@/config/redux/action/authAction'
import { BASE_URL } from '@/config'
import { useRouter } from 'next/router'

export default function MyConnectionsPage() {

  const dispatch = useDispatch();
  const authState = useSelector((state)=> state.auth);

  const router = useRouter();

  useEffect(()=>{
    dispatch(getMyConnectionRequests({token: localStorage.getItem('token')}))
  },[])

  useEffect(()=>{
    if(authState.connectionRequest && authState.connectionRequest.length != 0){
      console.log(authState.connectionRequest);
    }

  },[authState.connectionRequest])

  return (
    <UserLayout>
    <DashboardLayout>
      <div style={{marginTop:"10%",marginLeft:"1rem",padding:"1.2rem"}}>
      <h4 style={{textAlign:"center",marginBottom:"1.5rem"}}>Pending Request</h4>
        {authState.connectionRequest && authState.connectionRequest.length === 0  &&  <h1>No Connection Request</h1> }

        {authState.connectionRequest && authState.connectionRequest.length !=0  && authState.connectionRequest.filter((connection)=> connection.status_accepted === null).map((user,index)=>{
          return (
            <div onClick={()=>{
              router.push(`/view_profile/${user.userId.username}`)
            }} className={styles.userCard} key={index} >
              <div style={{display:"flex",alignItems:"center",gap:"1.2rem",justifyContent:"space-between"}} >
                <div className={styles.profilePicture} >
                  <img src={`${BASE_URL}/${user.userId.profilePicture}`} alt="" />
                </div>
                <div className={styles.userInfo}>
                  <h3>{user.userId.name}</h3>
                  <p>{user.userId.username}</p>
                </div>
                <button onClick={(e)=>{
                  e.stopPropagation()
                  dispatch(AcceptConnection({
                    connectionId: user._id,
                    token:localStorage.getItem("token"),
                    action:'accept'
                  }))
                  }} className={styles.connectedButton}>
                  Accept
                </button>
              </div>
            </div>
          )
        }) 
        }

        <h4 style={{textAlign:"center",marginTop:"1.5rem"}}>My Network</h4>

        {authState.connectionRequest && authState.connectionRequest.filter((connection)=> connection.status_accepted !== null ).map((user,index)=>{
             return (
              <div onClick={()=>{
                router.push(`/view_profile/${user.userId.username}`)
              }} className={styles.userCard} key={index} >
                <div style={{display:"flex",alignItems:"center",gap:"1.2rem",justifyContent:"space-between"}} >
                  <div className={styles.profilePicture} >
                    <img src={`${BASE_URL}/${user.userId.profilePicture}`} alt="" />
                  </div>
                  <div className={styles.userInfo}>
                    <h3>{user.userId.name}</h3>
                    <p>{user.userId.username}</p>
                  </div>
                </div>
              </div>
             )
        })} 
      </div>
    </DashboardLayout>

  </UserLayout>
  )
}
