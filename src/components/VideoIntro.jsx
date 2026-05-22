import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import RS_Video from '../assets/Video/RS.mp4';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const VideoIntro = ({ onVideoEnd }) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    
    if (!video) return;

    const handleCanPlay = () => {
      setIsLoading(false);
      video.play().catch((err) => {
        console.log('Autoplay prevented:', err);
        setIsLoading(false);
      });
    };

    const handleEnded = () => {
      onVideoEnd();
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onVideoEnd]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full"
          />
        </div>
      )}
      
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted={isMuted}
        playsInline
      >
        <source src={RS_Video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Mute/Unmute Button */}
      <motion.button
        onClick={toggleMute}
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
      </motion.button>
    </motion.div>
  );
};

export default VideoIntro;
