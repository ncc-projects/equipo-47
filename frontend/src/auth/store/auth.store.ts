import { checkAuthAction } from '../actions/checkAuth.action';
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

  hasRole: (roleName: string) => boolean;
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
  checkAuthStatus: () => Promise<boolean>;
  setAuthStatus: (status: AuthStatus) => void;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  token: null,
  authStatus: 'checking',

  getRoles: () => (get().user?.roles as Role[]) || [],

  hasRole: (roleName: string) => {
    return get().user?.roles?.some((r) => r.name === roleName) ?? false;
  },

  isAdmin: () => {
    const roles = get().user?.roles || [];
    return roles.some((r) => r.name === 'ADMIN') ?? false;
  },

  isOwner: () => {
    const roles = get().user?.roles || [];
    return roles.some((r) => r.name === 'OWNER') ?? false;
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
    localStorage.removeItem('token');
    set({ user: null, token: null, authStatus: 'not-authenticated' });
  },

  checkAuthStatus: async () => {
    try {
      const { userResponseDTO: user, token } = await checkAuthAction();

      set({
        user,
        token,
        authStatus: 'authenticated',
      });

      return true;
    } catch (error) {
      console.log(error);
      set({
        user: undefined,
        token: undefined,
        authStatus: 'not-authenticated',
      });
      return false;
    }
  },
}));
