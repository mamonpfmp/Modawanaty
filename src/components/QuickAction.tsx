import { LucideIcon } from 'lucide-react';

interface Props {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export default function QuickAction({ label, icon: Icon, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 glass-card rounded-2xl card-hover hover:border-navy-500/30 transition-all group"
    >
      <div className="w-11 h-11 rounded-xl bg-navy-500/10 flex items-center justify-center group-hover:bg-navy-500/20 transition-colors">
        <Icon size={20} className="text-navy-500" />
      </div>
      <span className="text-xs font-semibold text-navy-300 group-hover:text-white transition-colors">{label}</span>
    </button>
  );
}
