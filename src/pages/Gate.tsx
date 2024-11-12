import { useNavigate } from "react-router-dom";
import Door from "../components/common/Door";
import Layout from "../components/Layout/Layout";

/*interface PositionProps {
    positionList: number[];
}*/


// 냉장고 대문
const Gate = () => {

    const positionList = [0, 1];

    // top, down 이 나눠져 있어야 함
    return (
        <Layout>
            <div className="h-dvh
                            group/item hover:bg-slate-100">
                {
                    positionList.map((item, index) => (
                        <div className="grid grid-cols-2 h-1/2
                                    group/edit hover:bg-slate-200 group-hover/item:visible
                                    ">
                            <Door
                                first_position={item} />
                            <Door
                                first_position={item} />
                        </div>))
                }
            </div>
        </Layout>
    );
};

export default Gate;