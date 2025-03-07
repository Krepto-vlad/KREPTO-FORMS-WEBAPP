import { Link } from "react-router-dom";
import "./Navbar.scss";
import searchBtn from '../../assets/search.png'
import logo from '../../assets/TESTfirstRED3.ico'

const Navbar = () => {
      
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