import { createContext, useState, useEffect } from 'react';
import getUserById from '../shared/api/getUserById';

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
  // Initialize `user` from localStorage if present
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
    // Initialize from token if present. Runs when `token` changes.
    (async () => {
      try {
        if (!token) return;

        const payload = decodeJwtPayload(token);
        if (!payload) return;
        try { localStorage.setItem('pharmaplus_user', JSON.stringify(payload)); } catch { void 0; }
        setUser(payload);

        try {
          const id = payload.id || payload._id;
          if (id) {
            // pass the current token for authorization
            getUserById(id, token).then((remote) => {
              if (!remote) return;
              const first = remote.firstName || remote.firstname || remote.first_name;
              const last = remote.lastName || remote.lastname || remote.last_name;
              const name = remote.name || `${first || ''} ${last || ''}`.trim() || undefined;
              if (first || last || name) {
                setUser((prev) => ({ ...(prev || {}), ...(first ? { firstName: first } : {}), ...(last ? { lastName: last } : {}), ...(name ? { name } : {}) }));
              }
            }).catch(() => { /* ignore background errors */ });
          }
        } catch { /* ignore */ }
      } catch (err) {
        console.error('Error initializing auth from token', err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [token,setUser]);

  // Accepts a raw JWT token, persists it and decodes payload into user
  const loginWithToken = (t) => {
    try {
      if (!t) throw new Error('No token provided');
      setToken(t);
      localStorage.setItem('pharmaplus_token', t);
      const payload = decodeJwtPayload(t) || {};
      setUser(payload);
      try { localStorage.setItem('pharmaplus_user', JSON.stringify(payload)); } catch { void 0; }

      // In-memory-only enrichment: fetch canonical profile names but DO NOT persist them.
      try {
        const id = payload.id || payload._id;
        if (id) {
          getUserById(id, t).then((remote) => {
            if (!remote) return;
            const first = remote.firstName || remote.firstname || remote.first_name;
            const last = remote.lastName || remote.lastname || remote.last_name;
            const name = remote.name || `${first || ''} ${last || ''}`.trim() || undefined;
            if (first || last || name) {
              setUser((prev) => ({ ...(prev || {}), ...(first ? { firstName: first } : {}), ...(last ? { lastName: last } : {}), ...(name ? { name } : {}) }));
            }
          }).catch(() => { /* ignore background errors */ });
        }
      } catch { /* ignore */ }

      // redirect to dashboard immediately (use role from payload)
      const dashboardRoute = getDashboardRoute(payload.role);
      window.location.href = dashboardRoute;
    } catch (err) {
      console.error('loginWithToken error', err);
      throw err;
    }
  };

  // legacy `login` removed — use `loginWithToken` which derives role from the JWT payload

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
      try { localStorage.setItem('pharmaplus_user', JSON.stringify(updatedUser)); } catch { void 0; }
    }
  };

  const hasRole = (roles) => {
    if (!user?.role) return false;
    const userRoleNormalized = String(user.role).toLowerCase();
    if (Array.isArray(roles)) {
      return roles.some(r => String(r).toLowerCase() === userRoleNormalized);
    }
    return String(roles).toLowerCase() === userRoleNormalized;
  };

  const value = {
    token,
    user,
    isLoading,
  loginWithToken,
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
