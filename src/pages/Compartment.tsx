import { useLocation } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import SubHeader from "../components/common/SubHeader";
import Center from "../components/Center";

const Compartment = () => {

    const query = useLocation();
    const first_position: number = parseInt(query.search.split("first_position=")[1]);

    console.log('query', query);

    return (
        <Layout>
            <SubHeader
                first_position={first_position}
            />
            <Center />

        </Layout>
    );
};

export default Compartment;