import { useEffect } from "react";
import { ReactComponent as Refrigerator_icon } from "../../assets/images/refrigerator_icon.svg";
import { Link } from "react-router-dom";

interface SubHeaderPropsType {
    first_position: number;
}



const SubHeader = ({ first_position }: SubHeaderPropsType) => {

    return (
        <div className="px-2 py-3 flex border-solid border-2">
            <Link to="/gate"><Refrigerator_icon
                className="flex-initial w-10 size-6"
            >
            </Refrigerator_icon></Link>
            <div className="flex-initial w-80">&gt; &nbsp;&nbsp;
                {(first_position === 1 || first_position === 2 || first_position === 3) ? '냉장실' : '냉동실'}
                &nbsp; &gt; &nbsp;&nbsp;
                {(first_position === 1 || first_position === 4) ? '왼쪽 날개' :
                    (first_position === 2 || first_position === 5) ? '중앙' :
                        (first_position === 3 || first_position === 6) ? '오른쪽 날개' : ''}
            </div>
        </div>
    );
};



export default SubHeader;