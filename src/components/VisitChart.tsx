import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { VISIT_DATA } from '../data/articles';

export default function VisitChart() {
  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="text-base font-bold text-white mb-4">الزيارات الأسبوعية</h3>
      <div className="h-52 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={VISIT_DATA}>
            <defs>
              <linearGradient id="visitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2e2eff" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#2e2eff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#7878aa' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#7878aa' }} />
            <Tooltip
              contentStyle={{
                background: '#0f0f3d',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '12px',
                fontFamily: 'Tajawal',
              }}
              labelStyle={{ color: '#7878aa' }}
            />
            <Area
              type="monotone"
              dataKey="visits"
              stroke="#2e2eff"
              strokeWidth={2.5}
              fill="url(#visitGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
