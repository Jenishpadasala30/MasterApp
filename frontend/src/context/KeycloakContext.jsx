import { createContext, useContext, useEffect, useState } from 'react'
import Keycloak from 'keycloak-js'

const KeycloakContext = createContext(null)

export const useKeycloak = () => {
  const context = useContext(KeycloakContext)
  if (!context) {
    throw new Error('useKeycloak must be used within KeycloakProvider')
  }
  return context
}

export const KeycloakProvider = ({ children }) => {
  const [keycloak, setKeycloak] = useState(null)
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initKeycloak = async () => {
      const kc = new Keycloak({
        url: import.meta.env.VITE_KEYCLOAK_URL,
        realm: import.meta.env.VITE_KEYCLOAK_REALM,
        clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
      })

      try {
        const authenticated = await kc.init({
          onLoad: 'check-sso',
          checkLoginIframe: false,
        })

        // Expose keycloak to window for axios interceptor
        window.keycloak = kc

        setKeycloak(kc)
        setAuthenticated(authenticated)
      } catch (error) {
        console.error('Keycloak initialization failed:', error)
      } finally {
        setLoading(false)
      }
    }

    initKeycloak()
  }, [])

  const login = () => {
    if (keycloak) {
      keycloak.login()
    }
  }

  const logout = () => {
    if (keycloak) {
      keycloak.logout()
    }
  }

  const hasRole = (role) => {
    if (!keycloak || !authenticated) return false
    return keycloak.hasRealmRole(role) || keycloak.hasResourceRole(role, 'portfolio-client')
  }

  const getToken = async () => {
    if (keycloak && authenticated) {
      try {
        await keycloak.updateToken(30)
        return keycloak.token
      } catch (error) {
        console.error('Failed to refresh token:', error)
        login()
        return null
      }
    }
    return null
  }

  const value = {
    keycloak,
    authenticated,
    loading,
    login,
    logout,
    hasRole,
    getToken,
    user: keycloak?.tokenParsed,
  }

  return (
    <KeycloakContext.Provider value={value}>
      {children}
    </KeycloakContext.Provider>
  )
}

