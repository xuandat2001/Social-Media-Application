import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Group from './pages/Group.jsx';
import GroupRequest from './pages/Admin-Site/GroupRequest.jsx';
import UserManagement from './pages/Admin-Site/UserManagement.jsx';
import ContentManagement from './pages/Admin-Site/ContentManagement.jsx';
import CreatePost from './pages/User-Site/CreatePost.jsx';
import Header from './components/Header.jsx';
import SharePost from './pages/User-Site/SharePost.jsx';
import EditPost from './pages/User-Site/EditPost.jsx';
import Home from './pages/Home.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Group/>
  </StrictMode>,
)

