const ClubCard = ({ name, role, date, description }) => (
  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-xl font-bold text-slate-100">{name}</h3>
      <span className="text-sm text-slate-400">{date}</span>
    </div>
    <p className="text-cyan-400 text-sm font-medium mb-3">{role}</p>
    <p className="text-slate-300 leading-relaxed">{description}</p>
  </div>
);

export default ClubCard;
