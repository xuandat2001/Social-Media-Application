import "../css/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
function AdminHeader() {
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
                        <a
                          className="nav-link active"
                          aria-current="page"
                          href="#"
                        >
                          Group Request
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          User Management
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          Content Management
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-3">
                    <button
                      className="btn btn-sign-out align-items-center"
                      type="button"
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
