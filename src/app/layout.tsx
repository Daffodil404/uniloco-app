import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UniLoco - Discover Your Adventure",
  description: "Web3 Travel Story Platform - Where Every Journey Becomes a Story",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  themeColor: "#3B82F6",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "UniLoco",
  },
  formatDetection: {
    telephone: false,
  },
  keywords: ["travel", "web3", "ai", "adventure", "story", "mobile"],
  authors: [{ name: "UniLoco Team" }],
  openGraph: {
    title: "UniLoco - Discover Your Adventure",
    description: "Web3 Travel Story Platform - Where Every Journey Becomes a Story",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "UniLoco - Discover Your Adventure",
    description: "Web3 Travel Story Platform - Where Every Journey Becomes a Story",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="UniLoco" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* 开发环境调试工具 */}
        {/* {process.env.NODE_ENV === 'development' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // 简单的移动端调试工具
                if (typeof window !== 'undefined') {
                  window.addEventListener('load', function() {
                    // 创建调试面板
                    const debugPanel = document.createElement('div');
                    debugPanel.style.cssText = \`
                      position: fixed;
                      top: 10px;
                      right: 10px;
                      background: rgba(0,0,0,0.8);
                      color: white;
                      padding: 10px;
                      border-radius: 5px;
                      font-size: 12px;
                      z-index: 9999;
                      max-width: 200px;
                    \`;
                    debugPanel.innerHTML = \`
                      <div>设备: \${navigator.userAgent.includes('Mobile') ? '移动端' : '桌面端'}</div>
                      <div>屏幕: \${screen.width}x\${screen.height}</div>
                      <div>视口: \${window.innerWidth}x\${window.innerHeight}</div>
                      <button onclick="this.parentElement.remove()" style="margin-top:5px;padding:2px 5px;background:#666;border:none;color:white;border-radius:3px;">关闭</button>
                    \`;
                    document.body.appendChild(debugPanel);
                  });
                }
              `,
            }}
          />
        )} */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
