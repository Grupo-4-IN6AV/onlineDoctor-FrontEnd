import { RouteInfo } from './sidebar.metadata';
export const ROUTES: RouteInfo[] = [
  {
    path: 'home',
    title: 'Home',
    moduleName: 'doctor',
    iconType: 'material-icons-two-tone',
    icon: 'home',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: 'laboratory',
    title: 'Laboratorio',
    moduleName: 'admin',
    iconType: 'material-icons-two-tone',
    icon: 'biotech',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: 'appointment',
    title: 'Agendar cita',
    moduleName: 'admin',
    iconType: 'material-icons-two-tone',
    icon: 'today',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
  }
];
