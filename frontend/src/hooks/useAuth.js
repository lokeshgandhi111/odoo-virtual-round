import useAuthStore from '../store/authStore'

const useAuth = () => {
  const { user, token, loading, error, login, signup, logout, fetchProfile, clearError } = useAuthStore()
  return {
    user,
    token,
    loading,
    error,
    login,
    signup,
    logout,
    fetchProfile,
    clearError,
    isAuthenticated: !!token,
  }
}

export default useAuth
