import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import ArticleRow from '../components/ArticleRow';
import { useArticles } from '../hooks/useArticles';

type StatusFilter = 'all' | 'published' | 'draft' | 'scheduled';

export default function Articles() {
  const navigate = useNavigate();
  const { articles, removeArticle } = useArticles();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = articles.filter(a => {
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-800">المقالات</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">إدارة جميع مقالات المدونة</p>
        </div>
        <button
          onClick={() => navigate('/articles/new')}
          className="flex items-center gap-1.5 px-3 py-2 bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-blue-600 transition-colors self-start sm:self-auto"
        >
          <Plus size={15} />
          مقال جديد
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" />
          <input
            type="text"
            placeholder="ابحث عن مقال..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pr-9 pl-3 py-2 bg-white rounded-xl text-xs sm:text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-100 placeholder-gray-300"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {(['all', 'published', 'draft', 'scheduled'] as StatusFilter[]).map(f => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`text-[11px] sm:text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap flex-shrink-0 ${
                statusFilter === f ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'
              }`}
            >
              {{ all: 'الكل', published: 'منشور', draft: 'مسودة', scheduled: 'مجدول' }[f]}
            </button>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div className="space-y-2.5">
        {filtered.length > 0 ? (
          filtered.map(article => (
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
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <p className="text-gray-400 text-sm">لا توجد مقالات</p>
            <button onClick={() => navigate('/articles/new')} className="mt-2 text-blue-500 text-sm font-medium hover:underline">
              أضف مقالاً جديداً
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
