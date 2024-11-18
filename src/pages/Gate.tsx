import { useNavigate } from "react-router-dom";
import { DoubleDoor } from "../components/common/Doors";
import Layout from "../components/Layout/Layout";
import { useState } from "react";

/*interface PositionProps {
    positionList: number[];
}*/


// 냉장고 대문
const Gate = () => {

    const doors = [
        { isTop: true, position: 2 },
        { isTop: true, position: 4 }
    ];

    // top, down 이 나눠져 있어야 함
    return (
        <Layout>
            <div className="h-dvh
                            group/item hover:bg-slate-100
                            flex flex-row flex-wrap
                            ">
                {doors.map((item, idx) => (
                    <DoubleDoor
                        key={idx}
                        isTop={item.isTop}
                        position={item.position}
                    />
                ))}
            </div>
        </Layout>
    );
};

export default Gate;