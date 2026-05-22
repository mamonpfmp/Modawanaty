import { LucideIcon } from 'lucide-react';

interface Props {
  label: string;
  value: string;
  subtitle?: string;
  change?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
}

export default function StatsCard({ label, value, subtitle, change, icon: Icon, iconColor = 'text-teal-500', iconBg = 'bg-teal-500/10' }: Props) {
  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5 card-hover">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
          <Icon size={20} className={iconColor} />
        </div>
        {change && (
          <span className="text-[11px] font-bold text-teal-500 bg-teal-500/10 px-2 py-0.5 rounded-full">
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-extrabold text-white">{value}</p>
      <p className="text-xs text-navy-300 mt-0.5">{label}</p>
      {subtitle && <p className="text-[10px] text-navy-200 mt-0.5">{subtitle}</p>}
    </div>
  );
}
