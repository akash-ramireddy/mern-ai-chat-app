import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyChats, dummyUserData } from "../assets/assets";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    const fetchUser = async () => {
        setUser(dummyUserData);
    }

    const fetchUserChats = async () => {
        setChats(dummyChats);
        setSelectedChat(dummyChats[0]);
    }

    useEffect(() => {
        fetchUser();
        fetchUserChats();
    },[])

    useEffect(()=>{
        if(user){
            fetchUserChats();
        }
        else{
            setChats([]);
            setSelectedChat(null);
        }
    },[user])

    useEffect(()=>{
        if(theme === "dark"){
            document.documentElement.classList.add("dark");
        }
        else{
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme",theme);
    },[theme])

    const value = {
        navigate, user, setUser, chats, setChats, selectedChat, setSelectedChat, theme, setTheme, fetchUser
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=> useContext(AppContext);