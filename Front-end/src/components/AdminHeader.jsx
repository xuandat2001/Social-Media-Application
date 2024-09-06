import "../css/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";

function AdminHeader() {
  const navigate = useNavigate(); // Use useNavigate hook

  const handleLogout = () => {
    // Perform any logout logic here, like clearing user data
    navigate('/'); // Navigate to the home page
  };

  return (
    <>
      <header className="bg-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-6">
              <div className="header-left">
                <div className="row">
                  <div className="logo">
                    <div className="logo-text">
                      <FontAwesomeIcon icon={faUserTie} />
                      <span>Admin Site</span>
                    </div>
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
                        <NavLink
                          className="nav-link"
                          to="/admin/groupRequest"
                          end
                          activeClassName="active"
                        >
                          Group Request
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          to="/admin/userManagement"
                          activeClassName="active"
                        >
                          User Management
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          to="/admin/contentManagement"
                          activeClassName="active"
                        >
                          Content Management
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                  <div className="col-3">
                    <button
                      className="btn btn-sign-out align-items-center"
                      type="button"
                      onClick={handleLogout} // Call handleLogout directly
                    >
                      Sign Out
                    </button>
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

export default AdminHeader;
