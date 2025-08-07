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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-black/90 backdrop-blur-sm rounded-3xl p-6 border border-white/20 max-w-md w-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#66D2A0] to-[#4A90E2] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">New Location Unlocked!</h3>
          <p className="text-white/80 text-sm mb-4">
            Congratulations! You've successfully checked in at {checkInData.location}. 
            Your experience has been recorded and shared with the community!
          </p>
          <div className="bg-white/10 rounded-2xl p-4 mb-4">
            <div className="text-center">
              <p className="text-white/60 text-xs mb-1">Your UNC</p>
              <p className="text-[#FF9E4A] font-mono text-sm break-all">{checkInData.unc}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gradient-to-r from-[#FF9E4A] to-[#FFB366] text-white rounded-xl text-sm font-medium"
          >
            Continue Exploring
          </button>
        </div>
      </div>
    </div>
  );
} 