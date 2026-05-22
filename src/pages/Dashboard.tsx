import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Eye, FileText, PenLine, Bell, Plus, CalendarPlus, FolderPlus, ImagePlus, Sparkles, Filter } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import VisitChart from '../components/VisitChart';
import QuickAction from '../components/QuickAction';
import ArticleRow from '../components/ArticleRow';
import { useArticles } from '../hooks/useArticles';

type StatusFilter = 'all' | 'published' | 'draft' | 'scheduled';

export default function Dashboard() {
  const navigate = useNavigate();
  const { articles, stats, removeArticle } = useArticles();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter(a => {
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    if (searchQuery && !a.title.includes(searchQuery) && !a.category.includes(searchQuery)) return false;
    return true;
  });

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المقال؟')) {
      await removeArticle(id);
    }
  };

  return (
    <div className="space-y-5 max-w-[1100px]">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-navy-900">لوحة تحكم المدونة</h1>
          <p className="text-xs sm:text-sm text-navy-300 mt-1">إدارة المحتوى وتتبع الزيارات بسهولة</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative p-2 bg-white rounded-xl border border-navy-50/30 hover:bg-surface transition-colors">
            <Bell size={18} className="text-navy-400" />
            <span className="absolute -top-1 -left-1 w-4 h-4 bg-teal-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">3</span>
          </button>
          <button
            onClick={() => navigate('/articles/new')}
            className="flex items-center gap-1.5 px-4 py-2 bg-navy-500 text-white rounded-full text-xs sm:text-sm font-semibold hover:bg-navy-600 transition-colors"
          >
            <Plus size={15} />
            مقال جديد
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatsCard
          label="إجمالي الزيارات"
          value={stats.totalVisits >= 1000 ? `${(stats.totalVisits / 1000).toFixed(1)} ألف` : String(stats.totalVisits)}
          subtitle="آخر 14 يوماً"
          change="+12.4%"
          icon={BarChart3}
          iconColor="text-navy-500"
          iconBg="bg-navy-500/[0.07]"
        />
        <StatsCard
          label="مشاهدات المقالات"
          value={stats.totalViews >= 1000 ? `${(stats.totalViews / 1000).toFixed(1)} ألف` : String(stats.totalViews)}
          subtitle="لكل المقالات"
          change="+6.1%"
          icon={Eye}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
        />
        <StatsCard
          label="مقالات منشورة"
          value={String(stats.publishedCount)}
          subtitle="جاهزة للقراءة"
          badge="نشط"
          badgeColor="text-teal-700 bg-teal-50"
          icon={FileText}
          iconColor="text-navy-500"
          iconBg="bg-navy-50"
        />
        <StatsCard
          label="مسودات"
          value={String(stats.draftCount)}
          subtitle="بحاجة لمراجعة"
          badge="قيد التحضير"
          badgeColor="text-amber-600 bg-amber-50"
          icon={PenLine}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
      </div>

      {/* Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <VisitChart />
        </div>
        <div className="bg-white rounded-2xl border border-navy-50/30 p-4 sm:p-5">
          <h3 className="text-sm sm:text-base font-bold text-navy-900 mb-1">أزرار إدارة المحتوى</h3>
          <p className="text-[11px] text-navy-300 mb-3">إجراءات شائعة لتنظيم يومك.</p>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <QuickAction icon={CalendarPlus} title="جدولة مقال" description="اختر تاريخ نشر" />
            <QuickAction icon={FolderPlus} title="إضافة تصنيف" description="رتّب مقالاتك" onClick={() => navigate('/categories')} />
            <QuickAction icon={ImagePlus} title="رفع صورة" description="غلاف المقال" />
            <QuickAction icon={Sparkles} title="تحسين النص" description="تنسيق سريع" />
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-2xl border border-navy-50/30 p-4 sm:p-5">
        <div className="flex flex-col gap-3 mb-4">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-navy-900">قائمة المقالات</h3>
            <p className="text-[11px] text-navy-300 mt-0.5">إدارة سريعة — تعديل، حذف، وتتبع المشاهدات</p>
          </div>

          {/* Filters row */}
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
            <div className="relative flex-shrink-0">
              <Filter size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-navy-200" />
              <input
                type="text"
                placeholder="بحث..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pr-8 pl-2 py-1.5 bg-surface rounded-lg text-xs border-0 focus:outline-none focus:ring-2 focus:ring-navy-100 placeholder-navy-200 w-[120px] sm:w-[180px]"
              />
            </div>
            {(['all', 'published', 'draft', 'scheduled'] as StatusFilter[]).map(f => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`text-[11px] sm:text-xs font-medium px-2.5 py-1.5 rounded-full transition-colors whitespace-nowrap flex-shrink-0 ${
                  statusFilter === f
                    ? 'bg-navy-500 text-white'
                    : 'bg-surface text-navy-400 hover:bg-navy-50'
                }`}
              >
                {{ all: 'الكل', published: 'منشور', draft: 'مسودة', scheduled: 'مجدول' }[f]}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2.5">
          {filteredArticles.length > 0 ? (
            filteredArticles.map(article => (
              <ArticleRow
                key={article.id}
                id={article.id}
                title={article.title}
                views={article.views}
                date={article.published_at || article.scheduled_at}
                readTime={article.read_time}
                category={article.category}
                status={article.status}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-navy-300 text-sm">لا توجد نتائج</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
