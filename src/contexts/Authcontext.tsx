import axios from "axios";
import React, { createContext, useContext, useState } from "react";

interface User {
    id: string; // 사용자 데이터에 맞게 속성 수정
    // TODO: 필요한 다른 속성 추가
}

interface UserContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}


export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: any) {

    const [user, setUser] = useState<User | null>(null);

    const login = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASEURL}/user/login`,
                { user },
                { withCredentials: true }
            );
            return;
        } catch (err) {
            console.log(err);
            return;
        }
    };

    const logout = () => setUser(null);

    return (
        <UserContext.Provider
            value={{ user, login, logout }}
        >
            {children}
        </UserContext.Provider>
    );
};