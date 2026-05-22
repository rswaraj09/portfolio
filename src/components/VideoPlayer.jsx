import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            // When video comes into view, play it
            videoRef.current.play().catch((err) => {
              console.log('Autoplay prevented:', err);
            });
          } else if (!entry.isIntersecting && videoRef.current) {
            // When video goes out of view, pause it
            videoRef.current.pause();
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of video is visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <motion.section
      ref={containerRef}
      id="video-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center py-16 md:py-24 px-4"
    >
      <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl">
        <video
          ref={videoRef}
          className="w-full h-auto object-cover rounded-xl"
          autoPlay
          muted
          loop
          playsInline
          controlsList="nodownload"
          style={{
            boxShadow: theme === 'dark' 
              ? '0 0 30px 2px rgba(0, 255, 220, 0.3)' 
              : '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <source src="/Video/RS.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </motion.section>
  );
};

export default VideoPlayer;
