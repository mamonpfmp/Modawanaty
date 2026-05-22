import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Save, Eye, Calendar } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';

export default function ArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { articles, categories, addArticle, editArticle } = useArticles();
  const isEditing = !!id;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled'>('draft');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const article = articles.find(a => a.id === id);
      if (article) {
        setTitle(article.title);
        setContent(article.content);
        setCategory(article.category);
        setStatus(article.status);
      }
    }
  }, [id, articles, isEditing]);

  const handleSave = async () => {
    if (!title.trim()) return;
    setSaving(true);
    try {
      const excerpt = content.substring(0, 150) + (content.length > 150 ? '...' : '');
      const readTime = Math.max(1, Math.ceil(content.split(/\s+/).length / 200));
      const data = {
        title, content, excerpt,
        category: category || 'عام',
        status,
        read_time: readTime,
        published_at: status === 'published' ? new Date().toISOString() : null,
      };
      if (isEditing) await editArticle(id!, data);
      else await addArticle(data);
      navigate('/articles');
    } finally { setSaving(false); }
  };

  const wordCount = content.split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-4 sm:space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <button onClick={() => navigate(-1)} className="p-1.5 sm:p-2 rounded-xl hover:bg-navy-50 transition-colors">
            <ArrowRight size={18} className="text-navy-300" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white">
              {isEditing ? 'تعديل المقال' : 'مقال جديد'}
            </h1>
            <p className="text-[10px] sm:text-xs text-navy-300">اكتب محتواك وانشره</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || !title.trim()}
          className="flex items-center gap-1.5 px-4 py-2 accent-gradient text-white rounded-xl text-xs sm:text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          <Save size={14} />
          {saving ? 'جارٍ...' : 'حفظ'}
        </button>
      </div>

      {/* Title */}
      <input
        type="text"
        placeholder="عنوان المقال..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full text-lg sm:text-2xl font-bold glass-card rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-white placeholder-navy-200 focus:outline-none focus:ring-2 focus:ring-navy-500/30"
      />

      {/* Meta */}
      <div className="flex flex-wrap gap-2">
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="glass-card rounded-xl px-3 py-2 text-xs sm:text-sm text-navy-300 focus:outline-none focus:ring-2 focus:ring-navy-500/30 bg-transparent"
        >
          <option value="">اختر تصنيفاً</option>
          {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          <option value="عام">عام</option>
        </select>

        <div className="flex items-center gap-0.5 glass-card rounded-xl px-0.5">
          {(['draft', 'published', 'scheduled'] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-colors ${
                status === s ? 'bg-navy-500/20 text-teal-400' : 'text-navy-300 hover:text-white'
              }`}
            >
              {s === 'draft' && 'مسودة'}
              {s === 'published' && <><Eye size={12} /> نشر</>}
              {s === 'scheduled' && <><Calendar size={12} /> جدولة</>}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <textarea
        placeholder="اكتب محتوى المقال هنا..."
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={14}
        className="w-full glass-card rounded-xl sm:rounded-2xl px-4 sm:px-6 py-4 sm:py-5 text-sm text-white leading-8 placeholder-navy-200 focus:outline-none focus:ring-2 focus:ring-navy-500/30 resize-none"
      />

      <div className="flex items-center gap-3 text-[10px] sm:text-xs text-navy-300">
        <span>{wordCount} كلمة</span>
        <span>{Math.max(1, Math.ceil(wordCount / 200))} دقائق قراءة</span>
      </div>
    </div>
  );
}
