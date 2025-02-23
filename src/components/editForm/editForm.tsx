import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Form {
  title: string;
  description: string;
  questions: string[];
}

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<Form>({ title: "", description: "", questions: [] });

  useEffect(() => {
    axios.get(`/forms/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.error("Ошибка загрузки формы:", err));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    if (typeof index === "number") {
      setForm((prevForm) => {
        const updatedQuestions = [...prevForm.questions];
        updatedQuestions[index] = e.target.value; // ✅ Теперь TypeScript не ругается
        return { ...prevForm, questions: updatedQuestions };
      });
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`/forms/${id}`, form);
      navigate("/");
    } catch (err) {
      console.error("Ошибка обновления формы:", err);
    }
  };

  return (
    <div>
      <h2>Редактирование формы</h2>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Название" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Описание" />
      {form.questions.map((q, index) => (
        <input
          key={index}
          value={q}
          onChange={(e) => handleChange(e, index)}
          placeholder="Вопрос"
        />
      ))}
      <button onClick={handleSubmit}>Сохранить</button>
    </div>
  );
};

export default EditForm;
