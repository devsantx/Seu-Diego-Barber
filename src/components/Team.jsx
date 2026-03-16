import { motion } from "framer-motion";
import { teamMembers } from "../data/team";

const ScissorsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
    <line x1="20" y1="4" x2="8.12" y2="15.88"/>
    <line x1="14.47" y1="14.48" x2="20" y2="20"/>
    <line x1="8.12" y1="8.12" x2="12" y2="12"/>
  </svg>
);

function TeamCard({ member, index }) {
  return (
    <motion.div
      className="card-bg transition-all duration-300 group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
    >
      <div className="p-5 flex gap-4 items-start">
        <div
          className="flex-shrink-0 w-20 h-24 sm:w-24 sm:h-28 flex items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1e1e1e, #2a2a2a)",
            border: "1px solid rgba(201,162,74,0.15)",
          }}
        >
          {member.photo ? (
            <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-2 opacity-30">
              <span style={{ color: "#C9A24A" }}><ScissorsIcon /></span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="w-5 h-[2px] mb-3"
            style={{ background: "linear-gradient(90deg, #8E6B2C, #EAD38F)" }}
          />
          <h3 className="text-xs font-bold tracking-widest mb-0.5"
            style={{ fontFamily: "Cinzel, serif", color: "#C9A24A" }}>
            {member.name}
          </h3>
          <p className="text-[10px] tracking-wider mb-2"
            style={{ color: "#8E6B2C", fontFamily: "Raleway, sans-serif" }}>
            {member.role}
          </p>
          <p className="text-[11px] leading-relaxed"
            style={{ color: "#9A9A9A", fontFamily: "Raleway, sans-serif" }}>
            {member.bio}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Team() {
  return (
    <section
      id="equipe"
      className="relative py-24 sm:py-32"
      style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #131313 50%, #0a0a0a 100%)" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[10px] tracking-[0.35em] mb-3"
            style={{ color: "#8E6B2C", fontFamily: "Raleway, sans-serif" }}>
            — OS PROFISSIONAIS —
          </p>
          <h2 className="text-xl sm:text-2xl font-bold tracking-widest"
            style={{ fontFamily: "Cinzel, serif", color: "#E5E5E5" }}>
            CONHEÇA NOSSA EQUIPE
          </h2>
          <div className="mt-4 w-16 h-[1px]"
            style={{ background: "linear-gradient(90deg, #C9A24A, transparent)" }}
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {teamMembers.map((member, i) => {
            const isLastOdd = teamMembers.length % 2 !== 0 && i === teamMembers.length - 1;
            return (
              <div key={member.id} className={isLastOdd ? "sm:col-span-2 sm:max-w-md sm:mx-auto sm:w-full" : ""}>
                <TeamCard member={member} index={i} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="section-divider mt-20 mx-auto max-w-xs" />
    </section>
  );
}
