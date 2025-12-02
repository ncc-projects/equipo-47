import { RouterProvider } from 'react-router';
import { appRouter } from './router/app.router';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useAuthStore } from './auth/store/auth.store';
import { CustomFullScreenLoading } from './components/custom/CustomFullScreenLoading';
import type { PropsWithChildren } from 'react';

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { checkAuthStatus } = useAuthStore();
  const { isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 1.5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <CustomFullScreenLoading />;

  return children;
};

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CheckAuthProvider>
        <RouterProvider router={appRouter} />
      </CheckAuthProvider>
      <Toaster richColors />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
