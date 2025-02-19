import { Link } from "react-router-dom";
import "./Navbar.scss";
import searchBtn from '../../assets/search.png'
import logo from '../../assets/TESTfirstRED2.ico'
import axiosClient from "../../api/axiosClient";
import { AxiosErrorResponse } from "../../types/authTypes";

const Navbar = () => {

     const registerUser = async () => {
        try {
          const response = await axiosClient.get("/test");
          console.log("getting data");
          return response; // Возвращает и user, и token
        } catch (err) {
            console.log("in err");
            
          const error = err as AxiosErrorResponse;
          throw new Error(error.response?.data?.message || "Registration failed");
        }
      };
      console.log(registerUser());
      
    return (
        <div className="navbar">
            <a href=""><img className="logo" src={logo} alt="" /></a>
            <div className="search-box">
                    <button className="btn-search"><img src={searchBtn} alt="search" /></button>
                    <input type="text" className="search-input" placeholder="Type to Search..."/>
            </div>

            

            <Link to="/login">
                <button className="login-btn">Login</button>
            </Link>

        </div>
    )
}

export default Navbar;