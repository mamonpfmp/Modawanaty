import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import ArticleCard from '../components/ArticleRow';
import { useArticles } from '../hooks/useArticles';

export default function Articles() {
  const navigate = useNavigate();
  const { articles, categories } = useArticles();
  const [filter, setFilter] = useState('الكل');
  const [search, setSearch] = useState('');

  const allCats = ['الكل', ...categories.map(c => c.name)];

  const filtered = articles.filter(a => {
    const matchCat = filter === 'الكل' || a.category === filter;
    const matchSearch = !search || a.title.includes(search) || a.excerpt.includes(search);
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">المقالات</h1>
          <p className="text-xs text-navy-300 mt-0.5">{articles.length} مقال</p>
        </div>
        <button
          onClick={() => navigate('/articles/new')}
          className="flex items-center gap-2 px-4 py-2.5 accent-gradient text-white rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">مقال جديد</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-300" />
        <input
          type="text"
          placeholder="ابحث في المقالات..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full glass-card rounded-xl pr-10 pl-4 py-2.5 text-sm text-white placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-navy-500/30"
        />
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {allCats.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filter === cat
                ? 'accent-gradient text-white'
                : 'glass-card text-navy-300 hover:text-white hover:border-navy-500/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-12 text-center">
          <p className="text-navy-300 text-sm">لا توجد مقالات</p>
        </div>
      )}
    </div>
  );
}
