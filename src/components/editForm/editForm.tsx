import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Form {
  title: string;
  description: string;
  questions: string[];
}

const EditFormPage = () => {
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


  const handleSave = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/forms/${id}`, form);
      navigate("/"); 
    } catch (err) {
      console.error("Error saving form:", err);
      setError("Error saving form. Try again.");
    }
  };

  if (loading) return <p>Loading form...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Editing a form</h2>


      <label>
        Headline:
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleInputChange}
        />
      </label>


      <label>
        Description:
        <textarea
          name="description"
          value={form.description}
          onChange={handleInputChange}
        />
      </label>

      <h3>Questions:</h3>
      {form.questions.map((question, index) => (
        <div key={index}>
          <input
            type="text"
            value={question}
            onChange={(e) => handleInputChange(e, index)}
          />
          <button onClick={() => handleRemoveQuestion(index)}>Delete</button>
        </div>
      ))}

      <button onClick={handleAddQuestion}>Add a question</button>

      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditFormPage;
