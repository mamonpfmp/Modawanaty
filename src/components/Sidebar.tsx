import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, FolderOpen, BarChart3, Settings, LogOut, Search, PenLine, X } from 'lucide-react';

const navItems = [
  { path: '/', label: 'لوحة التحكم', icon: LayoutDashboard },
  { path: '/articles', label: 'المقالات', icon: FileText },
  { path: '/categories', label: 'التصنيفات', icon: FolderOpen },
  { path: '/analytics', label: 'التحليلات', icon: BarChart3 },
  { path: '/settings', label: 'الإعدادات', icon: Settings },
];

interface SidebarProps {
  onClose: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-100 shadow-sm">
      {/* Header */}
      <div className="p-5 border-b border-gray-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <PenLine size={20} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-800">مدونتي</h2>
              <p className="text-xs text-gray-400">لوحة إدارة شخصية</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100">
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" />
          <input
            type="text"
            placeholder="بحث سريع..."
            className="w-full pr-9 pl-3 py-2.5 bg-gray-50 rounded-xl text-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-100 placeholder-gray-300"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(item => {
          const isActive = location.pathname === item.path || 
            (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`
                sidebar-item w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                ${isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }
              `}
            >
              <item.icon size={19} />
              <span>{item.label}</span>
              {isActive && <div className="mr-auto w-1.5 h-1.5 rounded-full bg-blue-500" />}
            </button>
          );
        })}
      </nav>

      {/* User profile */}
      <div className="p-4 border-t border-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
            م
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-700">المدوّن</p>
            <p className="text-xs text-gray-400">كاتب ومدوّن</p>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
