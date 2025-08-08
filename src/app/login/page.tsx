'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoggedIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const redirectUrl = searchParams.get('redirect') || '/home';

  // 如果已经登录，自动重定向
  useEffect(() => {
    if (isLoggedIn) {
      router.push(redirectUrl);
    }
  }, [isLoggedIn, router, redirectUrl]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // 模拟登录延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 调用登录方法
      login(username.trim());
      
      // 登录成功后会通过 useEffect 自动重定向
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  // 如果正在加载（即将重定向），显示加载状态
  if (isLoggedIn) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-white mb-2">Redirecting...</h3>
          <p className="text-white/80">Taking you to your destination</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 顶部导航 */}
      <header className="px-6 py-4 flex-shrink-0">
        <div className="flex items-center">
          <button
            onClick={handleBack}
            className="text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold text-white">Login</h1>
            <p className="text-xs text-white/80">Access your travel journey</p>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <div className="flex-1 flex items-center justify-center px-6 mobile-content">
        <div className="w-full max-w-sm">
          {/* Logo 和标题 */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-[#4A90E2] to-[#64D8EF] rounded-3xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Welcome to UniLoco</h1>
            <p className="text-white/60 text-sm">Start your travel exploration journey</p>
          </div>

          {/* 登录表单 */}
          <div className="bg-black/80 backdrop-blur-sm rounded-3xl p-6 border border-white/10 shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* 用户名输入 */}
              <div>
                <label className="block text-white/80 text-sm mb-2 font-medium">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#4A90E2] transition-colors"
                  disabled={isLoading}
                />
              </div>

              {/* 密码输入 */}
              <div>
                <label className="block text-white/80 text-sm mb-2 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#4A90E2] transition-colors"
                  disabled={isLoading}
                />
              </div>

              {/* 错误提示 */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* 登录按钮 */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-[#FF9E4A] to-[#FFB366] text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* 提示信息 */}
            <div className="mt-4 p-3 bg-white/5 rounded-xl">
              <p className="text-white/60 text-xs text-center">
                💡 Tip: Enter any username and password to sign in
              </p>
            </div>
          </div>

          {/* 底部信息 */}
          <div className="text-center mt-6">
            <p className="text-white/40 text-xs">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="mobile-screen bg-gradient-to-b from-[#64D8EF] to-[#000000] from-10% to-100% flex flex-col">
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-white mb-2">Loading...</h3>
            <p className="text-white/80">Preparing login page</p>
          </div>
        </div>
      }>
        <LoginContent />
      </Suspense>
    </div>
  );
} 