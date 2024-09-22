import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onClickLogin = async () => {

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
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/user/login`,
                { id, password },
                { withCredentials: true }
            );
            console.log('response', response);

            // 성공하면 해당 유저의 아이디 환영 메시지를 띄운다.
            navigate('/mypage');

        } catch (err) {
            console.log(err);
            return;
        }
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