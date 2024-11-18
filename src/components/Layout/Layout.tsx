import Footer from "./Footer";
import Header from "./Header";

const Layout = (props: { children: React.ReactNode; }) => {

    return (
        <div className="h-screen">
            <Header />

            <main>
                {props.children}
            </main>

            <Footer />
        </div>
    );
};

export default Layout;