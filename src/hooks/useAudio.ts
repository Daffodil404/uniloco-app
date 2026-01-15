import { useState, useRef, useCallback } from 'react';

interface AudioMessage {
  id: string;
  type: 'voice';
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  duration: number;
}

interface UseAudioReturn {
  // Recording state
  isRecording: boolean;
  recordingDuration: number;
  
  // Playing state
  playingVoiceId: string | null;
  
  // Recording functions
  startRecording: () => Promise<void>;
  stopRecording: () => AudioMessage | null;
  
  // Playing functions
  playVoiceMessage: (messageId: string, audioUrl: string) => void;
  stopVoiceMessage: () => void;
}

export const useAudio = (): UseAudioReturn => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const recordingStartTimeRef = useRef<number | null>(null);

  // Start voice recording
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);
      recordingStartTimeRef.current = Date.now();

      // Start duration counter
      recordingIntervalRef.current = setInterval(() => {
        if (recordingStartTimeRef.current) {
          setRecordingDuration((Date.now() - recordingStartTimeRef.current) / 1000);
        }
      }, 100);

    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('无法访问麦克风，请检查浏览器权限设置');
    }
  }, []);

  // Stop voice recording
  const stopRecording = useCallback((): AudioMessage | null => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Clear recording interval
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }
      
      // Create audio message
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const actualDuration = Math.round(recordingDuration);
      
      const voiceMessage: AudioMessage = {
        id: Date.now().toString(),
        type: 'voice',
        content: audioUrl,
        sender: 'user',
        timestamp: new Date(),
        duration: actualDuration
      };

      // Reset recording state
      setRecordingDuration(0);
      recordingStartTimeRef.current = null;

      return voiceMessage;
    }
    return null;
  }, [isRecording, recordingDuration]);

  // Play voice message
  const playVoiceMessage = useCallback((messageId: string, audioUrl: string) => {
    // Stop current playing audio if any
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Create new audio element
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.onplay = () => {
      setPlayingVoiceId(messageId);
    };

    audio.onended = () => {
      setPlayingVoiceId(null);
    };

    audio.onerror = () => {
      setPlayingVoiceId(null);
      console.error('Error playing voice message');
    };

    audio.play().catch(error => {
      console.error('Error playing audio:', error);
      setPlayingVoiceId(null);
    });
  }, []);

  // Stop voice message
  const stopVoiceMessage = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlayingVoiceId(null);
  }, []);

  return {
    isRecording,
    recordingDuration,
    playingVoiceId,
    startRecording,
    stopRecording,
    playVoiceMessage,
    stopVoiceMessage
  };
};
