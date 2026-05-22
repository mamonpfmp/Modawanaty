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
        title,
        content,
        excerpt,
        category: category || 'عام',
        status,
        read_time: readTime,
        published_at: status === 'published' ? new Date().toISOString() : null,
      };

      if (isEditing) {
        await editArticle(id!, data);
      } else {
        await addArticle(data);
      }
      navigate('/articles');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-white transition-colors"
          >
            <ArrowRight size={20} className="text-gray-500" />
          </button>
          <div>
            <h1 className="text-xl font-extrabold text-gray-800">
              {isEditing ? 'تعديل المقال' : 'مقال جديد'}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">اكتب محتواك وانشره للعالم</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={saving || !title.trim()}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? 'جارٍ الحفظ...' : 'حفظ'}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="عنوان المقال..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full text-2xl font-bold bg-white rounded-2xl border border-gray-100 px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-100 placeholder-gray-300"
        />

        {/* Meta row */}
        <div className="flex flex-wrap gap-3">
          {/* Category */}
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="bg-white rounded-xl border border-gray-100 px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">اختر تصنيفاً</option>
            {categories.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
            <option value="عام">عام</option>
          </select>

          {/* Status */}
          <div className="flex items-center gap-1 bg-white rounded-xl border border-gray-100 px-1">
            {(['draft', 'published', 'scheduled'] as const).map(s => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  status === s ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {s === 'draft' && 'مسودة'}
                {s === 'published' && <><Eye size={13} /> نشر</>}
                {s === 'scheduled' && <><Calendar size={13} /> جدولة</>}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <textarea
          placeholder="اكتب محتوى المقال هنا..."
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={18}
          className="w-full bg-white rounded-2xl border border-gray-100 px-6 py-5 text-sm leading-8 focus:outline-none focus:ring-2 focus:ring-blue-100 placeholder-gray-300 resize-none"
        />

        {/* Word count */}
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span>{content.split(/\s+/).filter(Boolean).length} كلمة</span>
          <span>{Math.max(1, Math.ceil(content.split(/\s+/).filter(Boolean).length / 200))} دقائق قراءة</span>
        </div>
      </div>
    </div>
  );
}
