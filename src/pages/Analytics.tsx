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
        <h1 className="text-xl sm:text-2xl font-extrabold text-white">التحليلات</h1>
        <p className="text-xs text-navy-300 mt-1">نظرة شاملة على أداء المدونة</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatsCard
          label="إجمالي الزيارات"
          value={stats.totalVisits >= 1000 ? `${(stats.totalVisits / 1000).toFixed(1)}K` : String(stats.totalVisits)}
          subtitle="منذ البداية"
          change="+12.4%"
          icon={BarChart3}
          iconColor="text-navy-500"
          iconBg="bg-navy-500/10"
        />
        <StatsCard
          label="معدل النمو"
          value="+18%"
          subtitle="مقارنة بالشهر الماضي"
          icon={TrendingUp}
          iconColor="text-teal-500"
          iconBg="bg-teal-500/10"
        />
        <StatsCard
          label="الزوار الفريدون"
          value="4.2K"
          subtitle="هذا الشهر"
          icon={Users}
          iconColor="text-purple-400"
          iconBg="bg-purple-400/10"
        />
        <StatsCard
          label="متوسط وقت القراءة"
          value={`${avgReadTime} د`}
          subtitle="لكل مقال"
          icon={Clock}
          iconColor="text-amber-400"
          iconBg="bg-amber-400/10"
        />
      </div>

      {/* Chart */}
      <VisitChart />

      {/* Top Articles */}
      <div className="glass-card rounded-2xl p-5">
        <h3 className="text-base font-bold text-white mb-4">المقالات الأكثر مشاهدة</h3>
        <div className="space-y-2">
          {topArticles.map((article, i) => (
            <div key={article.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-navy-50 transition-colors">
              <span className="w-8 h-8 rounded-full bg-navy-500/15 text-navy-500 text-sm font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{article.title}</p>
                <p className="text-[10px] text-navy-300">{article.category}</p>
              </div>
              <span className="text-sm font-bold text-teal-400">
                {article.views >= 1000 ? `${(article.views / 1000).toFixed(1)}K` : article.views}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
