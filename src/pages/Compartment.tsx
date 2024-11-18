import { useLocation } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Compart from "../components/common/Compart";
import SubHeader from "../components/common/SubHeader";

const Compartment = () => {

    const query = useLocation();
    const first_position: number = parseInt(query.search.split("first_position=")[1]);

    console.log('query', query);

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