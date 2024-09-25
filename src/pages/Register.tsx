import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState<string>('');
    const [expire, setExpire] = useState<string>('');
    const [count, setCount] = useState<number>(0);
    const [position, setPosition] = useState<number>(0);

    const onClickLogin = async () => {

        if (title === '') {
            alert('이름을 입력해주세요!');
            setTitle('');
            return;
        }

        if (expire === '') {
            alert('유통기한을 입력해주세요!');
            setExpire('');
            return;
        }

        if (!count) {
            alert('수량을 입력해주세요!');
            setCount(0);
            return;
        }

        if (!position) {
            alert('보관 위치를 번호로 입력해주세요!');
            setCount(0);
            return;
        }

        if (position >= 5) {
            alert('보관 위치를 번호로 입력해주세요!');
            setCount(0);
            return;
        }


        // API 호출
        try {
            /*const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/user/login`,
                { id, password },
                { withCredentials: true }
            );
            console.log('response', response);
*/
            // 성공하면 해당 유저의 아이디 환영 메시지를 띄운다.
            navigate('/mypage');

        } catch (err) {
            console.log(err);
            return;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <h1 className="font-bold text-center text-2xl mb-5">Register</h1>
                <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                    <div className="px-5 py-7">
                        <label
                            htmlFor="title"
                            className="font-semibold text-sm text-gray-600 pb-1 block">
                            이름
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label
                            htmlFor="expire"
                            className="font-semibold text-sm text-gray-600 pb-1 block">
                            유통기한
                        </label>
                        <input
                            type="date"
                            id="expire"
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            onChange={(e) => setExpire(e.target.value)}
                        />
                        <label
                            htmlFor="count"
                            className="font-semibold text-sm text-gray-600 pb-1 block">
                            수량
                        </label>
                        <input
                            type="number"
                            id="count"
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            onChange={(e) => setCount(parseInt(e.target.value))}
                        />
                        <label
                            htmlFor="count"
                            className="font-semibold text-sm text-gray-600 pb-1 block">
                            보관 위치
                        </label>
                        <input
                            type="number"
                            id="count"
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            onChange={(e) => setCount(parseInt(e.target.value))}
                            max="4"
                        />
                        <button
                            type="button"
                            className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            onClick={onClickLogin}>
                            <span className="inline-block mr-2">Register</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;