import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import groupImage from "../../../image/yellow-dog-image.jpg";
function GroupHeader() {
  const group = {
    groupName: "Dog's KingDom",
    groupImage: groupImage,
    groupMember: 10,
  };
  return (
    <>
      <div className="container">
        <div className="header-group">
          <div className="img-group">
            <img src={group.groupImage} />
          </div>
          <div className="row">
            <div className="col-9">
              <h1 className="group-name">{group.groupName}</h1>
              <p className="group-detail">
                {" "}
                <span>
                  <FontAwesomeIcon icon={faLock} />
                </span>
                Private Group {group.groupMember} members
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
    </>
  );
}
export default GroupHeader;
