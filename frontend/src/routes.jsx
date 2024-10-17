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
    element: () => <Navigate to="/login" /> // Redirige a login desde la raíz
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
        //rutas de perifl usuario
        path: '/perfil',
        exact: true,
        guard: AuthGuard,
        element: lazy(() => import('./views/pacientes_archivo/index_archivo_form')),
        roles: ['Administrador', 'Médico', 'Enfermero']
      },
      {
        path: '/sample-page',
        exact: true,
        guard: AuthGuard,
        element: lazy(() => import('./views/extra/SamplePage'))
      },
      {
        //rutas del administrador
        path: '/crud_administrador',
        exact: true,
        guard: AuthGuard,
        element: lazy(() => import('./views/crud_administrador/admin'))
      },
      {
        //rutas del administrador
        path: '/crud_medicos',
        exact: true,
        guard: AuthGuard,
        element: lazy(() => import('./views/crud_administrador/medicos'))
      },
      {
        //rutas del administrador
        path: '/crud_enfermeros',
        exact: true,
        guard: AuthGuard,
        element: lazy(() => import('./views/crud_administrador/enfermeros'))
      },
      {
        //rutas de medico - Consulta
        path: '/consulta',
        exact: true,
        guard: AuthGuard,
        element: lazy(() => import('./views/consulta/index_consulta'))
      },
      {
        //rutas de medico - Consulta
        path: '/det_consulta',
        exact: true,
        guard: AuthGuard,
        element: lazy(() => import('./views/consulta/det_consulta')),
        roles: ['Médico'] //permiso específico
      },
      {
        //rutas de enfermeros - pacientes, seleccion y archivo
        path: '/pacientes_index',
        exact: true,
        guard: AuthGuard,
        element: lazy(() => import('./views/pacientes/pacientes_index'))
      },
      {
        //rutas de enfermeros - pacientes, seleccion y archivo
        path: '/seleccion',
        exact: true,
        guard: AuthGuard,
        element: lazy(() => import('./views/pacientes/seleccion_triage'))
      },
      {
        //rutas de enfermeros - pacientes, seleccion y archivo
        path: '/archivo_form',
        exact: true,
        guard: AuthGuard,
        element: lazy(() => import('./views/pacientes_archivo/index_archivo_form')),
        roles: ['Enfermero'] //permiso específico
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
                  <Layout>{route.routes ? <RenderRoutes routes={route.routes} /> : <Element />}</Layout>
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
