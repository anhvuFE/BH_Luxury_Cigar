import { useState, useEffect, useCallback } from 'react';
import authService from '../services/auth.service';

interface AdminProfile {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: string;
}

type AdminProfileSource = {
  name?: string;
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string;
  phone_number?: string;
  avatar?: string;
  role?: string;
};

type AdminProfileResponse = AdminProfileSource | { data: AdminProfileSource };

export const useAdminProfile = () => {
  const [userProfile, setUserProfile] = useState<AdminProfile>({
    name: 'Admin User',
    email: '',
    phone: '',
    avatar: '',
    role: 'Administrator'
  });
  const [loading, setLoading] = useState(false);

  const loadUserProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response = await authService.request<AdminProfileResponse>('/profile');
      const user = 'data' in response ? response.data : response;

      const profile = {
        name: user.name || `${user.first_name || ''} ${user.last_name || ''}`.trim(),
        email: user.email,
        phone: user.phone || user.phone_number || '',
        avatar: user.avatar,
        role: user.role === 'admin' ? 'Administrator' : 'Staff'
      };

      setUserProfile(profile);

      // Update localStorage with fresh data
      if (user) {
        localStorage.setItem('admin_profile', JSON.stringify(user));
      }

      return profile;
    } catch (error) {
      console.error('Failed to load user profile:', error);

      // Fallback to localStorage
      try {
        const cached = localStorage.getItem('admin_profile');
        if (cached) {
          const cachedUser = JSON.parse(cached);
          const profile = {
            name: cachedUser.name || `${cachedUser.first_name || ''} ${cachedUser.last_name || ''}`.trim(),
            email: cachedUser.email,
            phone: cachedUser.phone || cachedUser.phone_number || '',
            avatar: cachedUser.avatar,
            role: cachedUser.role === 'admin' ? 'Administrator' : 'Staff'
          };
          setUserProfile(profile);
          return profile;
        }
      } catch (cacheError) {
        console.error('Failed to load cached profile:', cacheError);
      }

      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback((updates: Partial<AdminProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));

    // Update localStorage
    const cached = localStorage.getItem('admin_profile');
    if (cached) {
      try {
        const cachedUser = JSON.parse(cached);
        Object.assign(cachedUser, updates);
        localStorage.setItem('admin_profile', JSON.stringify(cachedUser));
      } catch (e) {
        console.error('Failed to update cached profile:', e);
      }
    }
  }, []);

  useEffect(() => {
    loadUserProfile();
  }, [loadUserProfile]);

  return {
    userProfile,
    loading,
    loadUserProfile,
    updateProfile
  };
};
