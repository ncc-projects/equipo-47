import { createBrowserRouter, Navigate } from 'react-router';
import { lazy } from 'react';
import { LoginPage } from '../auth/pages/login/LoginPage';
import { RegisterPage } from '../auth/pages/register/RegisterPage';
import { HomePage } from '../pet-health-tracker/pages/home/HomePage';
import { ProfilePage } from '@/pet-health-tracker/pages/profile/ProfilePage';
import {
  NotAuthenticatedRoute,
  OwnerRoute,
} from '@/components/routes/ProtectedRoutes';
import { PetCreatePage } from '@/pet-health-tracker/pages/pets/PetCreatePage';

const PetHealthTrackerLayout = lazy(
  () => import('../pet-health-tracker/layouts/PetHealthTrackerLayout')
);
const AuthLayout = lazy(() => import('../auth/layouts/AuthLayout'));

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <OwnerRoute>
        <PetHealthTrackerLayout />
      </OwnerRoute>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/perfil/:petId',
        element: <ProfilePage />,
      },
      {
        path: 'pets/nuevo',
        element: <PetCreatePage />,
      },
    ],
  },
  {
    path: '/auth',
    element: (
      <NotAuthenticatedRoute>
        <AuthLayout />
      </NotAuthenticatedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to='/auth/login' />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={'/'} />,
  },
]);
