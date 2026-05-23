import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Save, Eye, Calendar, ImagePlus, X, Upload } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';
import { uploadImage } from '../lib/supabase';

export default function ArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { articles, categories, addArticle, editArticle } = useArticles();
  const isEditing = !!id;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled'>('draft');
  const [coverImage, setCoverImage] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      const article = articles.find(a => a.id === id);
      if (article) {
        setTitle(article.title);
        setContent(article.content);
        setCategory(article.category);
        setStatus(article.status);
        setCoverImage(article.cover_image || '');
      }
    }
  }, [id, articles, isEditing]);

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('حجم الصورة يجب أن يكون أقل من 5 ميجابايت');
      return;
    }

    setUploading(true);
    try {
      const url = await uploadImage(file);
      if (url) {
        setCoverImage(url);
      } else {
        // Fallback: use local URL preview if Supabase storage isn't set up
        const localUrl = URL.createObjectURL(file);
        setCoverImage(localUrl);
      }
    } catch (err) {
      console.error('Upload error:', err);
      // Fallback to local preview
      const localUrl = URL.createObjectURL(file);
      setCoverImage(localUrl);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

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
        cover_image: coverImage,
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

      {/* Cover Image Upload */}
      <div>
        <label className="block text-sm font-semibold text-white mb-2">صورة الغلاف</label>
        {coverImage ? (
          <div className="relative rounded-2xl overflow-hidden group">
            <img
              src={coverImage}
              alt="غلاف المقال"
              className="w-full h-48 sm:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-navy-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-navy-800/90 rounded-xl text-sm text-white hover:bg-navy-700 transition-colors"
              >
                <Upload size={16} />
                تغيير
              </button>
              <button
                onClick={() => setCoverImage('')}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-xl text-sm text-red-400 hover:bg-red-500/30 transition-colors"
              >
                <X size={16} />
                حذف
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            className={`flex flex-col items-center justify-center gap-3 h-48 sm:h-56 glass-card rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
              dragActive
                ? 'border-teal-500 bg-teal-500/5'
                : 'border-navy-50 hover:border-navy-500/40 hover:bg-navy-800/30'
            }`}
          >
            {uploading ? (
              <>
                <div className="w-10 h-10 border-3 border-teal-200 border-t-teal-500 rounded-full animate-spin" />
                <p className="text-sm text-navy-300">جارٍ رفع الصورة...</p>
              </>
            ) : (
              <>
                <div className="w-14 h-14 rounded-2xl bg-navy-500/10 flex items-center justify-center">
                  <ImagePlus size={24} className="text-navy-500" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-navy-300">اضغط لرفع صورة أو اسحبها هنا</p>
                  <p className="text-[10px] text-navy-200 mt-1">PNG, JPG, WEBP — حد أقصى 5 ميجابايت</p>
                </div>
              </>
            )}
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
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
