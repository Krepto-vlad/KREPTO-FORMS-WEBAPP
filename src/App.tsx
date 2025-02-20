import "./App.css";
import { FormsPage } from "./pages/formsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/loginPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<FormsPage />} path="/" />
          <Route element={<LoginPage />} path="/login"/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
