import { createBrowserRouter, Navigate } from 'react-router';
import { lazy } from 'react';
import { LoginPage } from '../auth/pages/login/LoginPage';
import { RegisterPage } from '../auth/pages/register/RegisterPage';
import { HomePage } from '../pet-health-tracker/pages/home/HomePage';
import {
  NotAuthenticatedRoute,
  OwnerRoute,
} from '@/components/routes/ProtectedRoutes';
import { UpdatePetPage } from '@/pet-health-tracker/pages/pets/UpdatePetPage';
import { ProfilePetPage } from '@/pet-health-tracker/pages/pets/ProfilePetPage';
import { CreatePetPage } from '@/pet-health-tracker/pages/pets/CreatePetPage';
import { CalendarPage } from '@/pet-health-tracker/pages/calendar/CalendarPage';
import { HealthPage } from '@/pet-health-tracker/pages/health/HealthPage';
import { CreateVaccinate } from '@/pet-health-tracker/pages/vaccinate/CreateVaccinate';

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
