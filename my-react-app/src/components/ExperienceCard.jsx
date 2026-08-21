const ExperienceCard = ({ role, company, date, description, skills }) => (
  <div className="relative pl-8 md:pl-0 border-l-2 border-slate-800 md:border-none">
    {/* Timeline dot for mobile */}
    <div className="absolute left-[-5px] top-0 w-3 h-3 rounded-full bg-cyan-500 md:hidden" />

    <div className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-8 hover:bg-slate-800/30 p-4 rounded-xl transition-colors -ml-4">
      <div className="text-slate-400 text-sm md:text-right font-medium pt-1 uppercase tracking-wider">
        {date}
      </div>
      <div>
        <h3 className="text-xl font-bold text-slate-100">{role}</h3>
        <div className="text-cyan-400 font-medium mb-3">{company}</div>
        <p className="text-slate-300 leading-relaxed mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill} className="px-3 py-1 bg-cyan-500/10 text-cyan-300 text-xs rounded-full border border-cyan-500/20">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ExperienceCard;
