import "./loginPage.scss";
import { LoginForm } from "../../components/loginForm";

const LoginPage = () => {
  return (
    <>
      <div className="login-page">
        <div className="overlay"></div>
        <div className="login-form">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
