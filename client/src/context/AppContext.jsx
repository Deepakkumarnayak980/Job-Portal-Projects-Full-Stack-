import { createContext, useState } from "react";

export const AppContext=createContext()

export const AppContextProvider =(props) =>{

    const [SearchFilter,setSearchFilter]=useState({
        title:'',
        location:''
    })

    const [isSearched,setIsSearched]=useState(false)

    const value={
      setSearchFilter,SearchFilter,
      isSearched,setIsSearched
    }


    return(
        <AppContext.Provider value={value} >
            {props.children}
        </AppContext.Provider>
    )
}