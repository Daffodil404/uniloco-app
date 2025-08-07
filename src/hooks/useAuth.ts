'use client';

import { useState, useEffect } from 'react';
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
  const checkLoginStatus = () => {
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
  };

  // 登录
  const login = (username: string) => {
    const loginData: LoginData = {
      username,
      isLoggedIn: true,
      loginTime: new Date().toISOString()
    };
    
    sessionStorage.setItem('userLogin', JSON.stringify(loginData));
    setIsLoggedIn(true);
    setUserData(loginData);
  };

  // 登出
  const logout = () => {
    sessionStorage.removeItem('userLogin');
    setIsLoggedIn(false);
    setUserData(null);
    router.push('/login');
  };

  // 检查是否需要登录
  const requireLogin = (redirectUrl?: string) => {
    if (!isLoggedIn) {
      const currentUrl = window.location.pathname + window.location.search;
      const loginUrl = `/login?redirect=${encodeURIComponent(redirectUrl || currentUrl)}`;
      router.push(loginUrl);
      return false;
    }
    return true;
  };

  // 初始化时检查登录状态
  useEffect(() => {
    checkLoginStatus();
    setIsLoading(false);
  }, []);

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