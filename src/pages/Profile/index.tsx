import React from "react";
import { useParams } from "react-router-dom";
import { userState } from "recoil/users/state";

const Profile = () => {
  const params = useParams<{ profileId: string }>();

  return <div>Profile user `${params}`</div>;
};

export default Profile;
