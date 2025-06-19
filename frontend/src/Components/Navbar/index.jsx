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

    const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.container}>
        <nav className={styles.navBar}>
            <h1 style={{cursor:"pointer"}}>PRO CONNECT</h1>
            
            {/* <div className={styles.navBarOptionContainer}>
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
            </div> */}


            <div className={styles.navBarOptionContainer}>
              {authState.profileFetched && (
                <div>
                  {/* Hamburger Menu Icon */}
                  <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                  </div>

                  {/* Right Nav Menu (Visible on Large Screens or When Menu is Open) */}
                  <div
                    className={`${styles.navbarRight} ${menuOpen ? styles.showMenu : ""}`}
                  >
                    <p className={styles.welcome}>Hey, {authState.user.userId.name}</p>

                    <p
                      className={styles.profileOption}
                      onClick={() => router.push("/profile")}
                    >
                      Profile
                    </p>

                    <p
                      className={styles.logoutOption}
                      onClick={() => {
                        localStorage.removeItem("token");
                        router.push("/");
                        dispatch(reset());
                      }}
                    >
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>

        </nav>
    </div>
  )
}

export default NavbarComponent