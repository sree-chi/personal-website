const ClubCard = ({ name, role, date, description, bullets = [], onHoverChange }) => (
  <div
    className="p-6 rounded-xl border transition-colors cursor-default"
    style={{ background: '#111128', borderColor: '#2a2a4a' }}
    onMouseEnter={() => onHoverChange?.({ title: name, subtitle: role, bullets })}
    onMouseLeave={() => onHoverChange?.(null)}
    onFocus={() => onHoverChange?.({ title: name, subtitle: role, bullets })}
    onBlur={() => onHoverChange?.(null)}
  >
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-xl font-bold text-[#f0ede8]">{name}</h3>
      <span className="text-sm text-[#8b8aaa] ml-4 flex-shrink-0">{date}</span>
    </div>
    <p className="text-amber-400 text-sm font-medium mb-3">{role}</p>
    <p className="text-[#a8a4c0] leading-relaxed">{description}</p>
  </div>
);

export default ClubCard;
