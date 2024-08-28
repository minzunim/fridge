import { useState } from "react";

const Login = () => {

    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onClickLogin = () => {

        if (id === '') {
            alert('아이디를 입력해주세요!');
            setId('');
            return;
        }

        if (password === '') {
            alert('패스워드를 입력해주세요!');
            setPassword('');
            return;
        }

        // API 호출
    };


    return (
        <>
            <div>
                <h2>로그인</h2>
                <label htmlFor="id">ID </label>
                <input
                    type="text"
                    id="id"
                    onChange={(e) => setId(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">PASSWORD </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={onClickLogin}>로그인</button>
        </>
    );
};

export default Login;