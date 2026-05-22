import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

type Mode = 'login' | 'register';

export default function Login() {
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle, loading } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password.trim()) {
      setError('يرجى ملء جميع الحقول');
      return;
    }

    try {
      if (mode === 'login') {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message === 'Invalid login credentials'
            ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
            : error.message);
        } else {
          navigate('/');
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          setError(error.message);
        } else {
          setSuccess('تم إنشاء الحساب! تحقق من بريدك الإلكتروني لتأكيد الحساب.');
        }
      }
    } catch {
      setError('حدث خطأ غير متوقع');
    }
  };

  const handleGoogle = async () => {
    setError('');
    const { error } = await signInWithGoogle();
    if (error) {
      setError('فشل تسجيل الدخول عبر Google');
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-4" dir="rtl">
      {/* Logo */}
      <div className="mb-8">
        <img src="/logo.png" alt="Modawnty" className="h-12" />
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-navy-50/30 p-6 sm:p-8">
        {/* Tabs */}
        <div className="flex bg-surface rounded-xl p-1 mb-6">
          <button
            onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
              mode === 'login'
                ? 'bg-white text-navy-900 shadow-sm'
                : 'text-navy-300 hover:text-navy-600'
            }`}
          >
            دخول
          </button>
          <button
            onClick={() => { setMode('register'); setError(''); setSuccess(''); }}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
              mode === 'register'
                ? 'bg-white text-navy-900 shadow-sm'
                : 'text-navy-300 hover:text-navy-600'
            }`}
          >
            حساب جديد
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-navy-900 mb-1.5">البريد الإلكتروني</label>
            <div className="relative">
              <Mail size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-200" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pr-10 pl-3 py-3 bg-surface rounded-xl border border-navy-50 text-sm focus:outline-none focus:ring-2 focus:ring-navy-100 focus:border-navy-300 placeholder-navy-200 transition-colors"
                dir="ltr"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-navy-900 mb-1.5">كلمة المرور</label>
            <div className="relative">
              <Lock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-200" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pr-10 pl-10 py-3 bg-surface rounded-xl border border-navy-50 text-sm focus:outline-none focus:ring-2 focus:ring-navy-100 focus:border-navy-300 placeholder-navy-200 transition-colors"
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-200 hover:text-navy-400"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-600 text-xs font-medium px-3 py-2.5 rounded-lg">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="bg-teal-50 text-teal-600 text-xs font-medium px-3 py-2.5 rounded-lg">
              {success}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-navy-500 text-white rounded-full text-sm font-bold hover:bg-navy-600 transition-colors disabled:opacity-60 shadow-sm"
          >
            {loading ? 'جارٍ...' : mode === 'login' ? 'دخول' : 'إنشاء حساب'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-navy-50" />
          <span className="text-xs text-navy-200">أو</span>
          <div className="flex-1 h-px bg-navy-50" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-navy-50 rounded-full text-sm font-medium text-navy-900 hover:bg-surface transition-colors disabled:opacity-60"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          متابعة عبر Google
        </button>
      </div>

      {/* Back link */}
      <button
        onClick={() => navigate('/')}
        className="mt-6 text-sm text-navy-300 hover:text-navy-500 transition-colors"
      >
        العودة للرئيسية
      </button>
    </div>
  );
}
