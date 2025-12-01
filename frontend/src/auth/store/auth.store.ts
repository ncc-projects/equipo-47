import { loginAction } from '../actions/login.action';
import { registerUserAction } from '../actions/registerUser.action';
import type { Role, User } from '../interfaces/user.interface';
import { create } from 'zustand';

type AuthStatus =
  | 'authenticated'
  | 'not-authenticated'
  | 'checking'
  | 'verification';

interface RegisterProps {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type AuthState = {
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;

  getRoles: () => Role[];

  hasRole: (role: Role) => boolean;
  hasAnyRole: (roles: Role[]) => boolean;
  isAdmin: () => boolean;
  isOwner: () => boolean;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: ({
    email,
    fullName,
    password,
    confirmPassword,
  }: RegisterProps) => Promise<boolean>;
  // checkAuthStatus: () => Promise<boolean>;
  setAuthStatus: (status: AuthStatus) => void;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  token: null,
  authStatus: 'checking',

  getRoles: () => (get().user?.roles as Role[]) || [],

  // Helpers de roles
  hasRole: (role: Role) => {
    const roles = get().user?.roles || [];
    return roles.includes(role);
  },

  hasAnyRole: (roles: Role[]) => {
    const userRoles = get().user?.roles || [];
    return roles.some((role) => userRoles.includes(role));
  },

  isAdmin: () => {
    const roles = get().user?.roles || [];
    return roles.includes({ name: 'ADMIN', id: 2, enabled: true });
  },

  isOwner: () => {
    const roles = get().user?.roles || [];
    return roles.includes({ name: 'OWNER', id: 1, enabled: true });
  },

  setAuthStatus: (status: AuthStatus) => set({ authStatus: status }),

  login: async (email: string, password: string) => {
    try {
      const data = await loginAction(email, password);

      localStorage.setItem('token', data.token.jwtToken);

      set({
        user: data.user,
        token: data.token.jwtToken,
        authStatus: 'authenticated',
      });

      return true;
    } catch (error) {
      console.error(error);

      localStorage.removeItem('token');

      set({ user: null, token: null, authStatus: 'not-authenticated' });

      return false;
    }
  },
  register: async ({
    email,
    fullName,
    password,
    confirmPassword,
  }: RegisterProps) => {
    try {
      const data = await registerUserAction({
        fullName,
        email,
        password,
        confirmPassword,
      });
      localStorage.setItem('token', data.data.token);
      set({
        user: data.data.userResponseDTO,
        token: data.data.token,
        authStatus: 'authenticated',
      });
      return true;
    } catch (error) {
      console.log(error);
      localStorage.removeItem('token');
      set({ user: null, token: null, authStatus: 'not-authenticated' });
      return false;
    }
  },

  logout: async () => {
    // Limpiar estado local
    localStorage.removeItem('token');
    set({ user: null, token: null, authStatus: 'not-authenticated' });
  },

  // checkAuthStatus: async () => {
  //   try {
  //     const { user, accessToken, sessionConfig } = await checkAuthAction();

  //     set({
  //       user,
  //       token: accessToken,
  //       sessionConfig: sessionConfig,
  //     });

  //     if (!user.isVerified) {
  //       set({ authStatus: 'verification' });
  //       return true;
  //     }

  //     set({ authStatus: 'authenticated', verificationAttempts: 0 });
  //     return true;
  //   } catch (error) {
  //     console.log(error);
  //     set({
  //       user: undefined,
  //       token: undefined,
  //       authStatus: 'not-authenticated',
  //     });
  //     return false;
  //   }
  // },
}));
