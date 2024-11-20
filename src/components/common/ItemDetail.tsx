import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface ItemDetail {
    isModal: boolean; // true: 수정, false: 상세
    product_no?: number;
}

const ItemDetail = ({ isModal, product_no }: ItemDetail) => {

    const navigate = useNavigate();

    const [title, setTitle] = useState<string>('');
    const [expireDate, setExpireDate] = useState<string>('');
    const [count, setCount] = useState<number>();
    const [position, setPosition] = useState<number>(1);
    const [memo, setMemo] = useState<string>('');

    // 아이템 등록/수정 API
    const onClickSaveItem = async () => {

        if (title === '') {
            alert('이름을 입력해주세요!');
            setTitle('');
            return;
        }

        if (expireDate === '') {
            alert('유통기한을 입력해주세요!');
            setExpireDate('');
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


        try {

            // 모달인 경우 - 수정
            if (isModal) {
                await axios.post(
                    `${process.env.REACT_APP_BASE_URL}/fridge/datail/${product_no}`,
                    {
                        title,
                        expire_date: expireDate,
                        memo,
                        count,
                        position
                    },
                    { withCredentials: true }
                );
            } else {
                await axios.post(
                    `${process.env.REACT_APP_BASE_URL}/fridge/create`,
                    {
                        title,
                        expire_date: expireDate,
                        memo,
                        count,
                        position
                    },
                    { withCredentials: true }
                );
            }
            navigate(`/compartment?position=${position}`);

        } catch (err) {
            console.log(err);
            return;
        }
    };

    // 개별 아이템 상세 조회
    const getDetailItem = async () => {
        await axios.get(
            `${process.env.REACT_APP_BASE_URL}/fridge/detail/${product_no}`,
        ).then((res) => {

            console.log(res);

            const data = res.data.data;
            console.log(data.title);

            setTitle(data.title);
            setExpireDate(data.expire_date);
            setCount(data.count);
            setPosition(data.position);
            setMemo(data.memo);

        }).catch((err) => {
            console.log(err);
        });

    };

    useEffect(() => {
        getDetailItem();

    }, [isModal]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <h1 className="font-bold text-center text-xl mb-5">음식을 추가해보세요!</h1>
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
                            value={title}
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
                            value={expireDate}
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            onChange={(e) => setExpireDate(e.target.value)}
                        />
                        <label
                            htmlFor="count"
                            className="font-semibold text-sm text-gray-600 pb-1 block">
                            수량
                        </label>
                        <input
                            type="number"
                            id="count"
                            value={count}
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            onChange={(e) => setCount(parseInt(e.target.value))}
                        />
                        <label
                            htmlFor="count"
                            className="font-semibold text-sm text-gray-600 pb-1 block">
                            보관 위치
                        </label>
                        <select
                            value={position}
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            onChange={e => setPosition(parseInt(e.target.value))}
                        >
                            <option value="2">[냉장] 중앙</option>
                            <option value="1">[냉장] 날개 (L)</option>
                            <option value="3">[냉장] 날개 (R)</option>
                            <option value="5">[냉동] 중앙</option>
                            <option value="4">[냉동] 날개 (L)</option>
                            <option value="6">[냉동] 날개 (R)</option>
                        </select>
                        <label
                            htmlFor="memo"
                            className="font-semibold text-sm text-gray-600 pb-1 block">
                            메모
                        </label>
                        <input
                            type="string"
                            id="memo"
                            value={memo}
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            onChange={(e) => setMemo(e.target.value)}
                        />
                        <div className="flex gap-2">
                            <button
                                type="button"
                                className="transition duration-200 bg-slate-400 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                                onClick={() => navigate(-1)}
                            >
                                <span className="inline-block mr-2">취소</span>
                            </button>
                            <button
                                type="button"
                                className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                                onClick={onClickSaveItem}>
                                <span className="inline-block mr-2">저장</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;