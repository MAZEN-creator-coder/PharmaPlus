import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Helper function to get dashboard route based on role
const getDashboardRoute = (role) => {
  switch ((role || '').toLowerCase()) {
    case 'admin':
      return '/admin';
    case 'superadmin':
      return '/super';
    default:
      return '/';
  }
};

const decodeJwtPayload = (token) => {
  try {
    const b64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(atob(b64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(json);
  } catch (err) {
    console.error('Failed to decode JWT', err);
    return null;
  }
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    try { return localStorage.getItem('pharmaplus_token'); } catch { return null; }
  });
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('pharmaplus_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize from token if present
    try {
      if (!user && token) {
        const payload = decodeJwtPayload(token);
        if (payload) {
          const userObj = {
            id: payload.id || payload._id,
            email: payload.email,
            role: payload.role || 'user',
            avatar: payload.image || '/user-avatar.png',
            loginTime: new Date().toISOString()
          };
          setUser(userObj);
          localStorage.setItem('pharmaplus_user', JSON.stringify(userObj));
        }
      }
    } catch (err) {
      console.error('Error initializing auth from token', err);
    } finally {
      setIsLoading(false);
    }
  }, [token, user]);

  // Accepts a raw JWT token, persists it and decodes payload into user
  const loginWithToken = (t) => {
    try {
      if (!t) throw new Error('No token provided');
      setToken(t);
      localStorage.setItem('pharmaplus_token', t);

      const payload = decodeJwtPayload(t) || {};
      console.log('payload', payload);
      const userObj = {
        id: payload.id || payload._id || Date.now(),
        email: payload.email,
        role: payload.role || 'user',
        avatar: payload.image || '/user-avatar.png',
        loginTime: new Date().toISOString()
      };

      setUser(userObj);
      localStorage.setItem('pharmaplus_user', JSON.stringify(userObj));
      localStorage.setItem('payload', JSON.stringify(payload));

      // redirect to dashboard immediately (preserve existing behavior)
      const dashboardRoute = getDashboardRoute(userObj.role);
      window.location.href = dashboardRoute;
    } catch (err) {
      console.error('loginWithToken error', err);
      throw err;
    }
  };

  // Legacy: accept a pre-built user object (keeps compatibility)
  const login = (userData) => {
    try {
      const userWithDefaults = {
        id: userData.id || Date.now(),
        name: userData.name || userData.email?.split('@')[0] || 'User',
        email: userData.email,
        avatar: userData.avatar || '/user-avatar.png',
        role: userData.role || 'user',
        loginTime: new Date().toISOString(),
        ...userData
      };
      setUser(userWithDefaults);
      localStorage.setItem('pharmaplus_user', JSON.stringify(userWithDefaults));
      const dashboardRoute = getDashboardRoute(userWithDefaults.role);
      window.location.href = dashboardRoute;
    } catch (err) {
      console.error('login error', err);
      throw err;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    try { localStorage.removeItem('pharmaplus_token'); } catch (err) { console.error('Storage remove error', err); }
    try { localStorage.removeItem('pharmaplus_user'); } catch (err) { console.error('Storage remove error', err); }
  };

  const updateUser = (updatedData) => {
    if (user) {
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      try { localStorage.setItem('pharmaplus_user', JSON.stringify(updatedUser)); } catch (err) { console.error('Storage set error', err); }
    }
  };

  const hasRole = (roles) => {
    if (!user?.role) return false;
    return Array.isArray(roles) ? roles.includes(user.role) : user.role === roles;
  };

  const value = {
    token,
    user,
    isLoading,
    loginWithToken,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
