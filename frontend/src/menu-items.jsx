const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Home',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          //DASHBOARD - LO PUEDEN VER TODOS???
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/dashboard',
          roles: ['Administrador', 'Médico', 'Enfermero']
        },
        {
          //VISTA PACIENTES - SOLO ENFERMEROS YA Q LOS CREA
          id: 'v_pacientes',
          title: 'Pacientes',
          type: 'item',
          url: '/pacientes_index',
          classes: 'nav-item',
          icon: 'feather icon-user'
          //roles: ['Enfermero']
        },
        {
          //VISTA SELECCION TRIAGE - SOLO EMFERMEROS
          id: 'v_seleccion',
          title: 'Seleccion Triage',
          type: 'item',
          icon: 'feather icon-file-text',
          url: '/seleccion',
          roles: ['Enfermero']
        },
        {
          //VISTA DE CONSULTAS - SOLO LOS MEDICOS
          id: 'v_consultas',
          title: 'Consultas',
          type: 'item',
          icon: 'feather icon-file-text',
          url: '/consulta',
          roles: ['Médico']
        }
      ]
    },
    {
      id: 'crud_admin',
      title: 'Personal Médico',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'v_administradores',
          title: 'Gestionar Administradores',
          type: 'item',
          url: '/crud_administrador',
          classes: 'nav-item',
          icon: 'feather icon-user',
          roles: ['Administrador'] // Solo el rol Administrador puede ver esta opción
        },
        {
          id: 'v_ad_medicos',
          title: 'Gestionar Médicos',
          type: 'item',
          url: '/crud_medicos',
          classes: 'nav-item',
          icon: 'feather icon-user',
          roles: ['Administrador'] // Solo el rol Administrador puede ver esta opción
        },
        {
          id: 'v_ad_enferos',
          title: 'Gestionar Enfermeras /os',
          type: 'item',
          url: '/crud_enfermeros',
          classes: 'nav-item',
          icon: 'feather icon-user',
          roles: ['Administrador'] // Solo el rol Administrador puede ver esta opción
        }
      ]
    }
  ]
};

export default menuItems;
