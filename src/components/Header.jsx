import "./blocks/Header.css";
import reactLogo from "../assets/react.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserDataContext from "../contexts/UserDataContext";
import PageDataContext from "../contexts/PageDataContext";

function Header() {
  const { user } = useContext(UserDataContext);
  const { handleLoginClick, handleSignUpClick } = useContext(PageDataContext);

  return (
    <header className="header">
      <Link className="header__logo" to={"/"}>
        <img src={reactLogo} alt="Logo" />
        <p className="header__logo-text">Home</p>
      </Link>
      <h1 className="header__title">My Pokedex</h1>
      {user?.name.length > 0 ? (
        <Link to={"/profile"} className="header__profile">
          <div className="header__profile-content">
            <p className="header__profile-name">{user.name}</p>
            <img
              className="header__profile-image"
              src={user.avatarUrl}
              alt="User Image"
            />
          </div>
        </Link>
      ) : (
        <div className="header__profile-content">
          <button
            type="button"
            className="header__button"
            onClick={handleLoginClick}
          >
            Log In
          </button>
          <button
            type="button"
            className="header__button"
            onClick={handleSignUpClick}
          >
            Sign Up
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
