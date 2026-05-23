import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FileText, FolderOpen, BarChart3, Settings, LogOut, Plus,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const navItems = [
  { icon: LayoutDashboard, label: 'الرئيسية', path: '/' },
  { icon: FileText, label: 'المقالات', path: '/articles' },
  { icon: FolderOpen, label: 'التصنيفات', path: '/categories' },
  { icon: BarChart3, label: 'التحليلات', path: '/analytics' },
  { icon: Settings, label: 'الإعدادات', path: '/settings' },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  return (
    <aside className="fixed right-0 top-0 h-full w-64 bg-navy-950 border-l border-navy-50 flex flex-col z-40">
      {/* Logo */}
      <div className="p-5 flex items-center justify-center">
        <img src="/logo.png" alt="Modawnty" className="h-16 object-contain" />
      </div>

      <div className="h-px bg-navy-50 mx-4" />

      {/* New article button */}
      <div className="p-4">
        <button
          onClick={() => navigate('/articles/new')}
          className="w-full flex items-center justify-center gap-2 py-2.5 accent-gradient text-white rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          مقال جديد
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(item => {
          const active = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-navy-500/15 text-teal-500'
                  : 'text-navy-300 hover:bg-navy-50 hover:text-white'
              }`}
            >
              <item.icon size={18} strokeWidth={active ? 2.5 : 1.5} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-navy-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full accent-gradient flex items-center justify-center text-white text-sm font-bold">
            {user?.email?.[0]?.toUpperCase() || 'م'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {user?.user_metadata?.full_name || 'المدوّن'}
            </p>
            <p className="text-[10px] text-navy-300 truncate">{user?.email || 'user@example.com'}</p>
          </div>
          <button
            onClick={signOut}
            className="p-2 rounded-lg hover:bg-navy-50 text-navy-300 hover:text-red-400 transition-colors"
            title="تسجيل الخروج"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
