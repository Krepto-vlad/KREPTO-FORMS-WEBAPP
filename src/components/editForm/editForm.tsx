import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteForm } from "../../api/formService";
import "./editForm.scss";
import axios from "axios";

interface Form {
  title: string;
  description: string;
  questions: string[];
}

const EditForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [form, setForm] = useState<Form>({
    title: "",
    description: "",
    questions: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/forms/${id}`
        );
        setForm(response.data);
      } catch (err) {
        console.error("Error loading form:", err);
        setError("Error loading form. Try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    if (typeof index === "number") {
      setForm((prev) => {
        const updatedQuestions = [...prev.questions];
        updatedQuestions[index] = e.target.value;
        return { ...prev, questions: updatedQuestions };
      });
    } else {
 
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleAddQuestion = () => {
    setForm((prev) => ({ ...prev, questions: [...prev.questions, ""] }));
  };


  const handleRemoveQuestion = (index: number) => {
    setForm((prev) => {
      const updatedQuestions = prev.questions.filter((_, i) => i !== index);
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleDeleteForm = async () => {
    try {
      await deleteForm(id as string); 
      navigate("/");
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/forms/${id}`, form,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
        },
      }
        );
      navigate("/"); 
    } catch (err) {
      console.error("Error saving form:", err);
      setError("Error saving form. Try again.");
    }
  };

  if (loading) return <p>Loading form...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="edit-form">
      <p className="head">Editing a form</p>


      <label className="Title">
        Title:
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleInputChange}
        />
      </label>


      <p className="description-title">Description:</p>
        <textarea className="description"
          name="description"
          value={form.description}
          onChange={handleInputChange}
        />

      <h3>Questions:</h3>
      {form.questions.map((question, index) => (
        <div  className="question-wrapper" key={index}>
          <input className="question"
            type="text"
            value={question}
            onChange={(e) => handleInputChange(e, index)}
          />
          <button onClick={() => handleRemoveQuestion(index)}>Delete</button>
        </div>
      ))}

      <button className="add-question" onClick={handleAddQuestion}>+ Add Question</button>
      <button className="save" onClick={handleSave}>Save Form</button>
      <button className="delete-form-btn" onClick={handleDeleteForm} >Delete Form</button>
    </div>
  );
};

export default EditForm;
