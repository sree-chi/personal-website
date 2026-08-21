const SectionHeader = ({ icon, title }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="p-2 bg-slate-800 rounded-lg">{icon}</div>
    <h2 className="text-2xl font-bold text-slate-100">{title}</h2>
  </div>
);

export default SectionHeader;
