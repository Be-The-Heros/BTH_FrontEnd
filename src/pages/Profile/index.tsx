import React from 'react'
import { useParams } from 'react-router-dom'
import { userState } from 'recoil/users/state';

const Profile = () => {
  const params = useParams<{id: string}>();

  
  
  return (
    <div>Profile user {params.id} </div>
  )
}

export default Profile