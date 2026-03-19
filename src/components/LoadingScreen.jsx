import { motion } from 'framer-motion'
import logoFull from '../assets/logo-full.svg'
import { COLORS, FONTS } from '../styles/theme'

export default function LoadingScreen({ onComplete }) {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        className="loading-logo"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src={logoFull} alt="Seu Diego Barber" width="180" />
      </motion.div>

      <motion.div
        className="loading-bar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="loading-bar-fill" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.5 }}
        style={{
          fontFamily: FONTS.title,
          fontSize: '0.65rem',
          letterSpacing: '0.3em',
          color: COLORS.gold,
          textTransform: 'uppercase',
        }}
      >
        Since 2017
      </motion.p>
    </motion.div>
  )
}
