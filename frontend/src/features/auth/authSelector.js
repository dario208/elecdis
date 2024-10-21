
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export const selectUserRole = (state) => state.auth.userRole;
export const selectHasRole = (requiredRole) => (state) =>
  requiredRole.includes(state.auth.userRole);
