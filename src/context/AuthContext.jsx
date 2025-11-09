import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Helper function to get dashboard route based on role
const getDashboardRoute = (role) => {
  console.log('Redirecting role:', role); // Debug log
  switch (role?.toLowerCase()) {
    case 'admin':
      return '/admin';
    case 'superadmin':
      return '/super';
    default:
      return '/';
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // Check for existing user session on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('pharmaplus_user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          // Validate user data structure
          if (userData.email && userData.name) {
            setUser(userData);
          } else {
            // Invalid user data, remove it
            localStorage.removeItem('pharmaplus_user');
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        localStorage.removeItem('pharmaplus_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = (userData) => {
    try {
      // Validate required fields
      if (!userData.email) {
        throw new Error('Email is required for login');
      }

      const userWithDefaults = {
        id: userData.id || Date.now(),
        name: userData.name || userData.email.split('@')[0] || 'User',
        email: userData.email,
        avatar: userData.avatar || '/user-avatar.png',
        role: userData.role || 'user', // Default role
        loginTime: new Date().toISOString(),
        ...userData
      };
      
      setUser(userWithDefaults);
      localStorage.setItem('pharmaplus_user', JSON.stringify(userWithDefaults));
      
      // Navigate to the appropriate dashboard based on role
      const dashboardRoute = getDashboardRoute(userWithDefaults.role);
      window.location.href = dashboardRoute;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('pharmaplus_user');
  };

  // Update user data
  const updateUser = (updatedData) => {
    if (user) {
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      localStorage.setItem('pharmaplus_user', JSON.stringify(updatedUser));
    }
  };

  // New: Role checking function
  const hasRole = (roles) => {
    if (!user?.role) return false;
    return Array.isArray(roles) ? roles.includes(user.role) : user.role === roles;
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
    hasRole, // Include hasRole in the context
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
