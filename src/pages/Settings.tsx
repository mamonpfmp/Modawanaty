import { useState } from 'react';
import { Save, Globe, Palette, Database } from 'lucide-react';

export default function Settings() {
  const [blogName, setBlogName] = useState('مدونتي');
  const [blogDesc, setBlogDesc] = useState('مدونة شخصية للكتابة والتدوين');
  const [authorName, setAuthorName] = useState('المدوّن');
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-800">الإعدادات</h1>
        <p className="text-sm text-gray-400 mt-1">إعدادات المدونة والاتصال بقاعدة البيانات</p>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
            <Globe size={18} className="text-blue-500" />
          </div>
          <h3 className="text-base font-bold text-gray-800">إعدادات عامة</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">اسم المدونة</label>
          <input
            type="text"
            value={blogName}
            onChange={e => setBlogName(e.target.value)}
            className="w-full bg-gray-50 rounded-xl px-4 py-2.5 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">وصف المدونة</label>
          <textarea
            value={blogDesc}
            onChange={e => setBlogDesc(e.target.value)}
            rows={3}
            className="w-full bg-gray-50 rounded-xl px-4 py-2.5 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">اسم الكاتب</label>
          <input
            type="text"
            value={authorName}
            onChange={e => setAuthorName(e.target.value)}
            className="w-full bg-gray-50 rounded-xl px-4 py-2.5 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Database Settings */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
            <Database size={18} className="text-emerald-500" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-800">قاعدة البيانات (Supabase)</h3>
            <p className="text-xs text-gray-400">اختياري — للحفظ الدائم للمقالات</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">Supabase URL</label>
          <input
            type="text"
            placeholder="https://xxxxx.supabase.co"
            value={supabaseUrl}
            onChange={e => setSupabaseUrl(e.target.value)}
            className="w-full bg-gray-50 rounded-xl px-4 py-2.5 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-100 placeholder-gray-300 font-mono"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">Supabase Anon Key</label>
          <input
            type="password"
            placeholder="eyJhbGciOi..."
            value={supabaseKey}
            onChange={e => setSupabaseKey(e.target.value)}
            className="w-full bg-gray-50 rounded-xl px-4 py-2.5 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-100 placeholder-gray-300 font-mono"
            dir="ltr"
          />
        </div>

        <p className="text-xs text-gray-400 bg-blue-50 p-3 rounded-xl">
          💡 بدون Supabase، المقالات ستُحفظ مؤقتاً في المتصفح فقط. للحفظ الدائم، أنشئ مشروع Supabase مجاني وأضف البيانات هنا.
        </p>
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors"
      >
        <Save size={16} />
        {saved ? '✓ تم الحفظ' : 'حفظ الإعدادات'}
      </button>
    </div>
  );
}
