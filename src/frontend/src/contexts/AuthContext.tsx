import { createContext, useContext, useEffect, useState } from "react";
import { UserRole } from "../backend";
import { useActor } from "../hooks/useActor";

interface AuthContextType {
  role: UserRole;
  isAdmin: boolean;
  isLoggedIn: boolean;
  isLoading: boolean;
  mockLogin: (asAdmin?: boolean) => void;
  mockLogout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { actor, isFetching } = useActor();
  const [role, setRole] = useState<UserRole>(UserRole.guest);
  const [isLoading, setIsLoading] = useState(true);
  const [mockRole, setMockRole] = useState<UserRole | null>(() => {
    const s = localStorage.getItem("em_mock_role");
    return s as UserRole | null;
  });

  useEffect(() => {
    if (!actor || isFetching) return;
    actor
      .getCallerUserRole()
      .then((r) => {
        setRole(r);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [actor, isFetching]);

  const effectiveRole = mockRole ?? role;

  return (
    <AuthContext.Provider
      value={{
        role: effectiveRole,
        isAdmin: effectiveRole === UserRole.admin,
        isLoggedIn: effectiveRole !== UserRole.guest,
        isLoading,
        mockLogin: (asAdmin = false) => {
          const r = asAdmin ? UserRole.admin : UserRole.user;
          setMockRole(r);
          localStorage.setItem("em_mock_role", r);
        },
        mockLogout: () => {
          setMockRole(null);
          localStorage.removeItem("em_mock_role");
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
