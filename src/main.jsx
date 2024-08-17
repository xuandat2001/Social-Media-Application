import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Group from './pages/Group.jsx';
import GroupRequest from './pages/Admin-Site/GroupRequest.jsx';
import UserManagement from './pages/Admin-Site/UserManagement.jsx';
import ContentManagement from './pages/Admin-Site/ContentManagement.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContentManagement/>
  </StrictMode>,
)
