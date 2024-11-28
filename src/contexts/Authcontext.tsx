import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../config/supabase";

interface User {
    email: string;
    email_verified: boolean;
    phone_verified: boolean;
    sub: string;
}

interface UserContextType {
    userData: User;
    logout: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: any) => {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const navigate = useNavigate();

    let userData: User = {
        email: "",
        email_verified: false,
        phone_verified: false,
        sub: "",
    };

    // 로컬 스토리지 확인
    const authData = localStorage.getItem(process.env.REACT_APP_SUPABASE_TOKEN!);
    console.log("🚀 ~ UserProvider ~ authData:", authData);

    const getUserData = async () => {
        const userData = await supabase.auth.getSession();
        return userData;
    };

    useEffect(() => {
        if (!authData) {
            //setIsLogin(false);
            navigate("/login");
        } else {
            //setIsLogin(true);
            userData = JSON.parse(authData).user_metadata;
        }

        const data = getUserData();
        console.log('getUserSession', data);

    }, []);

    // 로그아웃
    const logout = () => {
        localStorage.removeItem(process.env.REACT_APP_SUPABASE_TOKEN!);
        alert("로그아웃 완료");
        navigate("/login");
        return;
    };

    return (
        <UserContext.Provider value={{ userData, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
