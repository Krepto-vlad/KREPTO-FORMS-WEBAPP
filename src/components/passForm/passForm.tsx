import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PassForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", questions: [] });
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/forms/${id}`
        );
        setForm(response.data);
        setAnswers(new Array(response.data.questions.length).fill(""));
      } catch (err) {
        console.error("Error loading form:", err);
      }
    };

    fetchForm();
  }, [id]);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token"); 
      await axios.post(
        `https://krepto-forms-backend.onrender.com/forms/${id}/submit`,
        { answers },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", 
          },
        }
      );
      navigate("/");
    } catch (err) {
      console.error("Error sending responses:", err);
    }
  };

  return (
    <div>
      <h2>{form.title}</h2>
      {form.questions.map((q, index) => (
        <div key={index}>
          <p>{q}</p>
          <input value={answers[index]} onChange={(e) => handleChange(index, e.target.value)} />
        </div>
      ))}
      <button onClick={handleSubmit}>Send answers</button>
    </div>
  );
};

export default PassForm;
