import { useState } from "react";
import "./loginForm.scss";
import { formDataInitial} from "../../constants";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../api/authService";
import { RegisterUser, requestError } from "../../types/authTypes";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<RegisterUser>(formDataInitial);
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (type: string, value: string) => {
    setAuthError("");
    setFormData((prev) => ({ ...prev, [type]: value }));
  };

  const handleCreateAccount = async () => {
    try {
      const response = await registerUser(formData);

      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", String(response.user.id));
        navigate("/");
      }
    } catch (error) {
      const err = error as requestError;
      setAuthError(err.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser(formData);
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", String(response.user.id));
        navigate("/");
      }
    } catch (error) {
      const err = error as requestError;
      console.log(error)
      setAuthError(err.message);
    }
  };

  const handleOpenSignupForm = () => {
    setIsLogin(false);
    setFormData(formDataInitial);
  };

  return (
    <div className="loginWrapper">
      {!isLogin ? (
        <>
          <p className="title">Create your account</p>
          <label>
            First name
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter your first name"
              required
            />
          </label>
          <label>
            Last name
            <input
              type="text"
              value={formData.surname}
              onChange={(e) => handleInputChange("surname", e.target.value)}
              placeholder="Enter your last name"
              required
            />
          </label>
        </>
      ) : (
        <>
          <p className="title">Login</p>
          <p className="sub-title">Login to platform to continue</p>
        </>
      )}
      <label>
        Email
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="Enter email"
          required
        />
      </label>

      <label>
        Password
        <input
          type="password"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          placeholder="Enter password"
          required
        />
      </label>
      {authError && <p className="error">{authError}</p>}

      {isLogin ? (
        <>
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
          <div className="create-acc-wrapper">
            <p>Don't have an account?</p>
            <button onClick={handleOpenSignupForm}>
              Create a free account.
            </button>
          </div>
        </>
      ) : (
        <button className="login-btn" onClick={handleCreateAccount}>
          Create account
        </button>
      )}
    </div>
  );
};

export default LoginForm;
