import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Group from './pages/GroupPage/Group.jsx';
import GroupRequest from './pages/Admin-Site/GroupRequest.jsx';
import UserManagement from './pages/Admin-Site/UserManagement.jsx';
import ContentManagement from './pages/Admin-Site/ContentManagement.jsx';
import CreatePostBox from './components/User-Site/CreatePostBox.jsx';
import Header from './components/Header.jsx';
import SharePostBox from './components/User-Site/SharePostBox.jsx';
import EditPostBox from './components/User-Site/EditPostBox.jsx';
import Home from './pages/HomePage/Home.jsx';
import Post from './components/Post.jsx';
import Profile from './pages/Profile-user/Profile.jsx';
import StrangerProfile from './pages/Stranger-profile/strangerProfile.jsx';
import FriendList from './pages/FriendList/FriendList.jsx';
import GroupList from './pages/GroupPage/GroupList.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/groupList" element={<GroupList />} />
        {/* <Route path="/group" element={<Group />} /> */}
        <Route path="/friendList" element={<FriendList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/strangerprofile" element={<StrangerProfile />} />
      </Routes>
    </Router>
  </StrictMode>,
)

