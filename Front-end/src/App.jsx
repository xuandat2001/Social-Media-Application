import { Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './Authentication_Context/ProtectedRoute';
import Header from './components/Header';
import Home from './pages/HomePage/Home';
import GroupList from './pages/GroupPage/GroupList';
import FriendList from './pages/FriendList/FriendList';
import Profile from './pages/Profile-user/Profile';
import StrangerProfile from './pages/Stranger-profile/strangerProfile';
import Login from './pages/Login-Register/Login';
import Register from './pages/Login-Register/Register';
import { Provider } from 'react-redux';
import { store } from './Redux/Store.js';

const App = () => {
  const location = useLocation();
  const hideHeader = location.pathname === '/login' || location.pathname === '/register';
  return (
    <>
      <Provider store={store}>
        {!hideHeader && <ProtectedRoute element={<Header />} />}
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/groupList" element={<ProtectedRoute element={<GroupList />} />} />
          <Route path="/friendList" element={<ProtectedRoute element={<FriendList />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/strangerprofile" element={<ProtectedRoute element={<StrangerProfile />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Provider>

    </>
  );
};

export default App;
