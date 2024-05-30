import React, { createContext, useState, useEffect } from 'react';

// Create context
const UserContext = createContext();

// Create provider component
function UserProvider({ children }) {
  
  const [userDetailsContext, setUserDetailsContext] = useState(() => {
    // Retrieve data from localStorage if it exists
    const savedData = localStorage.getItem("userDetails");
    return savedData ? JSON.parse(savedData) : null;
  });
  // Function to fetch user data from the API
  // const fetchUser = async () => {
  //   // Replace with your API call
  //   const response = await fetch('/api/protected');
  //   const userData = await response.json();
  //   setUserDetailsContext(userData);
  // };

  // // Fetch user data on mount
  // useEffect(() => {
  //   fetchUser();
  // }, []);

  
  useEffect(() => {
    // Save data to localStorage whenever it changes
    if (userDetailsContext) {
      localStorage.setItem("userDetails", JSON.stringify(userDetailsContext));
    }
  }, [userDetailsContext]);

  return (
    <UserContext.Provider value={{ userDetailsContext, setUserDetailsContext }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
