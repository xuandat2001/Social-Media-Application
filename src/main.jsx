import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Group from './pages/Group.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Group/>
  </StrictMode>,
)
