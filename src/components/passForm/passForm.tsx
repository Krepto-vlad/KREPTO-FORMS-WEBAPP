import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PassForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", questions: [] });
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    axios.get(`/forms/${id}`)
      .then((res) => {
        setForm(res.data);
        setAnswers(new Array(res.data.questions.length).fill(""));
      })
      .catch((err) => console.error("Ошибка загрузки формы:", err));
  }, [id]);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`/forms/${id}/submit`, { answers });
      navigate("/");
    } catch (err) {
      console.error("Ошибка отправки ответов:", err);
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
      <button onClick={handleSubmit}>Отправить ответы</button>
    </div>
  );
};

export default PassForm;
