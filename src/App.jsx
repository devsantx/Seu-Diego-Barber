import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Intro       from "./components/Intro";
import Navbar      from "./components/Navbar";
import Hero        from "./components/Hero";
import About       from "./components/About";
import Plans       from "./components/Plans";
import Agendamento from "./components/Agendamento";
import Team        from "./components/Team";
import Location    from "./components/Location";
import FAQ         from "./components/FAQ";
import Footer      from "./components/Footer";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowIntro(false), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showIntro) {
      const t = setTimeout(() => setPageReady(true), 100);
      return () => clearTimeout(t);
    }
  }, [showIntro]);

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div key="intro" className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ background: "#050505" }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
            <Intro />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {pageReady && (
          <motion.div key="site" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <Navbar />
            <main>
              <Hero />
              <About />
              <Plans />
              <Agendamento />
              <Team />
              <Location />
              <FAQ />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
