import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Articles from './pages/Articles';
import ArticleEditor from './pages/ArticleEditor';
import Categories from './pages/Categories';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f6f8] flex items-center justify-center" dir="rtl">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" />
          <p className="text-sm text-gray-400 font-medium">جارٍ التحميل...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route path="/" element={<Dashboard />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/new" element={<ArticleEditor />} />
          <Route path="/articles/:id/edit" element={<ArticleEditor />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
