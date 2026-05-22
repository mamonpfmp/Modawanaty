import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string;
  subtitle: string;
  badge?: string;
  badgeColor?: string;
  change?: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
}

export default function StatsCard({ label, value, subtitle, badge, badgeColor, change, icon: Icon, iconColor, iconBg }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-navy-50/30 card-hover">
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl ${iconBg} flex items-center justify-center`}>
          <Icon size={17} className={iconColor} />
        </div>
        {change && (
          <span className="text-[10px] sm:text-xs font-semibold text-teal-600 bg-teal-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
            {change}
          </span>
        )}
      </div>
      <h3 className="text-lg sm:text-2xl font-extrabold text-navy-900 mb-0.5 sm:mb-1">{value}</h3>
      <p className="text-[10px] sm:text-sm text-navy-300 mb-1 sm:mb-2">{subtitle}</p>
      <div className="flex items-center justify-between">
        <span className="text-[10px] sm:text-xs font-bold text-navy-700 leading-tight">{label}</span>
        {badge && (
          <span className={`text-[9px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-full ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
