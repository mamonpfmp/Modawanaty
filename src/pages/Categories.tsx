import { useState } from 'react';
import { FolderOpen, Plus, Trash2 } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';

export default function Categories() {
  const { articles, categories } = useArticles();
  const [newCat, setNewCat] = useState('');

  const catCounts: Record<string, number> = {};
  articles.forEach(a => {
    catCounts[a.category] = (catCounts[a.category] || 0) + 1;
  });

  const allCats = Array.from(new Set([
    ...categories.map(c => c.name),
    ...Object.keys(catCounts),
  ]));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-white">التصنيفات</h1>
        <p className="text-xs text-navy-300 mt-1">تنظيم المقالات حسب الموضوع</p>
      </div>

      {/* Add new category */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="اسم التصنيف الجديد..."
          value={newCat}
          onChange={e => setNewCat(e.target.value)}
          className="flex-1 max-w-sm glass-card rounded-xl px-4 py-2.5 text-sm text-white placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-navy-500/30"
        />
        <button
          onClick={() => { if (newCat.trim()) setNewCat(''); }}
          className="flex items-center gap-2 px-4 py-2.5 accent-gradient text-white rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          إضافة
        </button>
      </div>

      {/* Categories grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allCats.map(name => (
          <div key={name} className="glass-card rounded-2xl p-5 card-hover">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-navy-500/10 flex items-center justify-center">
                  <FolderOpen size={20} className="text-navy-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{name}</h3>
                  <p className="text-xs text-navy-300">{catCounts[name] || 0} مقال</p>
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-red-500/10 text-navy-300 hover:text-red-400 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
