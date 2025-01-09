export const ERROR_CODES = {
    '1001': 'User already exists',
    '1002': 'Invalid credentials',
    '1003': 'Token expired',
    '1004': 'Invalid token',
    '2001': 'Profile not found',
    '2002': 'Invalid profile data',
    '5001': 'Internal server error',
    '5002': 'Validation error',
    '5003': 'Database error'
  };
  
  export const getErrorMessage = (errorCode) => {
    return ERROR_CODES[errorCode] || 'Something went wrong';
  };