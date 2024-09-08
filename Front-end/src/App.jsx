import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import ProtectedRoute from './Authentication_Context/ProtectedRoute';
import Header from './components/Header';
import Home from './pages/HomePage/Home';
import GroupList from './pages/GroupPage/GroupList';
import FriendList from './pages/FriendList/FriendList';
import Profile from './pages/Profile-user/Profile';
import EditProfileForm from './pages/Profile-user/EditProfile'
import StrangerProfile from './pages/Stranger-profile/StrangerProfile';
import Login from './pages/Login-Register/Login';
import Register from './pages/Login-Register/Register';
import { AuthProvider } from './Authentication_Context/Auth_Provider';
import AdminLogin from './pages/Login-Register/LoginAdmin';
import UserManagement from './pages/Admin-Site/UserManagement';
import GroupRequest from './pages/Admin-Site/GroupRequest';
import ContentManagement from './pages/Admin-Site/ContentManagement';
import Group from './pages/GroupPage/Group';
import EditPostBox from './components/User-Site/EditPostBox';

const App = () => {
  const location = useLocation();
  const hideHeader = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/admin'|| location.pathname === '/admin/userManagement'|| location.pathname === '/admin/groupRequest'|| location.pathname === '/admin/contentManagement';

  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          {!hideHeader && <ProtectedRoute element={<Header />} />}
          <Routes>
            {/* User routes */}
            <Route path="/" element={<ProtectedRoute element={<Home />} />} />
            <Route path="/groupList" element={<ProtectedRoute element={<GroupList />} />} />
            <Route path="/friendList" element={<ProtectedRoute element={<FriendList />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
            <Route path="/editprofile" element={<ProtectedRoute element={<EditProfileForm />} />} />
            <Route path="/strangerprofile/:userId" element={<ProtectedRoute element={<StrangerProfile />} />} />
            <Route path="/ " element={<ProtectedRoute element={<StrangerProfile />} />} />
            <Route path="/groupDetail/:groupId" element={<ProtectedRoute element={<Group />} />} />
            <Route path="/editPost/:postId" element={<ProtectedRoute element={<EditPostBox />} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/userManagement" element={<UserManagement />} />
            <Route path="/admin/groupRequest" element={<GroupRequest />}  />
            <Route path="/admin/contentManagement" element={<ContentManagement />}/>

            {/* Catch-all route for undefined paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </Provider>
    </>
  );
};

export default App;
