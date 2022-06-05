import React, { useState } from "react";

export default function Dashboard() {
  const [profileData, setProfileData] = useState({});

  return (
    <div>
      Dashboard
      {profileData ? <h2>btc 3000</h2> : <h2>addData</h2>}
    </div>
  );
}
