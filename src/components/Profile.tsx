import React, { useEffect, useState } from "react";
import { getProfile } from "../api/user.api";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    getProfile()
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1>{profile.name}</h1>
      <p>{profile.email}</p>
    </div>
  );
}
