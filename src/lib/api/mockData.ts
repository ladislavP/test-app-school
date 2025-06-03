// src/lib/api/mockData.ts
import { School, Device } from './types';

// Mock user credentials
export const VALID_CREDENTIALS = {
  username: 'demo',
  password: 'password',
};

// Mock auth token
export const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTYiLCJ1c2VybmFtZSI6ImRlbW8iLCJpYXQiOjE2MjM0NTY3ODl9';

// Mock schools data
export const SCHOOLS: School[] = [
  {
    id: '1',
    name: 'Springfield Elementary School',
    address: '123 Main St, Springfield',
    phoneNumber: '(555) 123-4567',
  },
  {
    id: '2',
    name: 'Riverdale High School',
    address: '456 River Rd, Riverdale',
    phoneNumber: '(555) 234-5678',
  },
  {
    id: '3',
    name: 'Westview Academy',
    address: '789 West Ave, Westview',
    phoneNumber: '(555) 345-6789',
  },
  {
    id: '4',
    name: 'Eastside Middle School',
    address: '101 East Blvd, Eastside',
    phoneNumber: '(555) 456-7890',
  },
  {
    id: '5',
    name: 'Northfield Technical Institute',
    address: '202 North St, Northfield',
    phoneNumber: '(555) 567-8901',
  },
  {
    id: '6',
    name: 'Southpoint College',
    address: '303 South Ln, Southpoint',
    phoneNumber: '(555) 678-9012',
  },
  {
    id: '7',
    name: 'Central High School',
    address: '404 Central Ave, Centertown',
    phoneNumber: '(555) 789-0123',
  },
  {
    id: '8',
    name: 'Lakeside Elementary',
    address: '505 Lake Dr, Lakeside',
    phoneNumber: '(555) 890-1234',
  },
  {
    id: '9',
    name: 'Mountain View School',
    address: '606 Mountain Rd, Mountain View',
    phoneNumber: '(555) 901-2345',
  },
  {
    id: '10',
    name: 'Valley Middle School',
    address: '707 Valley Way, Valleytown',
    phoneNumber: '(555) 012-3456',
  },
  {
    id: '11',
    name: 'Hillcrest Academy',
    address: '808 Hill St, Hillcrest',
    phoneNumber: '(555) 123-4567',
  },
  {
    id: '12',
    name: 'Oceanside High School',
    address: '909 Ocean Blvd, Oceanside',
    phoneNumber: '(555) 234-5678',
  },
  {
    id: '13',
    name: 'Forest Elementary',
    address: '1010 Forest Ave, Forestville',
    phoneNumber: '(555) 345-6789',
  },
  {
    id: '14',
    name: 'Meadow Middle School',
    address: '1111 Meadow Ln, Meadowville',
    phoneNumber: '(555) 456-7890',
  },
  {
    id: '15',
    name: 'Sunset High School',
    address: '1212 Sunset Dr, Sunsetville',
    phoneNumber: '(555) 567-8901',
  },
];

// Mock devices data for each school
export const SCHOOL_DEVICES: Record<string, Device[]> = {
  '1': [
    { id: '101', name: 'Classroom Projector A1', status: 'green', lastUpdated: '2025-05-30T10:30:00Z' },
    { id: '102', name: 'Computer Lab Router', status: 'yellow', lastUpdated: '2025-05-30T09:15:00Z' },
    { id: '103', name: 'Library Printer', status: 'red', lastUpdated: '2025-05-29T14:45:00Z' },
    { id: '104', name: 'Cafeteria WiFi AP', status: 'green', lastUpdated: '2025-05-30T11:20:00Z' },
    { id: '105', name: 'Admin Office Switch', status: 'green', lastUpdated: '2025-05-30T08:00:00Z' },
  ],
  '2': [
    { id: '201', name: 'Science Lab Server', status: 'green', lastUpdated: '2025-05-30T10:00:00Z' },
    { id: '202', name: 'Gym WiFi AP', status: 'red', lastUpdated: '2025-05-28T16:30:00Z' },
    { id: '203', name: 'Auditorium Sound System', status: 'yellow', lastUpdated: '2025-05-29T13:45:00Z' },
    { id: '204', name: 'Main Office Printer', status: 'green', lastUpdated: '2025-05-30T09:10:00Z' },
  ],
  '3': [
    { id: '301', name: 'Art Room Projector', status: 'green', lastUpdated: '2025-05-30T11:15:00Z' },
    { id: '302', name: 'Music Room Audio System', status: 'green', lastUpdated: '2025-05-30T10:45:00Z' },
    { id: '303', name: 'Main Entrance Security Camera', status: 'red', lastUpdated: '2025-05-29T08:30:00Z' },
  ],
};

// For other schools, generate random devices
for (let i = 4; i <= 15; i++) {
  const schoolId = i.toString();
  const numDevices = Math.floor(Math.random() * 5) + 2; // 2-6 devices per school
  const devices: Device[] = [];
  
  for (let j = 1; j <= numDevices; j++) {
    const deviceId = `${i}${j.toString().padStart(2, '0')}`;
    const statuses: Array<'green' | 'yellow' | 'red'> = ['green', 'yellow', 'red'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    devices.push({
      id: deviceId,
      name: `Device ${deviceId}`,
      status: randomStatus,
      lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 172800000)).toISOString(), // Random time in last 48 hours
    });
  }
  
  SCHOOL_DEVICES[schoolId] = devices;
}

// Valid QR codes
export const VALID_QR_CODES = [
  'DEVICE:101',
  'DEVICE:202',
  'DEVICE:303',
];
