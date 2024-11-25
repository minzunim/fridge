import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
    email: string;
    email_verified: boolean;
    phone_verified: boolean;
    sub: string;
}

interface UserContextType {
    userData: User;
}


export const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: any) => {

    const [isLogin, setIsLogin] = useState<boolean>(false);
    const navigate = useNavigate();

    let userData: User = {
        email: '',
        email_verified: false,
        phone_verified: false,
        sub: ''
    };

    // 로컬 스토리지 확인
    const authData = localStorage.getItem(process.env.REACT_APP_SUPABASE_TOKEN!);
    if (!authData) {
        //setIsLogin(false);
        navigate('/login');
    } else {
        //setIsLogin(true);
        userData = JSON.parse(authData).user_metadata;
    }

    return (
        <UserContext.Provider
            value={{ userData }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;