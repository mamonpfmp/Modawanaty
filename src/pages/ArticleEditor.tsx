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
          <button onClick={() => navigate(-1)} className="p-1.5 sm:p-2 rounded-xl hover:bg-white transition-colors">
            <ArrowRight size={18} className="text-navy-400" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-navy-900">
              {isEditing ? 'تعديل المقال' : 'مقال جديد'}
            </h1>
            <p className="text-[10px] sm:text-xs text-navy-300">اكتب محتواك وانشره</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || !title.trim()}
          className="flex items-center gap-1.5 px-4 py-2 bg-navy-500 text-white rounded-full text-xs sm:text-sm font-semibold hover:bg-navy-600 transition-colors disabled:opacity-50"
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
        className="w-full text-lg sm:text-2xl font-bold bg-white rounded-xl sm:rounded-2xl border border-navy-50/30 px-4 sm:px-6 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-navy-100 placeholder-navy-200 text-navy-900"
      />

      {/* Meta */}
      <div className="flex flex-wrap gap-2">
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="bg-white rounded-xl border border-navy-50/30 px-3 py-2 text-xs sm:text-sm text-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-100"
        >
          <option value="">اختر تصنيفاً</option>
          {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          <option value="عام">عام</option>
        </select>

        <div className="flex items-center gap-0.5 bg-white rounded-xl border border-navy-50/30 px-0.5">
          {(['draft', 'published', 'scheduled'] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-colors ${
                status === s ? 'bg-navy-500/[0.07] text-navy-500' : 'text-navy-300 hover:text-navy-600'
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
        className="w-full bg-white rounded-xl sm:rounded-2xl border border-navy-50/30 px-4 sm:px-6 py-4 sm:py-5 text-sm leading-8 focus:outline-none focus:ring-2 focus:ring-navy-100 placeholder-navy-200 text-navy-900 resize-none"
      />

      <div className="flex items-center gap-3 text-[10px] sm:text-xs text-navy-300">
        <span>{wordCount} كلمة</span>
        <span>{Math.max(1, Math.ceil(wordCount / 200))} دقائق قراءة</span>
      </div>
    </div>
  );
}
