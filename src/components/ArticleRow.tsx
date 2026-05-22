import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, Eye, Calendar, Clock, Pencil, Trash2 } from 'lucide-react';

interface ArticleRowProps {
  id: string;
  title: string;
  views: number;
  date: string | null;
  readTime: number;
  category: string;
  status: 'published' | 'draft' | 'scheduled';
  onDelete: (id: string) => void;
}

const statusConfig = {
  published: { label: 'منشور', color: 'text-green-600 bg-green-50', dot: 'bg-green-500' },
  draft: { label: 'مسودة', color: 'text-amber-600 bg-amber-50', dot: 'bg-amber-500' },
  scheduled: { label: 'مجدول', color: 'text-blue-600 bg-blue-50', dot: 'bg-blue-500' },
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
}

function formatViews(n: number): string {
  if (n >= 1000) return new Intl.NumberFormat('ar-SA').format(n);
  return String(n);
}

export default function ArticleRow({ id, title, views, date, readTime, category, status, onDelete }: ArticleRowProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const cfg = statusConfig[status];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 card-hover">
      <div className="flex items-start gap-4">
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-gray-800 mb-2 leading-relaxed">{title}</h3>
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Eye size={13} />
              {formatViews(views)}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              {formatDate(date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} />
              {readTime} دقائق قراءة
            </span>
          </div>
        </div>

        {/* Category */}
        <span className="hidden sm:inline-block text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full whitespace-nowrap">
          {category}
        </span>

        {/* Status */}
        <span className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap ${cfg.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </span>

        {/* Actions */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-gray-50 text-gray-400"
          >
            <MoreHorizontal size={16} />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute left-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20 min-w-[120px]">
                <button
                  onClick={() => { setMenuOpen(false); navigate(`/articles/${id}/edit`); }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
                >
                  <Pencil size={14} />
                  تعديل
                </button>
                <button
                  onClick={() => { setMenuOpen(false); onDelete(id); }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={14} />
                  حذف
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
