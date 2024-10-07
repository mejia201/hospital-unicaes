import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';
import AuthGuard from 'components/AuthGuard';
import { useAuth } from 'components/AuthContext';

const routes = [
  {
    path: '/',
    exact: true,
    element: () => <Navigate to="/login" />, // Redirige a login desde la raíz
  },
  {
    path: '/login',
    exact: true,
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        path: '/dashboard',
        exact: true,
        guard: AuthGuard,
        element: lazy(() => import('./views/dashboard'))
      },
      {
        path: '/sample-page',
        exact: true,
        guard: AuthGuard,
        element: lazy(() => import('./views/extra/SamplePage')),
        roles: ['Administrador'] 
      },
      {
        path: '*',
        exact: true,
        element: () => <Navigate to="/login" />
      }
    ]
  }
];


const RenderRoutes = ({ routes }) => {
  const { user } = useAuth();

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {routes.map((route, i) => {
          const Guard = route.guard || React.Fragment;
          const Layout = route.layout || React.Fragment;
          const Element = route.element;

          // Validación de roles
          if (route.roles && (!user || !route.roles.includes(user.rol))) {
            return null; // No renderiza la ruta si el usuario no tiene el rol adecuado
          }

          return (
            <Route
              key={i}
              path={route.path}
              element={
                <Guard>
                  <Layout>
                    {route.routes ? <RenderRoutes routes={route.routes} /> : <Element />}
                  </Layout>
                </Guard>
              }
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export { routes };
export default RenderRoutes;