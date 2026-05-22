import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaComment,
  FaCamera,
  FaHeart,
  FaReply,
  FaTrash,
  FaCog,
  FaThumbtack
} from 'react-icons/fa';


const Contact = () => {
  // States untuk contact form
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  // States untuk comments
  const [commentForm, setCommentForm] = useState({
    name: '',
    message: '',
    photo: null,
    photoPreview: null
  });
  const [comments, setComments] = useState([]);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Default seed comments for visual aesthetic
  const DEFAULT_COMMENTS = [
    {
      id: 'default-1',
      name: 'Aaditya Sen',
      message: "Ritik's React and frontend skills are absolutely top-notch. The attention to detail on the animations and performance is impressive. A highly proactive developer!",
      photo: 'https://ui-avatars.com/api/?name=Aaditya+Sen&background=06b6d4&color=ffffff&size=100',
      timestamp: new Date(Date.now() - 3600000 * 24 * 3).toISOString(), // 3 days ago
      likes: 12,
      isPinned: true
    },
    {
      id: 'default-2',
      name: 'Priya Sharma',
      message: 'The micro-animations, glassmorphism aesthetics, and responsiveness of this portfolio are spectacular! Incredible UX design.',
      photo: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=10b981&color=ffffff&size=100',
      timestamp: new Date(Date.now() - 3600000 * 8).toISOString(), // 8 hours ago
      likes: 8,
      isPinned: false
    },
    {
      id: 'default-3',
      name: 'Dev Patel',
      message: 'Extremely clean codebase structure and flawless execution. A developer with solid technical capabilities and aesthetic taste.',
      photo: 'https://ui-avatars.com/api/?name=Dev+Patel&background=6366f1&color=ffffff&size=100',
      timestamp: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
      likes: 5,
      isPinned: false
    }
  ];

  // Load comments from localStorage or seed with defaults
  useEffect(() => {
    const savedComments = localStorage.getItem('portfolioComments');
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      setComments(DEFAULT_COMMENTS);
      localStorage.setItem('portfolioComments', JSON.stringify(DEFAULT_COMMENTS));
    }
  }, []);

  // Handle contact form via simulated save to localStorage
  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSubmittingContact(true);

    setTimeout(() => {
      try {
        const savedMessages = JSON.parse(localStorage.getItem('portfolioContactMessages') || '[]');
        const newMessage = {
          id: 'msg-' + Date.now(),
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
          timestamp: new Date().toISOString(),
          status: 'unread'
        };
        savedMessages.push(newMessage);
        localStorage.setItem('portfolioContactMessages', JSON.stringify(savedMessages));

        alert('Message sent successfully! Thank you for contacting me. 📧');
        setContactForm({ name: '', email: '', message: '' });
      } catch (error) {
        console.error('Error submitting contact form:', error);
        alert('Failed to send message. Please try again.');
      } finally {
        setIsSubmittingContact(false);
      }
    }, 600);
  };

  // Handle photo upload for comment system
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCommentForm(prev => ({
          ...prev,
          photo: file,
          photoPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle comment submit
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentForm.name.trim() || !commentForm.message.trim()) return;

    setIsSubmittingComment(true);

    setTimeout(() => {
      try {
        const newComment = {
          id: 'comment-' + Date.now(),
          name: commentForm.name,
          message: commentForm.message,
          photo: commentForm.photoPreview || `https://ui-avatars.com/api/?name=${encodeURIComponent(commentForm.name)}&background=00ffdc&color=000754&size=100`,
          timestamp: new Date().toISOString(),
          likes: 0,
          isPinned: false
        };

        const updatedComments = [newComment, ...comments];
        setComments(updatedComments);
        localStorage.setItem('portfolioComments', JSON.stringify(updatedComments));

        // Reset form
        setCommentForm({ name: '', message: '', photo: null, photoPreview: null });
        alert('Comment posted successfully! 🎉');
      } catch (error) {
        console.error('Error submitting comment:', error);
        alert('Failed to post comment. Please try again.');
      } finally {
        setIsSubmittingComment(false);
      }
    }, 600);
  };

  // Handle like comment
  const handleLikeComment = (commentId) => {
    try {
      const updatedComments = comments.map(c =>
        c.id === commentId
          ? { ...c, likes: c.likes + 1 }
          : c
      );
      setComments(updatedComments);
      localStorage.setItem('portfolioComments', JSON.stringify(updatedComments));
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };


  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub />,
      url: 'https://github.com/rswaraj09',
      color: 'from-gray-700 to-gray-900',
      hoverColor: 'hover:shadow-gray-500/25'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: 'https://www.linkedin.com/in/ritik-swaraj-b54812314',
      color: 'from-blue-600 to-indigo-700',
      hoverColor: 'hover:shadow-blue-500/25'
    },
    {
      name: 'Email',
      icon: <FaEnvelope />,
      url: 'mailto:contactritikswaraj@gmail.com',
      color: 'from-emerald-600 to-teal-700',
      hoverColor: 'hover:shadow-emerald-500/25'
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 pb-32 relative overflow-hidden min-h-screen">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-transparent"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-500"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20 relative"
        >
          <h2 className="text-5xl md:text-6xl font-bold font-moderniz mb-4">
            <span className="dark:bg-gradient-to-r dark:from-cyan-400 dark:via-emerald-400 dark:to-cyan-600 dark:bg-clip-text dark:text-transparent text-cyan-600">
              GET IN
            </span>
            {' '}
            <span className="dark:text-white text-slate-800">TOUCH</span>
          </h2>
          <p className="text-xl dark:text-slate-400 text-slate-600 font-cascadia">
            Let's collaborate and build something amazing!
          </p>


        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Side - Contact Form & Social */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Contact Form Panel */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 hidden dark:block"></div>
              <div className="relative dark:bg-slate-900/80 bg-white backdrop-blur-xl rounded-3xl p-8 border dark:border-slate-700/50 border-slate-100 dark:shadow-none shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 dark:bg-gradient-to-r dark:from-cyan-600 dark:to-emerald-600 bg-cyan-600 rounded-full">
                    <FaPaperPlane className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold dark:text-white text-slate-900">Contact Me</h3>
                    <p className="dark:text-slate-400 text-slate-600">Have a project or question? Reach out directly!</p>
                  </div>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="group">
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 dark:text-slate-400 text-slate-400 group-focus-within:text-cyan-600 dark:group-focus-within:text-cyan-400 transition-colors duration-300" />
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full pl-12 pr-4 py-4 dark:bg-slate-800/50 bg-slate-50 border dark:border-slate-600/50 border-slate-200 rounded-xl dark:text-white text-slate-800 dark:placeholder-slate-400 placeholder-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-400/20 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="group">
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 dark:text-slate-400 text-slate-500 group-focus-within:text-cyan-400 transition-colors duration-300" />
                      <input
                        type="email"
                        placeholder="Your Email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full pl-12 pr-4 py-4 dark:bg-slate-800/50 bg-slate-50 border dark:border-slate-600/50 border-slate-200 rounded-xl dark:text-white text-slate-900 dark:placeholder-slate-400 placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="group">
                    <div className="relative">
                      <FaComment className="absolute left-4 top-6 dark:text-slate-400 text-slate-500 group-focus-within:text-cyan-400 transition-colors duration-300" />
                      <textarea
                        placeholder="Your Message"
                        rows="4"
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full pl-12 pr-4 py-4 dark:bg-slate-800/50 bg-slate-50 border dark:border-slate-600/50 border-slate-200 rounded-xl dark:text-white text-slate-900 dark:placeholder-slate-400 placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
                        required
                      ></textarea>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmittingContact}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full dark:bg-gradient-to-r dark:from-cyan-600 dark:to-emerald-600 dark:hover:from-cyan-500 dark:hover:to-emerald-500 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50"
                  >
                    {isSubmittingContact ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <FaPaperPlane />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
              <span className="text-slate-400 font-semibold">or</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
            </div>

            {/* Social Media Panel */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 hidden dark:block"></div>
              <div className="relative dark:bg-slate-900/80 bg-white backdrop-blur-xl rounded-3xl p-8 border dark:border-slate-700/50 border-slate-100 shadow-lg dark:shadow-none">
                <h3 className="text-2xl font-bold dark:text-white text-slate-900 mb-6 text-center">Connect With Me</h3>
                <div className="grid gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className={`group flex items-center gap-4 p-4 bg-gradient-to-r ${social.color} rounded-xl text-white transition-all duration-300 ${social.hoverColor} hover:shadow-xl`}
                    >
                      <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        {social.icon}
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold">{social.name}</span>
                        <p className="text-sm opacity-90">
                          {social.name === 'Email' ? 'Send me an email' : `Connect on ${social.name}`}
                        </p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <FaReply className="rotate-180" />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Comments System */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Comment Form Panel */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 hidden dark:block"></div>
              <div className="relative dark:bg-slate-900/80 bg-white backdrop-blur-xl rounded-3xl p-8 border dark:border-slate-700/50 border-slate-100 dark:shadow-none shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 dark:bg-gradient-to-r dark:from-emerald-600 dark:to-blue-600 bg-cyan-600 rounded-full">
                    <FaComment className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold dark:text-white text-slate-900">Leave a Comment</h3>
                    <p className="dark:text-slate-400 text-slate-600">Share your thoughts!</p>
                  </div>
                </div>

                <form onSubmit={handleCommentSubmit} className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-slate-700 border-2 border-slate-600 overflow-hidden">
                          {commentForm.photoPreview ? (
                            <img src={commentForm.photoPreview} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              <FaCamera />
                            </div>
                          )}
                        </div>
                        <label className="absolute -bottom-2 -right-2 bg-cyan-600 text-white p-2 rounded-full cursor-pointer hover:bg-cyan-500 transition-colors duration-300">
                          <FaCamera className="text-sm" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={commentForm.name}
                        onChange={(e) => setCommentForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 dark:bg-slate-800/50 bg-slate-50 border dark:border-slate-600/50 border-slate-200 rounded-xl dark:text-white text-slate-900 dark:placeholder-slate-400 placeholder-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300"
                        required
                      />
                      <textarea
                        placeholder="Write your comment..."
                        rows="3"
                        value={commentForm.message}
                        onChange={(e) => setCommentForm(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full px-4 py-3 dark:bg-slate-800/50 bg-slate-50 border dark:border-slate-600/50 border-slate-200 rounded-xl dark:text-white text-slate-900 dark:placeholder-slate-400 placeholder-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 resize-none"
                        required
                      ></textarea>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmittingComment}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full dark:bg-gradient-to-r dark:from-emerald-600 dark:to-blue-600 dark:hover:from-emerald-500 dark:hover:to-blue-500 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50"
                  >
                    {isSubmittingComment ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <FaComment />
                        <span>Post Comment</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>

            {/* Comments Display */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold dark:text-white text-slate-900 flex items-center gap-2">
                <FaComment className="text-cyan-400" />
                Comments ({comments.length})
              </h4>

              <div className="relative">
                <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar pb-20 pr-2">
                  <AnimatePresence>
                    {comments.map((comment, index) => (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, x: -100 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`group relative backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 ${comment.isPinned
                          ? 'bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-cyan-400/50 shadow-lg shadow-cyan-500/10'
                          : 'dark:bg-slate-800/50 bg-white border-slate-200 dark:border-slate-700/30 hover:border-cyan-400/30 shadow-sm'
                          }`}
                      >
                        {/* 📌 Pin Indicator */}
                        {comment.isPinned && (
                          <div className="absolute top-3 right-3 flex items-center gap-2 bg-cyan-500/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-cyan-400/30">
                            <FaThumbtack className="w-4 h-4 text-cyan-400" />
                            <span className="text-xs font-semibold text-cyan-300">Pinned</span>
                          </div>
                        )}

                        <div className="flex gap-4">
                          <img
                            src={comment.photo}
                            alt={comment.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-slate-600"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h5 className="font-semibold dark:text-white text-slate-900">{comment.name}</h5>
                                <p className="text-xs dark:text-slate-400 text-slate-500">
                                  {new Date(comment.timestamp).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </p>
                              </div>
                            </div>
                            <p className="dark:text-slate-300 text-slate-600 mt-2 leading-relaxed">{comment.message}</p>
                            <div className="flex items-center gap-4 mt-4">
                              <button
                                onClick={() => handleLikeComment(comment.id)}
                                className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors duration-300 group/like"
                              >
                                <FaHeart className="group-hover/like:scale-110 transition-transform duration-300" />
                                <span className="text-sm">{comment.likes}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {comments.length === 0 && (
                    <div className="text-center py-12 text-slate-400">
                      <FaComment className="text-4xl mx-auto mb-4 opacity-50" />
                      <p>No comments yet. Be the first to leave one!</p>
                    </div>
                  )}
                </div>

                {/* ✨ Gradient Fade Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t dark:from-[#0f172a] from-zinc-50 via-zinc-50/60 dark:via-[#0f172a]/60 to-transparent pointer-events-none z-10 rounded-b-2xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>



      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #10b981);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0891b2, #059669);
        }
      `}</style>
    </section>
  );
};

export default Contact;