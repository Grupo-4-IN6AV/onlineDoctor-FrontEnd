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
    path: 'patients',
    title: 'Patients',
    moduleName: 'admin',
    iconType: 'material-icons-two-tone',
    icon: 'person',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
  }
];
