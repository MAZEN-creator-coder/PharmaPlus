// src/routes/guards.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/**
 * Blocks access if the user is not authenticated.
 * If blocked, redirects to "/" and (optionally) can open the login modal.
 */
export function RequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // While checking auth, render nothing (or a loader if you want)
  if (isLoading) return null;

  return isAuthenticated
    ? <Outlet />
    : <Navigate to="/" replace state={{ from: location, forceLoginModal: true }} />;
}

/**
 * Blocks access unless the user has one of the allowed roles.
 * Usage in routes:
 *   <Route element={<RequireRole allowed={['admin']} />}>
 *     <Route path="/admin" element={<AdminDashboard />} />
 *   </Route>
 */
export function RequireRole({ allowed = [] }) {
  const { isAuthenticated, isLoading, hasRole, user } = useAuth();
  const location = useLocation();

  if (isLoading) return null;

  // Must be logged in first
  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location, forceLoginModal: true }} />;
  }

  // Normalize "allowed" to an array
  const allowedArray = Array.isArray(allowed) ? allowed : [allowed];

  // If hasRole isn't provided by context yet, fall back to checking user.role
  const isAllowed = typeof hasRole === "function"
    ? hasRole(allowedArray)
    : (user?.role ? allowedArray.includes(user.role) : false);

  return isAllowed ? <Outlet /> : <Navigate to="/unauthorized" replace />;
}
