import { IDashboardItem } from '../interfaces/dashboard.item.interface';

export const DASHBOARD_ITEMS: IDashboardItem[] = [
  {
    title: 'Authors list',
    link: '/authors',
    selected: false,
  },
  {
    title: 'Authors table',
    link: '/table',
    selected: false,
  },
  {
    title: 'Books',
    link: '/books',
    selected: true,
  },
];
