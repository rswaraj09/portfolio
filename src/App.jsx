import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Squares from './components/Squares';
import { NavbarProvider } from './contexts/NavbarContext';
import { useTheme } from './contexts/ThemeContext';
import FloatingThemeToggle from './components/FloatingThemeToggle';

// Pages
import Home from './pages/Home';
import Gallery from './pages/Gallery';

function App() {
  const { theme } = useTheme();
  const location = useLocation();

  // Dynamically hide the "Built with Spline" watermark logo from all possible structures (Shadow DOM, Canvas Siblings, global DOM)
  React.useEffect(() => {
    const injectAntiSplineStyles = (root) => {
      if (!root) return;
      try {
        if (root.querySelector && root.querySelector('#anti-spline-styles')) {
          return;
        }
        const style = document.createElement('style');
        style.id = 'anti-spline-styles';
        style.textContent = `
          a[href*="spline.design"],
          a[href*="spline.com"],
          a[href*="spline"],
          #logo,
          #logo-container,
          [class*="BuiltWithSpline"] {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none !important;
            width: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
          }
        `;
        if (root.appendChild) {
          root.appendChild(style);
        }
      } catch (e) {
        // Ignore injection errors
      }
    };

    const cleanSpline = (root = document) => {
      try {
        // 1. Inject styles into this root
        if (root === document) {
          if (document.head) {
            injectAntiSplineStyles(document.head);
          }
        } else {
          injectAntiSplineStyles(root);
        }

        // 2. Query and hide elements directly in this root as a fallback
        const targets = root.querySelectorAll('a[href*="spline"], #logo, #logo-container, [class*="BuiltWithSpline"]');
        targets.forEach(el => {
          try {
            el.style.setProperty('display', 'none', 'important');
            el.style.setProperty('opacity', '0', 'important');
            el.style.setProperty('visibility', 'hidden', 'important');
            el.style.setProperty('pointer-events', 'none', 'important');
          } catch (e) {}
        });

        // 3. Find leaf-like elements with text content containing "Built with Spline"
        const textElements = root.querySelectorAll('div, a, span, p');
        textElements.forEach(el => {
          try {
            if (el.textContent && el.textContent.includes('Built with Spline')) {
              // Only hide if it has no children or very few children, preventing hiding high-level layouts like #root
              if (!el.children || el.children.length <= 1) {
                el.style.setProperty('display', 'none', 'important');
                el.style.setProperty('opacity', '0', 'important');
                el.style.setProperty('visibility', 'hidden', 'important');
                el.style.setProperty('pointer-events', 'none', 'important');
              }
            }
          } catch (e) {}
        });

        // 4. Recursively traverse all child elements to find shadow roots
        const all = root.querySelectorAll('*');
        all.forEach(el => {
          try {
            if (el.shadowRoot) {
              cleanSpline(el.shadowRoot);
            }
          } catch (e) {}
        });
      } catch (globalErr) {
        // Ignore global traversal errors to prevent page crashing
      }
    };

    // Run periodically to catch dynamically loaded Spline scenes instantly
    const interval = setInterval(cleanSpline, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <NavbarProvider>
      <div className="relative min-h-screen dark:bg-[#060010] bg-slate-50 transition-colors duration-500 overflow-hidden">
        {/* Global Background Animation */}
        <div className="fixed inset-0 z-0">
          <Squares
            speed={0.2}
            squareSize={35}
            direction="diagonal"
            borderColor={theme === 'dark' ? "rgba(255, 255, 255, 0.03)" : "rgba(15, 23, 42, 0.05)"}
            hoverFillColor={theme === 'dark' ? "rgba(31, 137, 187, 0.53)" : "rgba(8, 145, 178, 0.1)"}
            gradientColorStart={theme === 'dark' ? "#000428" : "#f1f5f9"}
            gradientColorEnd={theme === 'dark' ? "#002545ff" : "#e2e8f0"}
          />
        </div>

        <Header />

        {/* Page Routing with Transitions */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </AnimatePresence>

        <FloatingThemeToggle />
      </div>
    </NavbarProvider>
  );
}

export default App;