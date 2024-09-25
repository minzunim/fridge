import Layout from "../components/Layout/Layout";

const Center = () => {
    return (
        <Layout>
            <div className="grid grid-cols-2 gap-4 h-screen mx-3">
                <div className="box-border border-4 rounded-lg">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </div>
                <div className="box-border border-4 rounded-lg">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </div>
                <div className="box-border border-4 rounded-lg">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </div>
                <div className="box-border border-4 rounded-lg">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </div>
            </div>
        </Layout>
    );
};

export default Center;