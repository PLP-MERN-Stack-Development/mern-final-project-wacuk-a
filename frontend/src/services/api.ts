const API_BASE_URL = 'http://localhost:5000/api';

// Generic API request function
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

// Auth API calls
export const authAPI = {
  async login(email: string, password: string) {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    county: string;
    userType: 'patient' | 'doctor';
    password: string;
  }) {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  async getProfile(token: string) {
    return apiRequest('/auth/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};

// Appointments API calls
export const appointmentsAPI = {
  async create(appointmentData: any, token: string) {
    return apiRequest('/appointments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(appointmentData),
    });
  },

  async getUserAppointments(token: string) {
    return apiRequest('/appointments/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};

// Doctors API calls
export const doctorsAPI = {
  async getAll() {
    return apiRequest('/doctors');
  },

  async getByCounty(county: string) {
    return apiRequest(`/doctors/county/${county}`);
  },
};

export default apiRequest;
