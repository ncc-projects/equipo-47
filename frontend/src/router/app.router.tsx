import { createBrowserRouter, Navigate } from 'react-router';
import { lazy, Suspense } from 'react';
import { LoginPage } from '../auth/pages/login/LoginPage';
import { RegisterPage } from '../auth/pages/register/RegisterPage';
import { HomePage } from '../pet-health-tracker/pages/home/HomePage';
import {
  NotAuthenticatedRoute,
  OwnerRoute,
  ResetPasswordRoute,
} from '@/components/routes/ProtectedRoutes';
import { UpdatePetPage } from '@/pet-health-tracker/pages/pets/UpdatePetPage';
import { ProfilePetPage } from '@/pet-health-tracker/pages/pets/ProfilePetPage';
import { CreatePetPage } from '@/pet-health-tracker/pages/pets/CreatePetPage';
import { CalendarPage } from '@/pet-health-tracker/pages/calendar/CalendarPage';
import { HealthPage } from '@/pet-health-tracker/pages/health/HealthPage';
import { CreateVaccinate } from '@/pet-health-tracker/pages/vaccinate/CreateVaccinate';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { RequestPasswordReset } from '@/auth/pages/request-password-reset/RequestPasswordReset';
import { ResetPasswordPage } from '@/auth/pages/reset-password/ResetPasswordPage';

const PetHealthTrackerLayout = lazy(
  () => import('../pet-health-tracker/layouts/PetHealthTrackerLayout')
);
const AuthLayout = lazy(() => import('../auth/layouts/AuthLayout'));

export const appRouter = createBrowserRouter([
// export const appRouter = createHashRouter([
  {
    path: '/',
    element: (
      <OwnerRoute>
        <Suspense fallback={<CustomFullScreenLoading />}>
          <PetHealthTrackerLayout />
        </Suspense>
      </OwnerRoute>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/pets/perfil/:petId',
        element: <ProfilePetPage />,
      },
      {
        path: 'pets/nuevo',
        element: <CreatePetPage />,
      },
      {
        path: 'pets/:petId',
        element: <UpdatePetPage />,
      },
      {
        path: 'pets/calendar',
        element: <CalendarPage />,
      },
      {
        path: 'pets/salud',
        element: <HealthPage />,
      },
      {
        path: 'pets/salud/nueva-vacuna',
        element: <CreateVaccinate />,
      },
    ],
  },
  {
    path: '/auth',
    element: (
      <NotAuthenticatedRoute>
        <Suspense fallback={<CustomFullScreenLoading />}>
          <AuthLayout />
        </Suspense>
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
    path: 'auth/request-password-reset',
    element: (
      <Suspense fallback={<CustomFullScreenLoading />}>
        <AuthLayout />
      </Suspense>
    ),
    children: [{ index: true, element: <RequestPasswordReset /> }],
  },
  {
    path: 'auth/reset-password',
    element: (
      <ResetPasswordRoute>
        <Suspense fallback={<CustomFullScreenLoading />}>
          <AuthLayout />
        </Suspense>
      </ResetPasswordRoute>
    ),
    children: [{ index: true, element: <ResetPasswordPage /> }],
  },
  {
    path: '*',
    element: <Navigate to={'/'} />,
  },
]);
