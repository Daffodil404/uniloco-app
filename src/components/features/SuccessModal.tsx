'use client';

interface CheckInData {
  pointId?: string;
  timestamp?: string;
  location?: string;
  notes: string;
  photos: string[];
  unc?: string;
}

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkInData: CheckInData | null;
}

export default function SuccessModal({ isOpen, onClose, checkInData }: SuccessModalProps) {
  if (!isOpen || !checkInData) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-6 border border-slate-200 max-w-md w-full transform transition-all duration-300 scale-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#fe585f] to-[#ff7a80] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Check-in Successful!</h3>
          <p className="text-slate-600 text-sm mb-4">
            Congratulations! You've successfully checked in at <span className="font-semibold text-[#fe585f]">{checkInData.location}</span>! 
            Your experience has been recorded and shared with the community!
          </p>
          <div className="bg-gradient-to-r from-[#F9F7F5] to-[#E8E8E8] rounded-2xl p-4 mb-4 border border-slate-200">
            <div className="text-center">
              <p className="text-slate-500 text-xs mb-1">Your UNC Token</p>
              <p className="text-[#fe585f] font-mono text-sm break-all font-semibold">{checkInData.unc}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gradient-to-r from-[#fe585f] to-[#ff7a80] text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            Continue Exploring
          </button>
        </div>
      </div>
    </div>
  );
} 