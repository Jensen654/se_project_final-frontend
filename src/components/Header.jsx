import "./blocks/Header.css";
import reactLogo from "../assets/react.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <Link to={"/"}>
        <img className="header__logo" src={reactLogo} alt="Logo" />
      </Link>
      <h1 className="header__title">My Pokedex</h1>
      <Link to={"/profile"} className="header__profile_link">
        <div className="header__profile">
          <p className="header__user-name">Jensen Bean</p>
          <img
            className="header__user-image"
            src="https://static.scientificamerican.com/dam/m/6c6324834b10211b/original/facial_expression_eyebrow_raised.jpg?m=1737990739.405&w=600"
            alt="Profile Image"
          />
        </div>
      </Link>
    </div>
  );
}

export default Header;
