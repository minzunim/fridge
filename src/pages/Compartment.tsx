import { useLocation } from "react-router-dom";
import SubHeader from "../components/common/subHeader";
import Layout from "../components/Layout/Layout";

const Compartment = () => {

    const query = useLocation();

    console.log('query', query);

    return (
        <Layout>
            <div>1번 칸</div>
            <SubHeader

            />
        </Layout>
    );
};

export default Compartment;