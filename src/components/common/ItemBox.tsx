import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import ItemDetail from "./ItemDetail";


interface Iprops {
    product_no: number;
    title: string;
    expire_date: string;
}

export const ItemBox = ({ product_no, title, expire_date }: Iprops) => {

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const modalBackground = useRef<HTMLDivElement>(null);

    // 날짜 비교
    const today = moment();
    const _expire_date = moment(expire_date);
    const diff = today.diff(_expire_date, "days");

    // 오늘 + 4일인 경우 -> 파란색 (신선)
    // 오늘 포함 + 3일인 경우 -> 빨간색 (경고)
    // 오늘 이전인 경우 -> 검은색 (썩음)
    const checkExpire = () => {
        if (diff > 0) {
            return 'bg-slate-600';
        } else if (diff >= -3 && diff <= 0) {
            return 'bg-red-500';
        } else {
            return 'bg-sky-400';
        }
    };

    // 상품 삭제 API
    const onClickDeleteHandler = async (product_no: number) => {
        await axios.put(
            `${process.env.REACT_APP_BASE_URL}/fridge/delete/${product_no}`,
        ).then((res) => {
            if (window.confirm("아이템을 삭제하시겠습니까?")) {
                alert(res.data.msg);
                window.location.reload();
            }
            return;

        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <>
            <div className={`rounded-md
                        ${checkExpire()}
                        text-stone-50
                        p-3 m-3
                        relative
                        `}
                onClick={() => setModalOpen(true)}>
                {title}

                <div className="border rounded-full
                            border-none
                            bg-slate-400
                            w-5 h-5          
                            flex items-center justify-center
                            absolute top-0 right-0 -translate-y-1/2 translate-x-1/2
                            text-white font-bold"
                    onClick={e => {
                        e.stopPropagation();
                        onClickDeleteHandler(product_no);
                    }}>
                    &times;</div>
            </div>
            {
                modalOpen && (
                    <>
                        <div className="w-full h-full
                                bg-slate-500
                                opacity-70
                                fixed top-0 left-0
                                z-40"
                            ref={modalBackground}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (e.target === modalBackground.current) {
                                    setModalOpen(false);
                                }
                            }}>
                        </div>
                        <div className="w-4/5 h-3/4
                                    border rounded-md
                                    bg-white
                                    text-black
                                    fixed left-1/2 -translate-x-1/2
                                    z-50
                                    max-h-[calc(100vh-200px)]
                                    overflow-auto"
                        >
                            <ItemDetail
                                isModal={true}
                                setModalOpen={setModalOpen}
                                product_no={product_no}
                            />
                        </div>
                    </>
                )
            }
        </>
    );
};

export default ItemBox;