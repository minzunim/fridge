import axios from "axios";
import Layout from "../components/Layout/Layout";
import { useEffect, useState } from "react";
import ItemList from "../components/common/List";

interface FridgeItemModel {
    count: number;
    expire_date: string;
    idx: number;
    is_deleted: "N" | "Y";
    memo: string;
    modify_date: null | string;
    position: number;
    register: number;
    register_date: string;
    title: string;
}

interface FrigeItemListModel {
    list: FridgeItemModel[];
    position: number;
}


const Center = () => {

    const [list, setList] = useState<FrigeItemListModel[]>([]);

    const getProductList = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/fridge/list`,
                { withCredentials: true }
            );

            if (response.data.data.length) {
                setList(response.data.data);
            }

        } catch (err) {
            console.log(err);
            return;
        }
    };

    useEffect(() => {
        getProductList();
    }, []);

    useEffect(() => {
        if (list.length > 0) {
            console.log('list3', list[0]);
        }
    }, [list]);

    return (
        <Layout>
            <div className="grid grid-cols-2 gap-4 h-screen mx-3">
                {
                    list.map((item, index) => (
                        <ItemList
                            key={index}
                            list={item.list} />
                    ))
                }
                {/* {
                    list[0].list.map((item, index) => {
                        return (
                            <div className="box-border border-4 rounded-lg">
                                <li>{item.title}</li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </div>
                        );
                    })
                }
                {
                    list[1].list.map((item, index) => {
                        return (
                            <div className="box-border border-4 rounded-lg">
                                <li>{item.title}</li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </div>
                        );
                    })
                }
                {
                    list[2].list.map((item, index) => {
                        return (
                            <div className="box-border border-4 rounded-lg">
                                <li>{item.title}</li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </div>
                        );
                    })
                }
                {
                    list[3].list.map((item, index) => {
                        return (
                            <div className="box-border border-4 rounded-lg">
                                <li>{item.title}</li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </div>
                        );
                    })
                } */}
            </div>
        </Layout>
    );
};

export default Center;