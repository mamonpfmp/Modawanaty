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
    <div className="bg-white rounded-2xl p-5 border border-gray-100 card-hover">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
          <Icon size={20} className={iconColor} />
        </div>
        {change && (
          <span className="text-xs font-semibold text-green-500 bg-green-50 px-2 py-1 rounded-full">
            {change}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-extrabold text-gray-800 mb-1">{value}</h3>
      <p className="text-sm text-gray-400 mb-2">{subtitle}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-gray-700">{label}</span>
        {badge && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
