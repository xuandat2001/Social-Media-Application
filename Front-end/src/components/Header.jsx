import "../css/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import HeaderNoti from "./HeaderNoti";

function Header() {
  return (
    <>
      <header className="bg-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-6">
              <div className="header-left">
                <div className="row">
                  <div className="col-3">
                    <div className="logo">
                      <FontAwesomeIcon icon={faLink} className="logo-icon" />
                      <div className="logo-text">
                        Link<span>Bridge</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-9">
                    <form>
                      <div className="search-box">
                        <input
                          className="form-control input-search-header"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                        />
                        <button className="btn btn-search" type="button">
                          <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="header-right">
                <div className="row">
                  <div className="col-9">
                    <ul className="nav nav-header">
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/" end>
                          Home Page
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/profile">
                          Profile
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/friendList">
                          Friend
                        </a>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/groupList">
                          Group
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <HeaderNoti />
                      </li>
                    </ul>
                  </div>
                  <div className="col-3">
                    <NavLink to="/login">
                    <button
                      className="btn btn-sign-out align-items-center"
                      type="button"
                    >
                      Sign In
                    </button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;
