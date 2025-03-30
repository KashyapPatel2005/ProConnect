import React, { useEffect, useState } from 'react'

import styles from "./styles.module.css"
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '@/config/redux/reducer/authReducer';
import { BASE_URL } from '@/config';

function NavbarComponent() {

    const router = useRouter();
    const authState = useSelector((state) => state.auth);
    const dispatch = useDispatch();



  return (
    <div className={styles.container}>
        <nav className={styles.navBar}>
            <h1 style={{cursor:"pointer"}}>PRO CONNECT</h1>
            
            <div className={styles.navBarOptionContainer}>


            {/* {authState.profileFetched && <div>
              <div style={{display:"flex",gap:"1.2rem"}}>
                <p> Hey, {authState.user.userId.name}</p>
                <p style={{fontWeight:"bold",cursor:"pointer"}}>Pofile</p>
                <p  onClick={()=>{
                  localStorage.removeItem("token");
                  router.push("/");
                  dispatch(reset())
                }} style={{fontWeight:"bold",cursor:"pointer"}}>Logout</p>
              </div>
            </div>} */}

            {authState.profileFetched && <div>
              <div className={styles.navbarRight} >
                <p className={styles.welcome} > Hey, {authState.user.userId.name}</p>
                <p onClick={()=>{
                  router.push("/profile")
                }} className={styles.profileOption} >Pofile</p>
                <p className={styles.logoutOption}  onClick={()=>{
                  localStorage.removeItem("token");
                  router.push("/");
                  dispatch(reset())
                }} >Logout</p>
              </div>

             
            </div>
            } 


            {/* {!authState.profileFetched &&  <div onClick={()=>{
              router.push("/login");
            }} className={styles.buttonJoin}>
              <p>Be A Part</p>
            </div>} */}
           

            </div>

        </nav>
    </div>
  )
}

export default NavbarComponent