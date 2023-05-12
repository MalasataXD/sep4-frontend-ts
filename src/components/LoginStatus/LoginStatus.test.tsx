import { render, screen } from '@testing-library/react';
import jwt_decode from 'jwt-decode';
import LoginStatus from './LoginStatus';
import { MemoryRouter, } from 'react-router-dom';

// Create a mock function for jwt_decode
jest.mock('jwt-decode');
const jwtDecodeMock = jwt_decode as jest.MockedFunction<typeof jwt_decode>;

describe('LoginStatus', () => {
  const decodedToken = { exp: Date.now() / 1000 + 3600 }; // token with expiration 1 hour from now

  beforeEach(() => {
    localStorage.clear();
  });

  it('should display login button if user is not logged in', () => {
    render(
        <MemoryRouter>
          <LoginStatus />
        </MemoryRouter>
      );
    const loginButton = screen.getByRole('button', { name: /Login/i, });
    expect(loginButton).toBeInTheDocument();
  });

  it('should display profile image if user is logged in', () => {
    localStorage.setItem('jwt', 'fake-jwt-token');
    jwtDecodeMock.mockReturnValueOnce(decodedToken);
    render(
        <MemoryRouter>
          <LoginStatus />
        </MemoryRouter>
      );
    
    const profileImage = screen.getByRole('img', { name: /Profile-img/i });
    expect(profileImage).toBeInTheDocument();
  });
});