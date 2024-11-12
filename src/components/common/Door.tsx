import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";

type Iprops = {
    first_position: number;
};

const Door = ({ first_position }: Iprops) => {

    // 냉장고 문을 클릭했을 때 이동
    const navigate = useNavigate();

    const goToCompartment = () => {
        navigate(`/compartment?first_position=${first_position}`);
    };

    return (
        <div className="border-solid border-2 border-slate-300 
                        bg-gradient-to-r from-slate-100"
            onClick={goToCompartment}
        >
            <div className="w-full h-full">
            </div>
        </div>
    );
};

export default Door;