import { useEffect } from "react";
import { ReactComponent as Refrigerator_icon } from "../../assets/images/refrigerator_icon.svg";
import { Link } from "react-router-dom";

interface SubHeaderPropsType {
  first_position: number;
}

const SubHeader = ({ first_position }: SubHeaderPropsType) => {
  return (
    <div className="flex border-2 border-solid px-2 py-3">
      <Link to="/">
        <Refrigerator_icon className="size-6 w-10 flex-initial"></Refrigerator_icon>
      </Link>
      <div className="w-80 flex-initial">
        &gt; &nbsp;&nbsp;
        {first_position === 1 || first_position === 2 || first_position === 3
          ? "냉장실"
          : "냉동실"}
        &nbsp; &gt; &nbsp;&nbsp;
        {first_position === 1 || first_position === 4
          ? "왼쪽 날개"
          : first_position === 2 || first_position === 5
            ? "중앙"
            : first_position === 3 || first_position === 6
              ? "오른쪽 날개"
              : ""}
      </div>
    </div>
  );
};

export default SubHeader;
