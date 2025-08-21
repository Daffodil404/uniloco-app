'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface LoginData {
  username: string;
  isLoggedIn: boolean;
  loginTime: string;
}

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<LoginData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // 检查登录状态
  const checkLoginStatus = useCallback(() => {
    try {
      const loginData = sessionStorage.getItem('userLogin');
      if (loginData) {
        const parsed = JSON.parse(loginData) as LoginData;
        if (parsed.isLoggedIn) {
          setIsLoggedIn(true);
          setUserData(parsed);
          return true;
        }
      }
      setIsLoggedIn(false);
      setUserData(null);
      return false;
    } catch (error) {
      console.error('Error checking login status:', error);
      setIsLoggedIn(false);
      setUserData(null);
      return false;
    }
  }, []);

  // 登录
  const login = useCallback((username: string) => {
    const loginData: LoginData = {
      username,
      isLoggedIn: true,
      loginTime: new Date().toISOString()
    };
    
    sessionStorage.setItem('userLogin', JSON.stringify(loginData));
    setIsLoggedIn(true);
    setUserData(loginData);
  }, []);

  // 登出
  const logout = useCallback(() => {
    sessionStorage.removeItem('userLogin');
    setIsLoggedIn(false);
    setUserData(null);
    router.push('/h5/login');
  }, [router]);

  // 检查是否需要登录
  const requireLogin = useCallback((redirectUrl?: string) => {
    if (!isLoggedIn) {
      const currentUrl = window.location.pathname + window.location.search;
      const loginUrl = `/h5/login?redirect=${encodeURIComponent(redirectUrl || currentUrl)}`;
      router.push(loginUrl);
      return false;
    }
    return true;
  }, [isLoggedIn, router]);

  // 初始化时检查登录状态
  useEffect(() => {
    checkLoginStatus();
    setIsLoading(false);
  }, [checkLoginStatus]);

  return {
    isLoggedIn,
    userData,
    isLoading,
    login,
    logout,
    requireLogin,
    checkLoginStatus
  };
} 