import { useNavigate } from 'react-router-dom';
import { FileText, Eye, FolderOpen, TrendingUp, Plus, BarChart3, Settings } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import QuickAction from '../components/QuickAction';
import VisitChart from '../components/VisitChart';
import ArticleCard from '../components/ArticleRow';
import { useArticles } from '../hooks/useArticles';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const navigate = useNavigate();
  const { articles, stats } = useArticles();
  const { user } = useAuth();
  const recent = articles.slice(0, 4);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'صباح الخير';
    if (h < 18) return 'مساء الخير';
    return 'مساء النور';
  };

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="glass-card rounded-2xl p-5 sm:p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-40 bg-navy-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-1">
            <img src="/logo.png" alt="Modawnty" className="h-12 object-contain lg:hidden" />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">
            {greeting()} 👋
          </h1>
          <p className="text-sm text-navy-300 mt-1">
            مرحباً بك في مودونتي — منصة المحتوى العربي
          </p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[10px] font-medium text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full">
              جديد مودونتي
            </span>
            <span className="text-[10px] font-medium text-navy-300 bg-navy-50 px-3 py-1 rounded-full">
              مقالات اليوم
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatsCard
          label="إجمالي المقالات"
          value={String(stats.totalArticles)}
          change={`+${stats.publishedArticles}`}
          icon={FileText}
          iconColor="text-navy-500"
          iconBg="bg-navy-500/10"
        />
        <StatsCard
          label="المشاهدات"
          value={stats.totalVisits >= 1000 ? `${(stats.totalVisits / 1000).toFixed(1)}K` : String(stats.totalVisits)}
          change="+12.4%"
          icon={Eye}
          iconColor="text-teal-500"
          iconBg="bg-teal-500/10"
        />
        <StatsCard
          label="التصنيفات"
          value={String(stats.totalCategories)}
          icon={FolderOpen}
          iconColor="text-purple-400"
          iconBg="bg-purple-400/10"
        />
        <StatsCard
          label="معدل النمو"
          value="+18%"
          subtitle="مقارنة بالشهر الماضي"
          icon={TrendingUp}
          iconColor="text-amber-400"
          iconBg="bg-amber-400/10"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        <QuickAction label="مقال جديد" icon={Plus} onClick={() => navigate('/articles/new')} />
        <QuickAction label="المقالات" icon={FileText} onClick={() => navigate('/articles')} />
        <QuickAction label="التحليلات" icon={BarChart3} onClick={() => navigate('/analytics')} />
        <QuickAction label="الإعدادات" icon={Settings} onClick={() => navigate('/settings')} />
      </div>

      {/* Chart */}
      <VisitChart />

      {/* Recent Articles */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">أحدث المقالات</h2>
          <button
            onClick={() => navigate('/articles')}
            className="text-xs font-semibold text-navy-500 hover:text-teal-500 transition-colors"
          >
            عرض الكل ←
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recent.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
