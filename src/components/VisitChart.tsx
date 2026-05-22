import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { VISIT_DATA } from '../data/articles';

export default function VisitChart() {
  const total = VISIT_DATA.reduce((sum, d) => sum + d.visits, 0);
  const maxVisits = Math.max(...VISIT_DATA.map(d => d.visits));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-gray-800">إحصائيات الزيارات</h3>
          <p className="text-xs text-gray-400 mt-1">آخر 14 يوماً — نظرة سريعة على الأداء</p>
        </div>
        <span className="text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
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
              tick={{ fontSize: 12, fill: '#94a3b8' }}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: '#1e40af',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '12px',
                direction: 'rtl',
              }}
              formatter={(value: number) => [`${value.toLocaleString()} زيارة`, '']}
              labelStyle={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}
              cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
            />
            <Bar dataKey="visits" radius={[8, 8, 4, 4]} maxBarSize={40}>
              {VISIT_DATA.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.visits === maxVisits ? '#3b82f6' : '#e2e8f0'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
