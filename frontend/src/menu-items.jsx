const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Home',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          //DASHBOARD - TODOS LOS USUARIOS
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/dashboard',
          roles: ['Administrador', 'Médico', 'Enfermero']
        }
      ]
    },
    {
      id: 'crud_admin',
      title: 'Funciones',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'v_administradores',
          title: 'Gestionar Usuarios',
          type: 'item',
          url: '/usuarios',
          classes: 'nav-item',
          icon: 'feather icon-user',
          roles: ['Administrador'] // Solo el rol Administrador puede ver esta opción
        },
        {
          id: 'v_Especialidades',
          title: 'Gestionar Especialidades',
          type: 'item',
          url: '/especialidades',
          classes: 'nav-item',
          icon: 'feather icon-clipboard',
          roles: ['Administrador'] // Solo el rol Administrador puede ver esta opción
        },
        {
          id: 'v_areas',
          title: 'Gestionar Areas',
          type: 'item',
          url: '/areas',
          classes: 'nav-item',
          icon: 'feather icon-activity',
          roles: ['Administrador'] // Solo el rol Administrador puede ver esta opción
        },
        {
          //VISTA DE TOMAR CONSULTAS - SOLO LOS MEDICOS
          id: 'v_tomar-consulta',
          title: 'Tomar Consulta',
          type: 'item',
          icon: 'feather icon-user-check',
          url: '/tomar-consulta',
          roles: ['Médico']
        },

        {
          //VISTA PARA EL DETALLE DE LAS CONSULTAS - SOLO LOS MEDICOS
          id: 'v_consultas',
          title: 'Tus Consultas',
          type: 'item',
          icon: 'feather icon-clipboard',
          url: '/consultas',
          roles: ['Médico']
        },

        {
          //VISTA PARA EL DETALLE DE LAS CONSULTAS REALIZADAS - SOLO LOS MEDICOS
          id: 'v_consultas_realizadas',
          title: 'Tus Consultas realizadas',
          type: 'item',
          icon: 'feather icon-check-square',
          url: '/consultas-realizadas',
          roles: ['Médico']
        },

        // SOLO EMFERMEROS
        {
          //AGREGAR PACIENTES
          id: 'v_pacientes',
          title: 'Pacientes',
          type: 'item',
          icon: 'feather icon-user-plus',
          url: '/pacientes',
          roles: ['Enfermero']
        },

        {
          //VISTA SELECCION TRIAGE
          id: 'v_seleccion',
          title: 'Seleccion Triage',
          type: 'item',
          icon: 'feather icon-alert-triangle',
          url: '/seleccion',
          roles: ['Enfermero', 'Médico']
        }
      ]
    }
  ]
};

export default menuItems;
