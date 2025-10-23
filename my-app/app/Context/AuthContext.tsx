'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Types
interface User {
    _id: string;
    username: string;
    email: string;
    role: string[];
    isActive: boolean;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    signup: (username: string, email: string, password: string, role: string[]) => Promise<void>;
    logout: () => void;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, password: string) => Promise<void>;
    updateUser: (userData: Partial<User>) => Promise<void>;
    fetchUserProfile: () => Promise<void>;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API Base URL - Update this to your backend URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

// Provider Props
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    // Initialize auth state from localStorage
    useEffect(() => {
        const initAuth = async () => {
            try {
                const storedToken = localStorage.getItem('authToken');
                const storedUser = localStorage.getItem('user');

                console.log('🔍 Init Auth - Token exists:', !!storedToken);
                console.log('🔍 Init Auth - User exists:', !!storedUser);

                if (storedToken && storedUser) {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUser));

                    // Verify token is still valid
                    try {
                        await fetchUserProfile(storedToken);
                        console.log('✅ Token is valid');
                    } catch (error) {
                        console.error('❌ Token validation failed:', error);
                        // Token is invalid, clear everything
                        logout();
                    }
                } else {
                    console.log('⚠️ No stored credentials found');
                }
            } catch (error) {
                console.error('❌ Error initializing auth:', error);
                logout();
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    // Fetch user profile
    const fetchUserProfile = async (authToken?: string) => {
        const tokenToUse = authToken || token;

        console.log('🔍 Fetching user profile...');
        console.log('🔍 Token to use:', tokenToUse?.substring(0, 20) + '...');

        if (!tokenToUse) {
            console.error('❌ No token available');
            throw new Error('No token available');
        }

        try {
            const response = await fetch(`${API_BASE_URL}/user/user-by`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${tokenToUse}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('📡 User profile response status:', response.status);

            if (response.ok) {
                const data = await response.json();
                console.log('✅ User profile fetched successfully');
                setUser(data.User);
                localStorage.setItem('user', JSON.stringify(data.User));
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error('❌ Failed to fetch user profile:', response.status, errorData);
                throw new Error(errorData.message || 'Failed to fetch user profile');
            }
        } catch (error) {
            console.error('❌ Error fetching user profile:', error);
            throw error;
        }
    };

    // Login
    const login = async (username: string, password: string) => {
        try {
            console.log('🔐 Attempting login...');

            const response = await fetch(`${API_BASE_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            console.log('📡 Login response status:', response.status);

            if (!response.ok) {
                console.error('❌ Login failed:', data.error);
                throw new Error(data.error || 'Login failed');
            }

            console.log('✅ Login successful');
            console.log('🔑 Token received:', data.token?.substring(0, 20) + '...');

            // Store token
            setToken(data.token);
            localStorage.setItem('authToken', data.token);

            // Fetch user profile
            await fetchUserProfile(data.token);

            // Redirect to dashboard or home
            router.push('/dashboard');
        } catch (error) {
            console.error('❌ Login error:', error);
            throw error;
        }
    };

    // Signup
    const signup = async (
        username: string,
        email: string,
        password: string,
        role: string[]
    ) => {
        try {
            console.log('📝 Attempting signup...');

            const response = await fetch(`${API_BASE_URL}/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password, role }),
            });

            const data = await response.json();
            console.log('📡 Signup response status:', response.status);

            if (!response.ok) {
                console.error('❌ Signup failed:', data.error);
                throw new Error(data.error || 'Signup failed');
            }

            console.log('✅ Signup successful');

            // Optionally auto-login after signup
            await login(username, password);
        } catch (error) {
            console.error('❌ Signup error:', error);
            throw error;
        }
    };

    // Logout
    const logout = () => {
        console.log('🚪 Logging out...');
        setUser(null);
        setToken(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        router.push('/login');
    };

    // Forgot Password
    const forgotPassword = async (email: string) => {
        try {
            console.log('📧 Requesting password reset for:', email);

            const response = await fetch(`${API_BASE_URL}/user/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send reset email');
            }

            console.log('✅ Password reset email sent');
            return data;
        } catch (error) {
            console.error('❌ Forgot password error:', error);
            throw error;
        }
    };

    // Reset Password
    const resetPassword = async (token: string, password: string) => {
        try {
            console.log('🔑 Resetting password...');

            const response = await fetch(`${API_BASE_URL}/user/reset-password/${token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to reset password');
            }

            console.log('✅ Password reset successful');

            // Redirect to login
            router.push('/login');
            return data;
        } catch (error) {
            console.error('❌ Reset password error:', error);
            throw error;
        }
    };

    // Update User
    const updateUser = async (userData: Partial<User>) => {
        try {
            if (!token) {
                console.error('❌ No authentication token');
                throw new Error('No authentication token');
            }

            console.log('📝 Updating user...');
            console.log('🔑 Using token:', token.substring(0, 20) + '...');

            const response = await fetch(`${API_BASE_URL}/user/update-user`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            console.log('📡 Update user response status:', response.status);

            if (!response.ok) {
                console.error('❌ Failed to update user:', data.error);
                throw new Error(data.error || 'Failed to update user');
            }

            console.log('✅ User updated successfully');

            // Update local user state
            setUser(data.updateUser);
            localStorage.setItem('user', JSON.stringify(data.updateUser));
        } catch (error) {
            console.error('❌ Update user error:', error);
            throw error;
        }
    };

    const value: AuthContextType = {
        user,
        token,
        isLoading,
        isAuthenticated: !!token && !!user,
        login,
        signup,
        logout,
        forgotPassword,
        resetPassword,
        updateUser,
        fetchUserProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// HOC for protected routes
export const withAuth = <P extends object>(
    Component: React.ComponentType<P>,
    allowedRoles?: string[]
) => {
    return function WithAuthComponent(props: P) {
        const { isAuthenticated, isLoading, user } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!isLoading) {
                if (!isAuthenticated) {
                    console.log('⚠️ User not authenticated, redirecting to login');
                    router.push('/login');
                } else if (allowedRoles && user) {
                    const hasRole = allowedRoles.some((role) => user.role.includes(role));
                    if (!hasRole) {
                        console.log('⚠️ User lacks required role, redirecting to unauthorized');
                        router.push('/unauthorized');
                    }
                }
            }
        }, [isAuthenticated, isLoading, user, router]);

        if (isLoading) {
            return (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-xl">Loading...</div>
                </div>
            );
        }

        if (!isAuthenticated) {
            return null;
        }

        if (allowedRoles && user) {
            const hasRole = allowedRoles.some((role) => user.role.includes(role));
            if (!hasRole) {
                return null;
            }
        }

        return <Component {...props} />;
    };
};