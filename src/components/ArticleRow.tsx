import { Link } from 'react-router-dom';
import { Eye, Clock, Calendar } from 'lucide-react';
import type { Article } from '../data/articles';

// Card-style article (modonty look)
export default function ArticleCard({ article }: { article: Article }) {
  const statusColors: Record<string, string> = {
    published: 'bg-teal-500/15 text-teal-400',
    draft: 'bg-navy-500/15 text-navy-400',
    scheduled: 'bg-amber-500/15 text-amber-400',
  };
  const statusLabels: Record<string, string> = {
    published: 'منشور',
    draft: 'مسودة',
    scheduled: 'مجدول',
  };

  // Generate a placeholder gradient for articles without images
  const gradients = [
    'from-navy-500/40 to-teal-500/30',
    'from-navy-800 to-navy-500/40',
    'from-teal-600/30 to-navy-700',
    'from-navy-500/30 to-purple-600/20',
  ];
  const gradientIdx = article.title.length % gradients.length;
  const hasCover = !!article.cover_image;

  return (
    <Link to={`/articles/${article.id}/edit`} className="block">
      <div className="glass-card rounded-2xl overflow-hidden card-hover group">
        {/* Image area */}
        <div className={`h-40 sm:h-48 relative ${!hasCover ? `bg-gradient-to-br ${gradients[gradientIdx]}` : ''}`}>
          {hasCover ? (
            <img
              src={article.cover_image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-navy-900/20" />
          )}
          <div className="absolute top-3 right-3">
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${statusColors[article.status]}`}>
              {statusLabels[article.status]}
            </span>
          </div>
          <div className="absolute bottom-3 right-3 left-3">
            <span className="text-[10px] font-medium text-teal-400 bg-navy-900/60 px-2 py-0.5 rounded-full">
              {article.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Author row */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full accent-gradient flex items-center justify-center text-white text-[9px] font-bold">
              م
            </div>
            <span className="text-[11px] text-navy-300">المدوّن</span>
            <span className="text-navy-200 text-[10px]">·</span>
            <div className="flex items-center gap-1 text-[10px] text-navy-200">
              <Calendar size={10} />
              {article.published_at
                ? new Date(article.published_at).toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' })
                : 'غير منشور'
              }
            </div>
            <div className="flex items-center gap-1 text-[10px] text-navy-200">
              <Clock size={10} />
              {article.read_time} د
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-white group-hover:text-teal-400 transition-colors line-clamp-2 mb-1.5">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs text-navy-300 line-clamp-2 leading-relaxed mb-3">
            {article.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-[10px] text-navy-200">
              <Eye size={12} />
              {article.views >= 1000 ? `${(article.views / 1000).toFixed(1)}K` : article.views}
            </div>
            <span className="text-[11px] font-semibold text-navy-500 group-hover:text-teal-500 transition-colors">
              تعديل ←
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
