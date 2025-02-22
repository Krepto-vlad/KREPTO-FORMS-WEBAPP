import "./formList.scss";
import { useNavigate } from "react-router-dom";

const FormList = () => {
    const navigate = useNavigate();

    return(
        <div>
            <button className="create-form-btn" onClick={() => navigate("/create-form")}>
                + Create Form
            </button>
        </div>
    )
}

export default FormList;