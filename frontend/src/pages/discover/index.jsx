import { getAllUsers } from '@/config/redux/action/authAction';
import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import styles from "./index.module.css"
import { BASE_URL } from '@/config';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function DiscoverPage() {

  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if(!authState.all_profiles_fetched){
      dispatch(getAllUsers())
    }
  },[])

  const router = useRouter();

    const filteredUsers = authState.all_users.filter((user) =>
    user.userId.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <UserLayout>
    <DashboardLayout>
      <div style={{ marginTop: "15%" }}>
          {/* ✅ Search Input */}
          <div style={{ marginBottom: "1rem", textAlign: "center" }}>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {/* ✅ User Cards */}
          <div className={styles.allUserProfile}>
            {authState.all_profiles_fetched && filteredUsers.map((user) => (
              <div
                onClick={() => router.push(`/view_profile/${user.userId.username}`)}
                key={user._id}
                className={styles.userCard}
              >
                <img
                  className={styles.userCard_image}
                  src={`${BASE_URL}/${user.userId.profilePicture}`}
                  alt={user.userId.name}
                />
                <div style={{ marginLeft: "1rem" }}>
                  <h1>{user.userId.name}</h1>
                  <p>@{user.userId.username}</p>
                </div>
              </div>
            ))}
            {/* Show message if no users found */}
            {authState.all_profiles_fetched && filteredUsers.length === 0 && (
              <p style={{ textAlign: "center", marginTop: "2rem" }}>No users found.</p>
            )}
          </div>
        </div>
    </DashboardLayout>

  </UserLayout>
  )
}
