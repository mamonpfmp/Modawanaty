import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, Eye, Calendar, Clock, Pencil, Trash2 } from 'lucide-react';

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
  published: { label: 'منشور', color: 'text-teal-700 bg-teal-50', dot: 'bg-teal-500' },
  draft: { label: 'مسودة', color: 'text-amber-600 bg-amber-50', dot: 'bg-amber-500' },
  scheduled: { label: 'مجدول', color: 'text-navy-500 bg-navy-50', dot: 'bg-navy-500' },
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
}

function formatViews(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default function ArticleRow({ id, title, views, date, readTime, category, status, onDelete }: ArticleRowProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const cfg = statusConfig[status];

  return (
    <div className="bg-surface/70 rounded-xl p-3 sm:p-4 hover:bg-surface transition-colors">
      <div className="flex items-start gap-3">
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xs sm:text-sm font-bold text-navy-900 mb-1.5 leading-relaxed line-clamp-2">{title}</h3>
          <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs text-navy-300">
            <span className="flex items-center gap-0.5">
              <Eye size={11} />
              {formatViews(views)}
            </span>
            <span className="flex items-center gap-0.5">
              <Calendar size={11} />
              {formatDate(date)}
            </span>
            <span className="hidden sm:flex items-center gap-0.5">
              <Clock size={11} />
              {readTime} د
            </span>
            <span className="bg-white px-1.5 py-0.5 rounded text-navy-400">{category}</span>
          </div>
        </div>

        {/* Status */}
        <span className={`flex items-center gap-1 text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${cfg.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </span>

        {/* Actions */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded-lg hover:bg-white text-navy-300"
          >
            <MoreVertical size={15} />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute left-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-navy-50/30 py-1 z-20 min-w-[100px]">
                <button
                  onClick={() => { setMenuOpen(false); navigate(`/articles/${id}/edit`); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-navy-700 hover:bg-surface"
                >
                  <Pencil size={13} />
                  تعديل
                </button>
                <button
                  onClick={() => { setMenuOpen(false); onDelete(id); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={13} />
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
