import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemDetail from "../components/common/ItemDetail";

const Register = () => {

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <ItemDetail
            isModal={false}
            setModalOpen={setModalOpen}
        />
    );
};

export default Register;