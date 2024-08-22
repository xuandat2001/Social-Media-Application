import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Group from './pages/GroupPage/Group.jsx';
import GroupRequest from './pages/Admin-Site/GroupRequest.jsx';
import UserManagement from './pages/Admin-Site/UserManagement.jsx';
import ContentManagement from './pages/Admin-Site/ContentManagement.jsx';
import CreatePost from './components/User-Site/CreatePost.jsx';
import Header from './components/Header.jsx';
import SharePost from './components/User-Site/SharePost.jsx';
import EditPost from './components/User-Site/EditPost.jsx';
import Home from './pages/HomePage/Home.jsx';
import Post from './components/Post.jsx';
import Profile from './pages/Profile-user/Profile.jsx';
import StrangerProfile from './pages/Stranger-profile/strangerProfile.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/group" element={<Group />} />
        <Route path="/profile" element={<StrangerProfile />} />
      </Routes>
    </Router>
  </StrictMode>,
)

