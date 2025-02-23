import "./App.css";
import { FormsPage } from "./pages/formsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/loginPage";
import { CreateFormsPage } from "./pages/createFormPage";
// import { EditFormPage } from "./pages/editFormPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<FormsPage />} path="/" />
          <Route element={<LoginPage />} path="/login"/>
          <Route element={<CreateFormsPage />} path="/create-form"/>
          {/* <Route element={<EditFormPage />} path="/"
          <Route element={} */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
