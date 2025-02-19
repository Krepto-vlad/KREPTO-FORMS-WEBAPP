import "./App.css";
import { FormsPage } from "./pages/formsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<FormsPage />} path="/" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
