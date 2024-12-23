import React, { createContext, useState } from 'react'
export const updateProfileContext=createContext()
const ContextShare = ({children}) => {
    const[updateProfileResponse,setUpdateProfileResponse]=useState("")


  return (
    <updateProfileContext.Provider value={{updateProfileResponse,setUpdateProfileResponse}}>
     {children}
    </updateProfileContext.Provider>
  )
}

export default ContextShare