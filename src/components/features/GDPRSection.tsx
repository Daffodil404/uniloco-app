'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Popover from '@radix-ui/react-popover';
import CookieConsent from './CookieConsent';

interface GDPRSectionProps {
  className?: string;
}

export default function GDPRSection({ className = '' }: GDPRSectionProps) {
  const [activeModal, setActiveModal] = useState<'privacy' | 'tos' | null>(null);
  const [cookiePopoverOpen, setCookiePopoverOpen] = useState(false);

  const handleCookieAccept = () => {
    console.log('Cookies accepted');
  };

  const handleCookieDecline = () => {
    console.log('Cookies declined');
  };

  const handleViewPrivacyPolicy = () => {
    setActiveModal('privacy');
  };

  return (
    <>
      {/* 底部GDPR链接 */}
      <div className={`text-center py-4 border-t w-full border-gray-200 ${className}`}>
            <div className="flex w-[50%] mx-auto justify-around text-sm">
          <button
            onClick={() => setActiveModal('privacy')}
            className="text-gray-500 hover:text-gray-700 transition-colors underline"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveModal('tos')}
            className="text-gray-500 hover:text-gray-700 transition-colors underline"
          >
            Terms of Service
          </button>
          <Popover.Root open={cookiePopoverOpen} onOpenChange={setCookiePopoverOpen}>
            <Popover.Trigger asChild>
              <button className="text-gray-500 hover:text-gray-700 transition-colors underline">
                Cookie Policy
              </button>
            </Popover.Trigger>
            <CookieConsent
              mode="popover"
              isOpen={cookiePopoverOpen}
              onOpenChange={setCookiePopoverOpen}
              onAccept={handleCookieAccept}
              onDecline={handleCookieDecline}
              onViewPrivacyPolicy={handleViewPrivacyPolicy}
            />
          </Popover.Root>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <Dialog.Root open={activeModal === 'privacy'} onOpenChange={() => setActiveModal(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black bg-opacity-30" />
          <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
                <Dialog.Title className="text-2xl font-bold text-gray-900">
                  Privacy Policy
                </Dialog.Title>
                <button
                  onClick={() => setActiveModal(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            
              <div className="p-6 space-y-6 text-sm text-gray-700 overflow-y-auto flex-1">
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

                {/* 用户权利 */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    4. Your Rights (GDPR Article 15-22)
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

                {/* 联系方式 */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    5. Contact Information
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
              <div className="p-6 border-t border-gray-200 flex justify-end flex-shrink-0">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Terms of Service Modal */}
      <Dialog.Root open={activeModal === 'tos'} onOpenChange={() => setActiveModal(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black bg-opacity-30" />
          <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
                <Dialog.Title className="text-2xl font-bold text-gray-900">
                  Terms of Service
                </Dialog.Title>
                <button
                  onClick={() => setActiveModal(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            
              <div className="p-6 space-y-6 text-sm text-gray-700 overflow-y-auto flex-1">
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    1. Acceptance of Terms
                  </h3>
                  <p className="mb-2">
                    By accessing and using Uniloco, you accept and agree to be bound by the terms and provision of this agreement.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    2. Use License
                  </h3>
                  <p className="mb-2">
                    Permission is granted to temporarily download one copy of the materials (information or software) on Uniloco&apos;s website for personal, non-commercial transitory viewing only.
                  </p>
                  <p className="mb-2">This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>modify or copy the materials</li>
                    <li>use the materials for any commercial purpose or for any public display</li>
                    <li>attempt to reverse engineer any software contained on Uniloco&apos;s website</li>
                    <li>remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    3. User Responsibilities
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the security of your account</li>
                    <li>Comply with all applicable laws and regulations</li>
                    <li>Respect the rights of other users</li>
                    <li>Not use the service for any illegal or unauthorized purpose</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    4. Service Availability
                  </h3>
                  <p className="mb-2">
                    We strive to maintain high availability of our services, but we do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue any part of our service at any time.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    5. Limitation of Liability
                  </h3>
                  <p className="mb-2">
                    In no event shall Uniloco or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Uniloco&apos;s website.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    6. Governing Law
                  </h3>
                  <p className="mb-2">
                    These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction] and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
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
              <div className="p-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>


    </>
  );
}
