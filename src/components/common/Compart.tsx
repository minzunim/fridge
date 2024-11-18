import axios from "axios";
import ItemBox from "./ItemBox";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface Item {
    idx: number;
    title: string;
    expire_date: string;
    register_date: string;
    modify_date: null;
    memo: string;
    register: number;
    count: number;
    position: number;
    is_deleted: 'N' | 'Y';
}

const Compart = () => {

    const location = useLocation();
    const position = location.search.split("=")[1];

    const [itemList, setItemList] = useState<Item[]>([]);

    // 아이템 리스트 조회
    const getItemList = async () => {
        await axios.get(
            `${process.env.REACT_APP_BASE_URL}/fridge/list/${position}`,
        ).then((res) => {
            console.log('res', res);

            setItemList(res.data.data);

        }).catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        getItemList();
    }, []);

    return (
        <div className="h-[calc(80vh-40px)]">
            <div className="flex flex-wrap w-full">
                {
                    itemList.map((item, idx) => (
                        <ItemBox
                            key={idx}
                            title={item.title}
                            expire_date={item.expire_date}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default Compart;