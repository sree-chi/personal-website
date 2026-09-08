const SectionHeader = ({ icon, title }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="p-2 rounded-lg" style={{ background: '#1a1a35' }}>{icon}</div>
    <h2 className="text-2xl font-bold text-[#f0ede8]">{title}</h2>
  </div>
);

export default SectionHeader;
