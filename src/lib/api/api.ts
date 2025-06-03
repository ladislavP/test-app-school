// src/lib/api/api.ts
import { 
  AuthResponse, 
  School, 
  PaginatedResponse, 
  Device, 
  QRScanResponse, 
  ApiError 
} from './types';
import { 
  VALID_CREDENTIALS, 
  AUTH_TOKEN, 
  SCHOOLS, 
  SCHOOL_DEVICES, 
  VALID_QR_CODES 
} from './mockData';

// Helper to simulate network delay
const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// API class
export class API {
  private static token: string | null = null;

  // Set auth token
  static setToken(token: string): void {
    this.token = token;
  }

  // Get auth token
  static getToken(): string | null {
    return this.token;
  }

  // Clear auth token (logout)
  static clearToken(): void {
    this.token = null;
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return !!this.token;
  }

  // Authorization endpoint
  static async authorize(username: string, password: string): Promise<AuthResponse> {
    // Simulate network delay (300-600ms) - reduced for better UX
    await delay(300 + Math.random() * 300);

    // Check credentials
    if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
      // Set token for future requests
      this.token = AUTH_TOKEN;
      
      return {
        token: AUTH_TOKEN,
        user: {
          id: '123456',
          username: username
        }
      };
    } else {
      throw {
        message: 'Invalid username or password',
        code: 'AUTH_FAILED'
      } as ApiError;
    }
  }

  // Load schools with pagination
  static async loadSchools(page: number = 1, limit: number = 5): Promise<PaginatedResponse<School>> {
    // Check authentication
    if (!this.token) {
      throw {
        message: 'Authentication required',
        code: 'AUTH_REQUIRED'
      } as ApiError;
    }

    // Simulate network delay (200-400ms) - reduced for better UX
    await delay(200 + Math.random() * 200);

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedSchools = SCHOOLS.slice(startIndex, endIndex);
    const totalPages = Math.ceil(SCHOOLS.length / limit);

    return {
      data: paginatedSchools,
      page: page,
      totalPages: totalPages,
      hasMore: page < totalPages
    };
  }

  // Load school by ID
  static async loadSchool(schoolId: string): Promise<School> {
    // Check authentication
    if (!this.token) {
      throw {
        message: 'Authentication required',
        code: 'AUTH_REQUIRED'
      } as ApiError;
    }

    // Simulate network delay (200-400ms) - reduced for better UX
    await delay(200 + Math.random() * 200);

    // Find school by ID
    const school = SCHOOLS.find(school => school.id === schoolId);
    
    if (!school) {
      throw {
        message: 'School not found',
        code: 'NOT_FOUND'
      } as ApiError;
    }

    return school;
  }

  // Load school devices
  static async loadSchoolDevices(schoolId: string): Promise<Device[]> {
    // Check authentication
    if (!this.token) {
      throw {
        message: 'Authentication required',
        code: 'AUTH_REQUIRED'
      } as ApiError;
    }

    // Simulate network delay (200-400ms) - reduced for better UX
    await delay(200 + Math.random() * 200);

    // Check if school exists
    if (!SCHOOLS.some(school => school.id === schoolId)) {
      throw {
        message: 'School not found',
        code: 'NOT_FOUND'
      } as ApiError;
    }

    // Return devices for the school or empty array if none
    return SCHOOL_DEVICES[schoolId] || [];
  }

  // Scan QR code
  static async scanQRCode(qrCode: string): Promise<QRScanResponse> {
    // Check authentication
    if (!this.token) {
      throw {
        message: 'Authentication required',
        code: 'AUTH_REQUIRED'
      } as ApiError;
    }

    // Simulate network delay (100-300ms) - reduced for better UX
    await delay(100 + Math.random() * 200);

    // Check if QR code is valid
    if (VALID_QR_CODES.includes(qrCode)) {
      // Extract device ID from QR code
      const deviceId = qrCode.split(':')[1];
      
      return {
        success: true,
        message: 'QR code scanned successfully',
        deviceId: deviceId
      };
    } else {
      return {
        success: false,
        message: 'Invalid QR code'
      };
    }
  }
}
