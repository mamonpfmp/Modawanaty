import { BarChart3, TrendingUp, Users, Clock } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import VisitChart from '../components/VisitChart';
import { useArticles } from '../hooks/useArticles';

export default function Analytics() {
  const { articles, stats } = useArticles();

  const avgReadTime = articles.length > 0
    ? Math.round(articles.reduce((sum, a) => sum + a.read_time, 0) / articles.length)
    : 0;

  const topArticles = [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-800">التحليلات</h1>
        <p className="text-sm text-gray-400 mt-1">نظرة شاملة على أداء المدونة</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="إجمالي الزيارات"
          value={stats.totalVisits >= 1000 ? `${(stats.totalVisits / 1000).toFixed(1)} ألف` : String(stats.totalVisits)}
          subtitle="منذ البداية"
          change="+12.4%"
          icon={BarChart3}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatsCard
          label="معدل النمو"
          value="+18%"
          subtitle="مقارنة بالشهر الماضي"
          icon={TrendingUp}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
        <StatsCard
          label="الزوار الفريدون"
          value="4.2 ألف"
          subtitle="هذا الشهر"
          icon={Users}
          iconColor="text-violet-600"
          iconBg="bg-violet-50"
        />
        <StatsCard
          label="متوسط وقت القراءة"
          value={`${avgReadTime} دقائق`}
          subtitle="لكل مقال"
          icon={Clock}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
      </div>

      {/* Chart */}
      <VisitChart />

      {/* Top Articles */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="text-base font-bold text-gray-800 mb-4">المقالات الأكثر مشاهدة</h3>
        <div className="space-y-3">
          {topArticles.map((article, i) => (
            <div key={article.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 text-sm font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-700 truncate">{article.title}</p>
                <p className="text-xs text-gray-400">{article.category}</p>
              </div>
              <span className="text-sm font-bold text-gray-600">
                {article.views >= 1000
                  ? `${(article.views / 1000).toFixed(1)} ألف`
                  : article.views}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
