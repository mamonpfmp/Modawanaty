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
      className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 card-hover text-center min-w-[130px]"
    >
      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
        <Icon size={20} className="text-blue-500" />
      </div>
      <span className="text-xs font-bold text-gray-700">{title}</span>
      <span className="text-[11px] text-gray-400 leading-relaxed">{description}</span>
    </button>
  );
}
