import { useLocation } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Compart from "../components/common/Compart";
import SubHeader from "../components/common/SubHeader";

const Compartment = () => {

    const query = useLocation();
    const first_position: number = parseInt(query.search.split("position=")[1]);

    return (
        <Layout>
            <SubHeader
                first_position={first_position}
            />
            <Compart />
        </Layout>
    );
};

export default Compartment;