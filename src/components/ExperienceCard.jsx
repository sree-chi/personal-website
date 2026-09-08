const ExperienceCard = ({ role, company, date, description, skills, bullets = [], onHoverChange }) => (
  <div
    className="relative pl-8 md:pl-0 border-l-2 border-[#2a2a4a] md:border-none"
    onMouseEnter={() => onHoverChange?.({ title: role, subtitle: company, bullets })}
    onMouseLeave={() => onHoverChange?.(null)}
  >
    {/* Timeline dot for mobile */}
    <div className="absolute left-[-5px] top-0 w-3 h-3 rounded-full bg-amber-400 md:hidden" />

    <div className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-8 hover:bg-[#1a1a35]/60 p-4 rounded-xl transition-colors -ml-4 cursor-default">
      <div className="text-[#8b8aaa] text-sm md:text-right font-medium pt-1 uppercase tracking-wider">
        {date}
      </div>
      <div>
        <h3 className="text-xl font-bold text-[#f0ede8]">{role}</h3>
        <div className="text-amber-400 font-medium mb-3">{company}</div>
        <p className="text-[#a8a4c0] leading-relaxed mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill} className="px-3 py-1 bg-amber-400/10 text-amber-300 text-xs rounded-full border border-amber-400/25">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ExperienceCard;
