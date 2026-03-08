"use client";

import { useState, useRef } from "react";
import { Mic, PhoneOff, Waves, Headphones } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface VoiceControlProps {
  onTranscript?: (text: string) => void;
  isDisabled?: boolean;
}

export default function VoiceControl({ onTranscript, isDisabled }: VoiceControlProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  // This control only appears on the note page
  if (pathname !== "/note-page") {
    return null;
  }

  const startRecording = () => {
    if (isDisabled) return;
    
    setIsRecording(true);
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "es-ES"; // Setting to Spanish as per user preference

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        if (onTranscript) onTranscript(transcript);
      };

      recognitionRef.current.onerror = () => setIsRecording(false);
      recognitionRef.current.onend = () => setIsRecording(false);

      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  return (
    <div className="fixed bottom-[20px] md:bottom-[44px] right-[20px] md:right-[44px] z-[100] origin-bottom-right">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="circle"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="w-[57px] h-[57px] rounded-full bg-[#2C2C2C] flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform"
          >
            <Headphones className="w-6 h-6 text-white" />
          </motion.button>
        ) : (
          <motion.div 
            key="pill"
            initial={{ width: "57px", opacity: 0 }}
            animate={{ width: "251px", opacity: 1 }}
            exit={{ width: "57px", opacity: 0 }}
            className="flex items-center justify-between px-[20px] bg-[#EF9C66] border border-black rounded-full h-[57px] shadow-[0px_4px_10px_rgba(0,0,0,0.1)] overflow-hidden"
          >
            {/* Left Group */}
            <div className="flex items-center gap-[12px] shrink-0">
              <button 
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isDisabled && !isRecording}
                title={isDisabled ? "Select a field to start recording" : "Start/Stop recording"}
                className={cn(
                  "transition-all duration-300", 
                  (isDisabled && !isRecording) 
                    ? "opacity-30 grayscale cursor-not-allowed scale-95" 
                    : "cursor-pointer hover:opacity-80 active:scale-90"
                )}
              >
                <Mic className={cn(
                  "w-[20px] h-[20px] transition-colors", 
                  isRecording ? "text-red-500 animate-pulse" : "text-white"
                )} />
              </button>
              <button 
                onClick={stopRecording}
                className="cursor-pointer hover:opacity-80 active:scale-90 transition-all"
              >
                <PhoneOff className="w-[20px] h-[20px] text-[#FF4B4B] fill-[#FF4B4B] transition-opacity" />
              </button>
            </div>

            {/* Waves / Center-ish Space */}
            <div className="flex-1 flex justify-center min-w-0">
               {isRecording ? (
                 <div className="flex items-center gap-1 h-[24px]">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [8, 20, 8] }}
                        transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                        className="w-1 bg-white/80 rounded-full"
                      />
                    ))}
                 </div>
               ) : (
                 <Waves className="w-[48px] h-[24px] text-white/60 shrink-0" />
               )}
            </div>

            {/* Right Group: Collapse */}
            <div className="flex items-center shrink-0">
              <button onClick={() => setIsOpen(false)}>
                <Headphones className="w-[20px] h-[20px] text-white cursor-pointer hover:opacity-80 transition-opacity" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
