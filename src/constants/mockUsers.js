import { ASSETS } from './assets.js';

export const CURRENT_USER = {
  id: 'usr-001',
  name: 'Alex Mercer',
  email: 'alex.mercer@rydo.io',
  phone: '+91 98765 43210',
  role: 'rider', // 'rider' | 'driver' | 'admin'
  avatar: ASSETS.userAvatar,
  savedPlaces: {
    home: '742 Evergreen Terrace',
    office: 'Mission Bay Innovation Hub, 4th St'
  },
  defaultPayment: 'Cash / UPI (•••• 8821)',
  promoCode: 'SAVE20'
};

export const MOCK_USERS_LIST = [
  {
    id: 'usr-001',
    name: 'Alex Mercer',
    email: 'alex.mercer@rydo.io',
    phone: '+91 98765 43210',
    role: 'Rider',
    status: 'Active',
    joinedDate: '12 Jan 2025',
    totalTrips: 48
  },
  {
    id: 'usr-002',
    name: 'Ananya S.',
    email: 'ananya.s@techcorp.com',
    phone: '+91 98112 34567',
    role: 'Rider',
    status: 'Active',
    joinedDate: '04 Mar 2025',
    totalTrips: 142
  },
  {
    id: 'usr-003',
    name: 'Rahul Sharma',
    email: 'rahul.s.driver@rydo.io',
    phone: '+91 98450 31289',
    role: 'Driver',
    status: 'Active',
    joinedDate: '18 Nov 2024',
    totalTrips: 1420
  },
  {
    id: 'usr-004',
    name: 'Vikram Singh',
    email: 'vikram.singh@rydo.io',
    phone: '+91 98201 54789',
    role: 'Driver',
    status: 'Active',
    joinedDate: '02 Feb 2024',
    totalTrips: 2310
  },
  {
    id: 'usr-005',
    name: 'Sarah Jenkins',
    email: 's.jenkins@rydo.io',
    phone: '+1 (415) 890-1234',
    role: 'Admin',
    status: 'Active',
    joinedDate: '01 Oct 2023',
    totalTrips: 0
  },
  {
    id: 'usr-006',
    name: 'Rohan Mehta',
    email: 'rohan.m@venture.co',
    phone: '+91 97721 99012',
    role: 'Rider',
    status: 'Inactive',
    joinedDate: '19 Jun 2025',
    totalTrips: 8
  }
];
