import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Home, FileText, BarChart3, Settings, Search } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const bottomNavItems = [
  { icon: Home, label: 'الرئيسية', path: '/' },
  { icon: FileText, label: 'المقالات', path: '/articles' },
  { icon: Search, label: 'بحث', path: '/categories' },
  { icon: BarChart3, label: 'التحليلات', path: '/analytics' },
  { icon: Settings, label: 'الإعدادات', path: '/settings' },
];

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen bg-navy-900">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 lg:mr-64 pb-safe lg:pb-0">
        <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-navy-950/95 backdrop-blur-lg border-t border-navy-50">
        <div className="flex items-center justify-around h-16 px-2">
          {bottomNavItems.map(item => {
            const active = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors ${
                  active ? 'text-teal-500' : 'text-navy-300 hover:text-white'
                }`}
              >
                <item.icon size={20} strokeWidth={active ? 2.5 : 1.5} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
