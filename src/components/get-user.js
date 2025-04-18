import React, { useState } from "react";

export default function Getuser() {
  const [username, setusername] = useState("");
  const [userData, setUserData] = useState(null);

  const setuserfunc = () => {
    if (username.trim() === "") {
      alert("Kindly enter the username");
      return;
    }

    console.log(username);
    getResults(username); // call with the current username
  };

  let getResults = async (getuser) => {
    try {
      let url = `https://api.github.com/users/${getuser}`;
      let getData = await fetch(url);

      if (getData.status === 404) {
        setUserData({status : 404});
        return;
      } 

       
        let data = await getData.json();
        console.log(data);
        setUserData(data);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="main-wrapper w-50">
        <div className="form">
          <label className="w-100 d-flex gap-2">
            <input
              value={username}
              className="p-2 w-75"
              placeholder="Enter username"
              onChange={(e) => setusername(e.target.value)}
              type="text"
            />
            <span className="w-25" onClick={setuserfunc}>
              <p className="text-center">get the user</p>
            </span>
          </label>
        </div>
        <div className="getresults mt-3 p-3 rounded shadow-sm bg-gray">
            {userData && userData.status === 404 &&(
                   <p className="text-center">no record found</p> 
            )}
          {userData && userData.status !== 404 &&(
            <div className="getresults d-flex gap-4">
              <div>
                <img
                  className="rounded-circle"
                  src={userData.avatar_url}
                  alt="avatar"
                  width={100}
                />
              </div>
              <div>
                <div>
                  <p>
                    <strong>Username:</strong> {userData.login}
                  </p>
                  <a href={userData.html_url} target="_blank" >Go to Profile</a>
                </div>
                <div className="user-data d-flex gap-4 mt-2">
                  <p>
                    <h3>{userData.public_repos}</h3>
                    <strong>Public Repos:</strong>
                  </p>
                  <p>
                    <h3>{userData.followers}</h3>
                    <strong>Followers:</strong>
                  </p>
                  <p>
                    <h3>{userData.following}</h3>
                    <strong>Following:</strong>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
