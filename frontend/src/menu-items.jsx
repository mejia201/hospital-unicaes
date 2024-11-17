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
          //VISTA DE CONSULTAS - SOLO LOS MEDICOS
          id: 'v_consultas',
          title: 'Consultas',
          type: 'item',
          icon: 'feather icon-clipboard',
          url: '/consultas',
          roles: ['Médico']
        },

        // SOLO EMFERMEROS

        {
        
          //VISTA SELECCION TRIAGE 
          id: 'v_seleccion',
          title: 'Seleccion Triage',
          type: 'item',
          icon: 'feather icon-alert-triangle',
          url: '/seleccion',
          roles: ['Enfermero']
        },
        {
        
          //AGREGAR PACIENTES 
          id: 'v_pacientes',
          title: 'Ingresar Paciente',
          type: 'item',
          icon: 'feather icon-user-plus',
          url: '/pacientes',
          roles: ['Enfermero']
        }


      ]
    }
  ]
};

export default menuItems;
