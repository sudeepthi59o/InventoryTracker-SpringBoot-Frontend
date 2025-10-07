import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({isAuthenticated: false, role: ''})

    useEffect( ()=> {
        const token = localStorage.getItem('authToken')
        if(token)
        {
            setAuth({ isAuthenticated: true, role: 'user' });
        }
    }, []);


    const login = (token, role) => {

    localStorage.setItem('authToken',token);

    setAuth({isAuthenticated: true, role: role})
    }


    const logout = () => {

        localStorage.removeItem('authToken');

        setAuth({isAuthenticated: false, role: ''})
    }

    return (
       <AuthContext.Provider value={{auth, login, logout}}>
        {children}
       </AuthContext.Provider>
    );
}



