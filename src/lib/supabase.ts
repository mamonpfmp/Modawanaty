import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://fdylravbvqiesthfflwi.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkeWxyYXZidnFpZXN0aGZmbHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0NDMyNTUsImV4cCI6MjA5NTAxOTI1NX0.nmu6eHu0Q6ecP2au8Dwk7ROIUJ-lMZ9xZKT0TPYRuOo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export const isSupabaseConfigured = true;

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
  if (!isConfigured) return [];
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error('Error fetching articles:', error); return []; }
  return data || [];
}

// Create article
export async function createArticle(article: Partial<Article>): Promise<Article | null> {
  if (!isConfigured) return null;
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
  if (!isConfigured) return null;
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
  if (!isConfigured) return false;
  const { error } = await supabase.from('articles').delete().eq('id', id);
  if (error) { console.error('Error deleting article:', error); return false; }
  return true;
}

// Fetch categories
export async function fetchCategories(): Promise<Category[]> {
  if (!isConfigured) return [];
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  if (error) { console.error('Error fetching categories:', error); return []; }
  return data || [];
}
