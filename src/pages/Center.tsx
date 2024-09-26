import axios from "axios";
import Layout from "../components/Layout/Layout";
import { useEffect, useState } from "react";

interface listModel {
    position: number,
    list: {
        idx: number;
        title: string;
        expire_date: string;
        register_date: string;
        modify_date: string | null;
        memo: string;
        regitser: number;
        count: number;
        position: number;
        is_deleted: 'N' | 'Y';
    }[];
}

const Center = () => {

    const [list, setList] = useState<listModel[]>([]);

    const getProductList = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/fridge/list`,
                { withCredentials: true }
            );
            console.log('response.data', response.data.data);
            setList(response.data.data);

        } catch (err) {
            console.log(err);
            return;
        }
    };

    useEffect(() => {
        getProductList();
        console.log('list', list);
    }, []);

    useEffect(() => {
        console.log('list', list);
    }, [list]);

    return (
        <Layout>
            <div className="grid grid-cols-2 gap-4 h-screen mx-3">
                {list[0].list.map((item, index) => {
                    return (
                        <div className="box-border border-4 rounded-lg">
                            <li>{item.title}</li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </div>
                    );
                })}
                <div className="box-border border-4 rounded-lg">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </div>
                <div className="box-border border-4 rounded-lg">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </div>
                <div className="box-border border-4 rounded-lg">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </div>
                <div className="box-border border-4 rounded-lg">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </div>

            </div>
        </Layout>
    );
};

export default Center;