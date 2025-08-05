import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-3">
          <h1 className="text-lg font-semibold text-gray-900">UniLoco</h1>
        </div>
      </header>

      {/* 主要内容区域 */}
      <main className="px-4 py-6">
        {/* 欢迎卡片 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            欢迎使用 UniLoco
          </h2>
          <p className="text-gray-600 text-sm">
            这是一个专为移动端设计的应用
          </p>
        </div>

        {/* 功能按钮区域 */}
        <div className="space-y-3">
          <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium text-base active:bg-blue-700 transition-colors">
            开始使用
          </button>
          
          <button className="w-full bg-gray-100 text-gray-900 py-4 px-6 rounded-lg font-medium text-base active:bg-gray-200 transition-colors">
            了解更多
          </button>
        </div>

        {/* 特性列表 */}
        <div className="mt-8 space-y-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 text-sm font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">响应式设计</h3>
                <p className="text-sm text-gray-600">完美适配各种移动设备</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600 text-sm font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">PWA 支持</h3>
                <p className="text-sm text-gray-600">可安装到主屏幕，接近原生体验</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-purple-600 text-sm font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">快速开发</h3>
                <p className="text-sm text-gray-600">基于 Next.js 和 Tailwind CSS</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 底部导航 */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          <button className="flex flex-col items-center py-2 px-4 text-blue-600">
            <span className="text-xs">首页</span>
          </button>
          <button className="flex flex-col items-center py-2 px-4 text-gray-400">
            <span className="text-xs">功能</span>
          </button>
          <button className="flex flex-col items-center py-2 px-4 text-gray-400">
            <span className="text-xs">我的</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
