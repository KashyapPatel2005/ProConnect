import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import React, { useEffect, useState } from 'react'
import styles from "./index.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { getAboutUser } from '@/config/redux/action/authAction'
import { BASE_URL, clientServer } from '@/config'
import { getAllPosts } from '@/config/redux/action/postAction'
import { useRouter } from 'next/router'

export default function ProfilePage() {

    const dispatch = useDispatch();
    const router = useRouter();

    const authState = useSelector((state)=> state.auth);
    const postReducer = useSelector((state)=> state.posts)

    const [userProfile,setUserProfile] = useState({})
    const [userPosts,setUserPosts] = useState([])

    const [isModalOpen,setIsModalOpen] = useState(false);
    const [inputData,setInputData] = useState({company: '',position: '',years: ''})
 
    const handleWorkInputChange = (e)=>{
        const {name,value} = e.target;

        setInputData({...inputData,[name]:value}); 
    }



    useEffect(()=>{
        dispatch(getAboutUser({token:localStorage.getItem("token")}))
        dispatch(getAllPosts())
    },[])

    useEffect(()=>{
        if(authState.user != undefined){
            setUserProfile(authState.user)
            let post = postReducer.posts.filter((post)=>{
                return post.userId.username === authState.user.userId.username
              })
            setUserPosts(post)
        }
        
    },[authState.user,postReducer.posts])


    const updateProfilePicture = async (file)=>{
        const formData = new FormData();

        formData.append("profile_picture",file);
        formData.append("token",localStorage.getItem("token"));

        const response = await clientServer.post("/update_profile_picture",formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        });

        dispatch(getAboutUser({token: localStorage.getItem("token")}))
    }


    const updateProfileData = async()=>{
        const request = await clientServer.post("/user_update",{
            token: localStorage.getItem('token'),
            name: userProfile.userId.name
        })
        const response = await clientServer.post("/update_profile_data",{
            token: localStorage.getItem("token"),
            bio: userProfile.bio,
            currentPost: userProfile.currentPost,
            pastWork: userProfile.pastWork,
            education: userProfile.education
        });

        dispatch(getAboutUser({token: localStorage.getItem("token")}))
    }



  return (
    <UserLayout>
        <DashboardLayout>
            {authState.user &&  userProfile.userId &&
                <div className={styles.container}>
                    <div className={styles.backDropContainer}>
                        <label htmlFor='profilePictureUpload' className={styles.backDrop__overlay}>
                            <svg style={{width:"2rem",fontSize:"2rem"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>
                            <input onChange={(e)=>{
                                updateProfilePicture(e.target.files[0])
                            }} type="file" id="profilePictureUpload" hidden />
                        </label>
                        <img className={styles.backDrop}  src={`${BASE_URL}/${userProfile.userId.profilePicture}`} alt="" />
                    </div>

                    <div className={styles.profileContainer_details} >
                    <div style={{display:"flex",gap:"0.7rem"}} >

                        <div style={{flex:"0.8"}}>

                        <div style={{display:"flex",width:"fit-content",alignItems:"flex-start",flexDirection:"column",marginLeft:"0.8rem"}} >
                            

                            <input className={styles.nameEdit} type="text" value={userProfile.userId.name} onChange={(e)=>{
                                setUserProfile({...userProfile,userId:{...userProfile.userId, name: e.target.value}})
                            }} />
                            <p style={{color:"gray"}}>@{userProfile.userId.username}</p>
                        </div>

                        <div>
                            <textarea 
                                value={userProfile.bio}
                                onChange={(e)=>{
                                    setUserProfile({...userProfile, bio: e.target.value});
                                }}
                                rows={Math.max(3, Math.ceil(userProfile.bio.length /80))}
                                style={{width:"100%"}}
                            />
                        </div>

                        </div>

                        <div style={{flex:"0.2"}}>

                        </div>

                    </div>

                    </div>

                    <div className={styles.workHistory}>

                        <div className={styles.workHistoryContainer}>
                        {
                            userProfile.pastWork.map((work,index)=>{
                            return (
                                <div key={index} className={styles.workHistoryCard}>  
                                    <p style={{fontWeight:"bold",display:"flex",alignItems:"center",gap:'0.8rem'}}>{work.company} - {work.position}</p>
                                    <p style={{fontWeight:"bold"}}>Years:{work.years}</p>
                                </div>
                            )
                            })
                        }

                        <button className={styles.addWorkButton} onClick={()=>{
                            setIsModalOpen(true)
                        }}>Add Work</button>

                        </div>
                    </div>

                    {userProfile != authState.user && 
                    <div onClick={()=>{
                        updateProfileData();

                    }} className={styles.connectionButton}>
                        Update Profile
                    </div> }
                </div>
            }




            {
              isModalOpen  &&
              
              <div
                onClick={()=>{
                  setIsModalOpen(false)
                }}
                className={styles.commentsContainer}>
                
                <div onClick={(e)=>{
                  e.stopPropagation()
                }} className={styles.allCommentsContainer}>

                <input onChange={handleWorkInputChange} name='company' className={styles.inputField} type="text" placeholder='Enter Company' />
                <input onChange={handleWorkInputChange} name='position' className={styles.inputField} type="text" placeholder='Enter Position' />
                <input onChange={handleWorkInputChange} name='years' className={styles.inputField} type="number" placeholder='Years' />

                <div onClick={()=>{
                    setUserProfile({...userProfile, pastWork:[...userProfile.pastWork,inputData]})
                    setIsModalOpen(false)
                }} className={styles.connectionButton}>Update</div>
                </div> 
               </div> 
            }
        </DashboardLayout>
    </UserLayout>
  )
}
