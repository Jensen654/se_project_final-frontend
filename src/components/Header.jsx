import "./blocks/Header.css";
import reactLogo from "../assets/react.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserDataContext from "../contexts/UserDataContext";
import PageDataContext from "../contexts/PageDataContext";

function Header() {
  const { user } = useContext(UserDataContext);
  const { handleLoginClick } = useContext(PageDataContext);

  return (
    <div className="header">
      <Link to={"/"}>
        <img className="header__logo" src={reactLogo} alt="Logo" />
      </Link>
      <h1 className="header__title">My Pokedex</h1>
      {user?.name.length > 0 ? (
        <Link to={"/profile"} className="header__profile_link">
          <div className="header__profile">
            <p className="header__user-name">{user.name}</p>
            <img
              className="header__user-image"
              src={user.avatarUrl}
              alt="User Image"
            />
          </div>
        </Link>
      ) : (
        <div className="header__profile">
          <button
            type="button"
            className="header__button"
            onClick={handleLoginClick}
          >
            Sign Up and Log In
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
