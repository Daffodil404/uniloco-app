'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface GDPRSectionProps {
  className?: string;
}

export default function GDPRSection({ className = '' }: GDPRSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 底部GDPR链接 */}
      <div className={`text-center py-4 border-t border-gray-200 ${className}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors underline"
        >
          Privacy Policy & Cookie Settings
        </button>
      </div>

      {/* GDPR Modal */}
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black bg-opacity-50" />
          <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <Dialog.Title className="text-2xl font-bold text-gray-900">
                  Privacy Policy & Cookie Settings
                </Dialog.Title>
              </div>
            
            <div className="p-6 space-y-6 text-sm text-gray-700">
              {/* 数据收集 */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  1. Data Collection
                </h3>
                <p className="mb-2">
                  We collect the following types of personal data:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Account information (name, email, profile data)</li>
                  <li>Travel preferences and itinerary data</li>
                  <li>Location data (with your consent)</li>
                  <li>Usage analytics and app interactions</li>
                  <li>Device information and technical logs</li>
                </ul>
              </section>

              {/* 数据用途 */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  2. How We Use Your Data
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Provide personalized travel recommendations</li>
                  <li>Generate AI-powered itineraries</li>
                  <li>Improve app functionality and user experience</li>
                  <li>Send relevant notifications and updates</li>
                  <li>Ensure app security and prevent fraud</li>
                </ul>
              </section>

              {/* 法律基础 */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  3. Legal Basis for Processing
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Consent:</strong> For marketing communications and optional features</li>
                  <li><strong>Contract:</strong> To provide our travel planning services</li>
                  <li><strong>Legitimate Interest:</strong> To improve our services and ensure security</li>
                  <li><strong>Legal Obligation:</strong> To comply with applicable laws</li>
                </ul>
              </section>

              {/* 数据共享 */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  4. Data Sharing
                </h3>
                <p className="mb-2">
                  We may share your data with:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Travel service providers (hotels, restaurants, activities)</li>
                  <li>Payment processors for secure transactions</li>
                  <li>Analytics providers (with anonymized data)</li>
                  <li>Legal authorities when required by law</li>
                </ul>
              </section>

              {/* 数据保留 */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  5. Data Retention
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Account data: Until account deletion</li>
                  <li>Travel itineraries: 3 years</li>
                  <li>Analytics data: 2 years</li>
                  <li>Logs: 1 year</li>
                </ul>
              </section>

              {/* 用户权利 */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  6. Your Rights (GDPR Article 15-22)
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Rectification:</strong> Correct inaccurate data</li>
                  <li><strong>Erasure:</strong> Request deletion of your data</li>
                  <li><strong>Portability:</strong> Receive your data in a structured format</li>
                  <li><strong>Restriction:</strong> Limit how we process your data</li>
                  <li><strong>Objection:</strong> Object to certain processing activities</li>
                  <li><strong>Withdraw Consent:</strong> Revoke previously given consent</li>
                </ul>
              </section>

              {/* Cookie设置 */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  7. Cookie Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">Essential Cookies</p>
                      <p className="text-xs text-gray-500">Required for app functionality</p>
                    </div>
                    <div className="text-green-600 font-medium">Always Active</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">Analytics Cookies</p>
                      <p className="text-xs text-gray-500">Help us improve our services</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">Marketing Cookies</p>
                      <p className="text-xs text-gray-500">Personalized advertisements</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </section>

              {/* 联系方式 */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  8. Contact Information
                </h3>
                <p className="mb-2">
                  For privacy-related inquiries or to exercise your rights:
                </p>
                <ul className="space-y-1">
                  <li><strong>Email:</strong> privacy@uniloco.com</li>
                  <li><strong>Data Protection Officer:</strong> dpo@uniloco.com</li>
                  <li><strong>Address:</strong> [Your Company Address]</li>
                </ul>
                <p className="mt-3 text-xs text-gray-500">
                  You also have the right to lodge a complaint with your local data protection authority.
                </p>
              </section>

              {/* 更新日期 */}
              <section className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Last updated: {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </section>
            </div>

            {/* 底部按钮 */}
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  // 这里可以添加保存cookie设置的逻辑
                  setIsOpen(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
    </>
  );
}
