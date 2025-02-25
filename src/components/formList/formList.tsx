import "./formList.scss";
import { useEffect, useState } from "react";
import { getForms } from "../../api/formService";
import { useNavigate } from "react-router-dom";
import { Form } from "../../types/formTypes";

const FormList = () => {

    const [forms, setForms] = useState<Form[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await getForms();
                setForms(response.data);
            } catch (error) {
                console.error("Error while retrieving forms:", error);
            }
        };

        fetchForms();
    }, []);

    const userId = localStorage.getItem("userId"); 
    const userIdNumber = userId ? Number(userId) : null;
    
    const handleFormClick = (form: Form) => {
        if (userIdNumber !== null && form.user_id === userIdNumber) {
            navigate(`/edit-form/${form.id}`);
        } else {
            navigate(`/pass-form/${form.id}`);
        }
    };
    
    const handlePassForm = (form: Form) => {
        navigate(`/pass-form/${form.id}`);
      };
    


    return(
        <div>

            <div className="forms-page">
                <div className="form-creation">
                    <h1>All Forms</h1>
                    <button className="create-form-btn" onClick={() => navigate("/create-form")}>
                        + Create Form
                    </button>
                </div>
                <div className="forms-container">
                    {forms.map((form) => (
                        <div key={form.id} className="form-card" onClick={() => handleFormClick(form)}>
                            <h2>{form.title}</h2>
                            <p>{form.description}</p>
                            <span className="form-theme">{form.theme}</span>
                            <button onClick={() => handlePassForm(form)}>Pass Form</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FormList;