import { useState } from "react";
import "./createForm.scss";
import { createTemplate } from "../../api/formService";
import { useNavigate } from "react-router-dom";


const CreateForm = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [theme, setTheme] = useState("Other");
    // const [tags, setTags] = useState<string[]>([]);
    const [questions, setQuestions] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleAddQuestion = () => {
        setQuestions([...questions, ""]);
    };

    const handleQuestionChange = (index: number, value: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = value;
        setQuestions(updatedQuestions);
    };
    const userId = localStorage.getItem("userId");

    const handleSubmit = async () => {
        if (!title || !description) return alert("Title and description are required!");

        const newForm = {
            title,
            description,
            theme,
            // tags,
            questions,
            user: {
                id: userId
            },
            
        };

        try {
            await createTemplate(newForm);
            navigate("/");
        } catch (error) {
            console.error("Error creating form:", error);
        }
    };

    return (
        <div className="create-form">
            <p className="head">Create New Form</p>

            <label className="Title">
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>

            <p className="description-title">Description:</p>
            <textarea className="description" value={description} onChange={(e) => setDescription(e.target.value)} />


            <label>
                Theme:
                <select className="custom-select"value={theme} onChange={(e) => setTheme(e.target.value)}>
                    <option value="Education">Education</option>
                    <option value="Test">Test</option>
                    <option value="Survey">Survey</option>
                    <option value="Other">Other</option>
                </select>
            </label>

            {questions.map((question, index) => (
                <input className="question"
                    key={index}
                    type="text"
                    value={question}
                    placeholder={`Question ${index + 1}`}
                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                />
            ))}

            <button className="add-question" onClick={handleAddQuestion}>+ Add Question</button>
            <button className="save" onClick={handleSubmit}>Save Form</button>
        </div>
    );
}

export default CreateForm;