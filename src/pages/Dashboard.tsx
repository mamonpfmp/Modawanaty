import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Eye, FileText, PenLine, Bell, Plus, CalendarPlus, FolderPlus, ImagePlus, Upload, Sparkles, Search, Filter } from 'lucide-react';
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">لوحة تحكم المدونة</h1>
          <p className="text-sm text-gray-400 mt-1">Minimal UI لإدارة المحتوى وتتبع الزيارات بسهولة.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2.5 bg-white rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
            <Bell size={18} className="text-gray-500" />
            <span className="absolute -top-1 -left-1 w-5 h-5 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
          </button>
          <button
            onClick={() => navigate('/articles/new')}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors"
          >
            <Plus size={16} />
            مقال جديد
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="إجمالي الزيارات"
          value={stats.totalVisits >= 1000 ? `${(stats.totalVisits / 1000).toFixed(1)} ألف` : String(stats.totalVisits)}
          subtitle="آخر 14 يوماً"
          change="+12.4%"
          icon={BarChart3}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatsCard
          label="مشاهدات المقالات"
          value={stats.totalViews >= 1000 ? `${(stats.totalViews / 1000).toFixed(1)} ألف` : String(stats.totalViews)}
          subtitle="لكل المقالات"
          change="+6.1%"
          icon={Eye}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatsCard
          label="مقالات منشورة"
          value={String(stats.publishedCount)}
          subtitle="جاهزة للقراءة"
          badge="نشط"
          badgeColor="text-green-600 bg-green-50"
          icon={FileText}
          iconColor="text-violet-600"
          iconBg="bg-violet-50"
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
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="text-base font-bold text-gray-800 mb-1">أزرار إدارة المحتوى</h3>
          <p className="text-xs text-gray-400 mb-4">إجراءات شائعة لتنظيم يومك.</p>
          <div className="grid grid-cols-2 gap-3">
            <QuickAction icon={CalendarPlus} title="جدولة مقال" description="اختر تاريخ نشر مناسب." />
            <QuickAction icon={FolderPlus} title="إضافة تصنيف" description="رتّب مقالاتك بسهولة." onClick={() => navigate('/categories')} />
            <QuickAction icon={ImagePlus} title="رفع صورة غلاف" description="تجميل المقال بصرياً." />
            <QuickAction icon={Upload} title="استيراد محتوى" description="من ملف أو منصة أخرى." />
          </div>
          <div className="mt-3 flex justify-center">
            <QuickAction icon={Sparkles} title="تحسين النص" description="تنسيق وتحسين سريع." />
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h3 className="text-base font-bold text-gray-800">قائمة المقالات</h3>
            <p className="text-xs text-gray-400 mt-1">إدارة سريعة للمحتوى — تعديل، حذف، وتتبع المشاهدات.</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Filter size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" />
              <input
                type="text"
                placeholder="ابحث عن مقال أو تصنيف"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pr-9 pl-3 py-2 bg-gray-50 rounded-xl text-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-100 placeholder-gray-300 w-[200px]"
              />
            </div>
            {(['all', 'published', 'draft', 'scheduled'] as StatusFilter[]).map(f => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`text-xs font-medium px-3 py-2 rounded-xl transition-colors ${
                  statusFilter === f
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                {{ all: 'الكل', published: 'منشور', draft: 'مسودة', scheduled: 'مجدول' }[f]}
              </button>
            ))}
          </div>
        </div>

        {/* Table header */}
        <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-2 text-xs font-semibold text-gray-400 mb-2">
          <span>العنوان</span>
          <span className="w-20 text-center">التصنيف</span>
          <span className="w-20 text-center">الحالة</span>
          <span className="w-10 text-center">إجراءات</span>
        </div>

        <div className="space-y-3">
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
            <div className="text-center py-12">
              <p className="text-gray-400 text-sm">لا توجد نتائج</p>
              <p className="text-gray-300 text-xs mt-1">حاول تغيير البحث أو تصفية الحالة.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
