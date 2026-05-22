import { LucideIcon } from 'lucide-react';

interface QuickActionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
}

export default function QuickAction({ icon: Icon, title, description, onClick }: QuickActionProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 p-3 sm:p-4 bg-surface rounded-xl hover:bg-navy-50/50 transition-colors text-center"
    >
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-navy-500/[0.07] flex items-center justify-center">
        <Icon size={17} className="text-navy-500" />
      </div>
      <span className="text-[10px] sm:text-xs font-bold text-navy-900">{title}</span>
      <span className="text-[9px] sm:text-[11px] text-navy-300 leading-tight">{description}</span>
    </button>
  );
}
