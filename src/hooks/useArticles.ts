import { useState, useEffect, useCallback } from 'react';
import type { Article, Category } from '../lib/supabase';
import { supabase, fetchArticles, createArticle, updateArticle, deleteArticle, fetchCategories } from '../lib/supabase';
import { SAMPLE_ARTICLES, SAMPLE_CATEGORIES } from '../data/articles';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>(SAMPLE_ARTICLES);
  const [categories, setCategories] = useState<Category[]>(SAMPLE_CATEGORIES);
  const [loading, setLoading] = useState(false);
  const isConnected = !!supabase;

  const loadArticles = useCallback(async () => {
    if (!isConnected) {
      setArticles(SAMPLE_ARTICLES);
      setCategories(SAMPLE_CATEGORIES);
      return;
    }
    setLoading(true);
    try {
      const [arts, cats] = await Promise.all([fetchArticles(), fetchCategories()]);
      setArticles(arts.length > 0 ? arts : SAMPLE_ARTICLES);
      setCategories(cats.length > 0 ? cats : SAMPLE_CATEGORIES);
    } finally {
      setLoading(false);
    }
  }, [isConnected]);

  useEffect(() => { loadArticles(); }, [loadArticles]);

  const addArticle = async (article: Partial<Article>) => {
    if (isConnected) {
      const created = await createArticle(article);
      if (created) { await loadArticles(); return created; }
    } else {
      const newArticle: Article = {
        id: String(Date.now()),
        title: article.title || '',
        content: article.content || '',
        excerpt: article.excerpt || '',
        category: article.category || 'عام',
        status: article.status || 'draft',
        views: 0,
        read_time: article.read_time || 3,
        cover_image: article.cover_image || '',
        published_at: article.status === 'published' ? new Date().toISOString() : null,
        scheduled_at: article.scheduled_at || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setArticles(prev => [newArticle, ...prev]);
      return newArticle;
    }
    return null;
  };

  const editArticle = async (id: string, updates: Partial<Article>) => {
    if (isConnected) {
      const updated = await updateArticle(id, updates);
      if (updated) { await loadArticles(); return updated; }
    } else {
      setArticles(prev => prev.map(a => a.id === id ? { ...a, ...updates, updated_at: new Date().toISOString() } : a));
      return articles.find(a => a.id === id) || null;
    }
    return null;
  };

  const removeArticle = async (id: string) => {
    if (isConnected) {
      const ok = await deleteArticle(id);
      if (ok) await loadArticles();
      return ok;
    } else {
      setArticles(prev => prev.filter(a => a.id !== id));
      return true;
    }
  };

  // Stats
  const stats = {
    totalVisits: articles.reduce((sum, a) => sum + a.views, 0),
    totalViews: articles.reduce((sum, a) => sum + a.views, 0),
    publishedCount: articles.filter(a => a.status === 'published').length,
    draftCount: articles.filter(a => a.status === 'draft').length,
    scheduledCount: articles.filter(a => a.status === 'scheduled').length,
  };

  return { articles, categories, loading, stats, addArticle, editArticle, removeArticle, reload: loadArticles };
}
