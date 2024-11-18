import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";

type Iprops = {
    isTop: boolean;
    position: number;
};

// 단일 문 하나
const Door = () => {
    return (
        <div className="basis-1/2 
                            border-solid border-2 border-slate-300 
                            bg-gradient-to-r from-slate-100
                            w-1/2"></div>
    );
};

// 위 아래 문 두짝씩
export const DoubleDoor = ({ isTop, position }: Iprops) => {

    // 냉장고 문을 클릭했을 때 이동
    const navigate = useNavigate();

    const goToCompartment = () => {
        navigate(`/compartment?position=${position}`);
    };

    return (
        <div className="flex flex-wrap w-full"
            onClick={goToCompartment}
        >
            {[...Array(2)].map((_, idx) => (
                <Door key={idx} />
            ))}
        </div>
    );
};