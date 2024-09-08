import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserItem({avatarUser, userName}) {
    return (
        <div className="d-flex flex-column align-items-center gap-3">
            <img 
                src={avatarUser} 
                alt="User Avatar" 
                className="rounded-circle" 
                style={{ width: '100px', height: '100px' }} 
            />
            <h3>{userName}</h3>
            <button className="btn btn-primary">
                Invite
            </button>
        </div>
    );
}

export default UserItem;
