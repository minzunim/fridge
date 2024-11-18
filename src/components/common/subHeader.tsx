import { ReactComponent as Refrigerator_icon } from "../../assets/images/refrigerator_icon.svg";

interface SubHeaderPropsType {
    first_position: number;
}

const SubHeader = ({ first_position }: SubHeaderPropsType) => {
    return (
        <div className="px-2 py-3 flex border-solid border-2">
            <Refrigerator_icon className="flex-initial w-10 size-6"></Refrigerator_icon>
            <div className="flex-initial w-80">&gt; &nbsp;&nbsp;{first_position === 0 ? '냉장실' : '냉동실'} &nbsp; &gt; &nbsp;&nbsp; 중앙</div>
        </div>
    );
};



export default SubHeader;