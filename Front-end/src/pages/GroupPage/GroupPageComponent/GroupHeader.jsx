import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

function GroupHeader({ groupName, groupImage, groupMember }) {
  return (
    <div className="container">
      <div className="header-group">
        <div className="img-group">
          <img src={groupImage} alt="Group" />
        </div>
        <div className="row">
          <div className="col-9">
            <h1 className="group-name">{groupName}</h1>
            <p className="group-detail">
              <span>
                <FontAwesomeIcon icon={faLock} />
              </span>
              Private Group {groupMember} members
            </p>
          </div>
          <div className="col-3">
            <div className="group-button">
              <button className="btn group-invite"> + Invite</button>
              <button className="btn group-request">Request(0)</button>
            </div>
          </div>
        </div>
        <div className="nav-group group-nav">
          <nav className="nav">
            <a className="nav-link" href="#">
              Discussion
            </a>
            <a className="nav-link" href="#">
              Member
            </a>
            <a className="nav-link" href="#">
              Media
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default GroupHeader;
