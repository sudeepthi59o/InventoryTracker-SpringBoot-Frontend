import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({isAuthenticated: false, role: ''})

    useEffect( ()=> {
        const authData = localStorage.getItem('authData');
  
        if (authData) {
            const parsedAuth = JSON.parse(authData);

            if (parsedAuth.token) {
            setAuth({
                isAuthenticated: true,
                role: parsedAuth.role || 'USER',  // Default to 'user' if role is not provided
            });
    }}}, []);


    const login = (token, role) => {

    localStorage.setItem('authData', JSON.stringify({ token: token, role: role }));

    setAuth({isAuthenticated: true, role: role})
    }


    const logout = () => {

        localStorage.removeItem('authData');

        setAuth({isAuthenticated: false, role: ''})
    }

    return (
       <AuthContext.Provider value={{auth, login, logout}}>
        {children}
       </AuthContext.Provider>
    );
}



