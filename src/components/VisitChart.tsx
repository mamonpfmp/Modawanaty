import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { VISIT_DATA } from '../data/articles';

export default function VisitChart() {
  const total = VISIT_DATA.reduce((sum, d) => sum + d.visits, 0);
  const maxVisits = Math.max(...VISIT_DATA.map(d => d.visits));

  return (
    <div className="bg-white rounded-2xl border border-navy-50/30 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-navy-900">إحصائيات الزيارات</h3>
          <p className="text-xs text-navy-300 mt-1">آخر 14 يوماً — نظرة سريعة على الأداء</p>
        </div>
        <span className="text-xs text-navy-400 bg-surface px-3 py-1.5 rounded-full">
          مجموع: {(total / 1000).toFixed(1)} ألف
        </span>
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={VISIT_DATA} barCategoryGap="20%">
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#a8a5eb' }}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: '#0d065b',
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                fontSize: '12px',
                direction: 'rtl',
              }}
              formatter={(value: number) => [`${value.toLocaleString()} زيارة`, '']}
              labelStyle={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}
              cursor={{ fill: 'rgba(46, 46, 255, 0.04)' }}
            />
            <Bar dataKey="visits" radius={[8, 8, 4, 4]} maxBarSize={40}>
              {VISIT_DATA.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.visits === maxVisits ? '#2e2eff' : '#eeedfa'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
