import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import UserItem from './userItem';

function InvitationBox({ onClose }) {
    const [search, setSearch] = useState("");
    const [acceptFriends, setAcceptFriend] = useState([]);
    useEffect(() => {
        const fetchAcceptFriends = async () => {
          try {
            const response = await fetch('http://localhost:3000/api/acceptedFriend');
            const data = await response.json();
            setAcceptFriend(data);
          } catch (error) {
            console.error("Error fetching accepted friends:", error);
          }
        };
        fetchAcceptFriends();
      }, []);
    return (
        <div className="containerInvitation">
            <div className="row">
                <div className="col-11">
                    <h2>Invite friends to this group</h2>
                </div>
                <div className="col-1">
                    <button onClick={onClose}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                </div>
            </div>
            <div className="row">
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        className="form-control"
                        type="search"
                        placeholder="Search Friend"
                        aria-label="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
                {acceptFriends.length === 0 ? (
                    <div className="no-friends-message">
                        <p>No friends to invite</p>
                    </div>
                ) : (
                    filteredFriends.map((friend) => (
                        <div className="userItem" key={friend._id}>
                            <UserItem avatarUser={`data:image/png;base64,${friend.avatarUser}`} userName={friend.userName} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default InvitationBox;
