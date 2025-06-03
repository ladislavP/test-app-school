// src/lib/api/mockData.ts
import { School, Device } from './types';

// Mock user credentials
export const VALID_CREDENTIALS = {
  username: 'demo',
  password: 'ACLZBw6QCZ',
};

// Mock auth token
export const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTYiLCJ1c2VybmFtZSI6ImRlbW8iLCJpYXQiOjE2MjM0NTY3ODl9';

// Mock schools data
export const SCHOOLS: School[] = [
  {
    id: '1',
    name: 'Základná škola M. R. Štefánika',
    address: 'Štefánikova 12, 080 01 Prešov',
    phoneNumber: '+421 51 123 456',
  },
  {
    id: '2',
    name: 'Gymnázium J. A. Komenského',
    address: 'Komenského 8, 040 01 Košice',
    phoneNumber: '+421 55 234 567',
  },
  {
    id: '3',
    name: 'Stredná odborná škola technická',
    address: 'Technická 5, 917 01 Trnava',
    phoneNumber: '+421 33 345 678',
  },
  {
    id: '4',
    name: 'Základná škola Karpatská',
    address: 'Karpatská 3, 060 01 Kežmarok',
    phoneNumber: '+421 52 456 789',
  },
  {
    id: '5',
    name: 'Spojená škola sv. Františka',
    address: 'Františkánska 15, 010 01 Žilina',
    phoneNumber: '+421 41 567 890',
  },
  {
    id: '6',
    name: 'Obchodná akadémia Bratislava',
    address: 'Račianska 25, 831 02 Bratislava',
    phoneNumber: '+421 2 678 901',
  },
  {
    id: '7',
    name: 'Katolícke gymnázium sv. Mikuláša',
    address: 'Mlynská 10, 071 01 Michalovce',
    phoneNumber: '+421 56 789 012',
  },
  {
    id: '8',
    name: 'Základná škola SNP',
    address: 'SNP 99, 974 01 Banská Bystrica',
    phoneNumber: '+421 48 890 123',
  },
  {
    id: '9',
    name: 'Stredná zdravotnícka škola',
    address: 'Zdravotnícka 1, 911 01 Trenčín',
    phoneNumber: '+421 32 901 234',
  },
  {
    id: '10',
    name: 'Základná umelecká škola Harmónia',
    address: 'Hudobná 7, 058 01 Poprad',
    phoneNumber: '+421 52 012 345',
  },
  {
    id: '11',
    name: 'Evanjelické lýceum Bratislava',
    address: 'Vranovská 2, 851 02 Bratislava',
    phoneNumber: '+421 2 123 456',
  },
  {
    id: '12',
    name: 'Gymnázium Milana Rastislava Štefánika',
    address: 'Masarykova 16, 902 01 Pezinok',
    phoneNumber: '+421 33 234 567',
  },
  {
    id: '13',
    name: 'Základná škola s materskou školou Lúka',
    address: 'Lúčna 4, 935 01 Levice',
    phoneNumber: '+421 36 345 678',
  },
  {
    id: '14',
    name: 'Škola pre mimoriadne nadané deti',
    address: 'Gen. Svobodu 3, 851 01 Bratislava',
    phoneNumber: '+421 2 456 789',
  },
  {
    id: '15',
    name: 'Stredná priemyselná škola elektrotechnická',
    address: 'Elektrotech. 9, 911 05 Trenčín',
    phoneNumber: '+421 32 567 890',
  },
];

// Mock devices data for each school
export const SCHOOL_DEVICES: Record<string, Device[]> = {
  '1': [
    { id: '101', name: 'Projektor v triede A1', status: 'green', lastUpdated: '2025-05-30T10:30:00Z' },
    { id: '102', name: 'Router počítačovej učebne', status: 'yellow', lastUpdated: '2025-05-30T09:15:00Z' },
    { id: '103', name: 'Tlačiareň v knižnici', status: 'red', lastUpdated: '2025-05-29T14:45:00Z' },
    { id: '104', name: 'WiFi prístupový bod v jedálni', status: 'green', lastUpdated: '2025-05-30T11:20:00Z' },
    { id: '105', name: 'Switch v riaditeľni', status: 'green', lastUpdated: '2025-05-30T08:00:00Z' },
  ],
  '2': [
    { id: '201', name: 'Server v laboratóriu', status: 'green', lastUpdated: '2025-05-30T10:00:00Z' },
    { id: '202', name: 'WiFi prístupový bod v telocvični', status: 'red', lastUpdated: '2025-05-28T16:30:00Z' },
    { id: '203', name: 'Ozvučovací systém v aule', status: 'yellow', lastUpdated: '2025-05-29T13:45:00Z' },
    { id: '204', name: 'Tlačiareň v kancelárii', status: 'green', lastUpdated: '2025-05-30T09:10:00Z' },
  ],
  '3': [
    { id: '301', name: 'Projektor vo výtvarnej učebni', status: 'green', lastUpdated: '2025-05-30T11:15:00Z' },
    { id: '302', name: 'Audio systém v hudobnej učebni', status: 'green', lastUpdated: '2025-05-30T10:45:00Z' },
    { id: '303', name: 'Bezpečnostná kamera pri hlavnom vchode', status: 'red', lastUpdated: '2025-05-29T08:30:00Z' },
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
