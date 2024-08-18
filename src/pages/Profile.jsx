import React from 'react';
import '../css/Profile.css';


const Profile = () => {
  return (
    <div className="profile-container">
      <div className="main-content">
        <div className="header">
          <div className="profile-info">
            <div className="profile-pic"></div> {/* profile picture */}
            <div className="profile-details">
              <h1>Minh Nguyen</h1>
              <p>1 Post | 20 friends</p>
              <p>smiling@gmail.com</p><br/>
              <p className="bio">BIO<br/>Be Individual, Be authentic</p>
              <div className="profile-actions">
                <p>Edit</p> {/*will be linked later*/}
              </div>
            </div>
          </div>
          <hr/>
          <div className="profile-action-container">
            <div className="profile-actions">
                <button>Post</button>{/*will be linked later*/}
                <button>Friend</button>{/*will be linked later*/}
                <button>Group</button>{/*will be linked later*/}
            </div>
          </div>
          <hr/>
        </div>
        <div className="profile-content">
          <div className="post">
            <div className="post-header">
              <div className="post-pic"></div> {/* pfp */}
              <div className="profile-pic-post">
            </div><p>Smiling <span>(updated his profile)</span> - 1p</p>
            </div>
            <div className="post-body">
              <div className="post-img"></div> {/* post image */}
            </div>
            <hr />
            <div className="post-actions">
              <button>Like</button>
              <button>Comment</button>
              <button>Share</button>
            </div>
          </div>
          <div className="post">
            <div className="post-header">
              <div className="post-pic"></div> {/* Replace with post picture */}
              <p>Smiling <span>(updated his profile)</span> - 1p</p>
            </div>
            <div className="post-body">
              <p>Post 2</p>
              <div className="post-img"></div> {/* Replace with post image */}
            </div>
            <hr />
            <div className="post-actions">
              <button>Like</button>
              <button>Comment</button>
              <button>Share</button>
            </div>
          </div>
          <div className="post">
            <div className="post-header">
              <div className="post-pic"></div> {/* Replace with post picture */}
              <p>Smiling <span>(updated his profile)</span> - 1p</p>
            </div>
            <div className="post-body">
              <p>Post 3</p>
              <div className="post-img"></div> {/* Replace with post image */}
            </div>
            <hr />
            <div className="post-actions">
              <button>Like</button>
              <button>Comment</button>
              <button>Share</button>
            </div>
          </div>
          <div className="post">
            <div className="post-header">
              <div className="post-pic"></div> {/* Replace with post picture */}
              <p>Smiling <span>(updated his profile)</span> - 1p</p>
            </div>
            <div className="post-body">
              <p>Post 4</p>
              <div className="post-img"></div> {/* Replace with post image */}
            </div>
            <hr />
            <div className="post-actions">
              <button>Like</button>
              <button>Comment</button>
              <button>Share</button>
            </div>
          </div>

          <div className="post">
            <div className="post-header">
              <div className="post-pic"></div> {/* Replace with post picture */}
              <p>Smiling <span>(updated his profile)</span> - 1p</p>
            </div>
            <div className="post-body">
              <p>Post 5</p>
              <div className="post-img"></div> {/* Replace with post image */}
            </div>
            <hr />
            <div className="post-actions">
              <button>Like</button>
              <button>Comment</button>
              <button>Share</button>
            </div>  
          </div>
        </div>
      </div>
      <div className="interaction-sidebar">
        <h2>Interaction</h2>
        <div className="interaction-section">
          <h3>Suggest Friend</h3>
          <div className="suggest-friend">
            <div className="friend-pic"></div> {/* Friends picture */}
            <p>Oggy</p>
          </div>
        </div>
        <div className="interaction-section">
          <h3>Your Group</h3>
          <div className="group-pic"></div> {/* Group picture */}
          <p>Meo's Kingdom</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;