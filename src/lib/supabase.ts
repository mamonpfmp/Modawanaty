import { createClient } from '@supabase/supabase-js';

// Will be configured after user creates Supabase project
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || '';

export const supabase = SUPABASE_URL ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  status: 'published' | 'draft' | 'scheduled';
  views: number;
  read_time: number;
  cover_image: string;
  published_at: string | null;
  scheduled_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  article_count: number;
  created_at: string;
}

// Fetch all articles
export async function fetchArticles(): Promise<Article[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error('Error fetching articles:', error); return []; }
  return data || [];
}

// Create article
export async function createArticle(article: Partial<Article>): Promise<Article | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('articles')
    .insert([article])
    .select()
    .single();
  if (error) { console.error('Error creating article:', error); return null; }
  return data;
}

// Update article
export async function updateArticle(id: string, updates: Partial<Article>): Promise<Article | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('articles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) { console.error('Error updating article:', error); return null; }
  return data;
}

// Delete article
export async function deleteArticle(id: string): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase.from('articles').delete().eq('id', id);
  if (error) { console.error('Error deleting article:', error); return false; }
  return true;
}

// Fetch categories
export async function fetchCategories(): Promise<Category[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  if (error) { console.error('Error fetching categories:', error); return []; }
  return data || [];
}
