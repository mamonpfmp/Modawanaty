import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (tab === 'login') {
        const { error } = await signIn(email, password);
        if (error) throw error;
      } else {
        const { error } = await signUp(email, password);
        if (error) throw error;
        setError('تم إرسال رابط التأكيد إلى بريدك الإلكتروني');
        setLoading(false);
        return;
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'حدث خطأ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-navy-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-teal-500/8 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Modawnty" className="h-20 mx-auto" />
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          {/* Tabs */}
          <div className="flex mb-6 glass-card rounded-xl p-1">
            <button
              onClick={() => setTab('login')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                tab === 'login' ? 'accent-gradient text-white' : 'text-navy-300 hover:text-white'
              }`}
            >
              دخول
            </button>
            <button
              onClick={() => setTab('register')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                tab === 'register' ? 'accent-gradient text-white' : 'text-navy-300 hover:text-white'
              }`}
            >
              حساب جديد
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-white mb-1.5">البريد الإلكتروني</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-300" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  dir="ltr"
                  className="w-full bg-navy-800/50 rounded-xl pl-10 pr-4 py-3 text-sm text-white border border-navy-50 focus:outline-none focus:ring-2 focus:ring-navy-500/40 placeholder-navy-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-white mb-1.5">كلمة المرور</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-300" />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  dir="ltr"
                  className="w-full bg-navy-800/50 rounded-xl pl-10 pr-10 py-3 text-sm text-white border border-navy-50 focus:outline-none focus:ring-2 focus:ring-navy-500/40 placeholder-navy-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-300 hover:text-white"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className={`text-xs p-2.5 rounded-lg ${error.includes('تم إرسال') ? 'text-teal-400 bg-teal-500/10' : 'text-red-400 bg-red-500/10'}`}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 accent-gradient text-white rounded-xl text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              {loading ? 'جارٍ...' : tab === 'login' ? 'دخول' : 'إنشاء حساب'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-navy-50" />
            <span className="text-[11px] text-navy-300">أو</span>
            <div className="flex-1 h-px bg-navy-50" />
          </div>

          {/* Google */}
          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-2 py-3 glass-card rounded-xl text-sm font-semibold text-white hover:bg-navy-800/50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
            متابعة عبر Google
          </button>
        </div>

        {/* Back link */}
        <p className="text-center mt-5">
          <a href="/" className="text-xs text-navy-300 hover:text-teal-400 transition-colors">العودة للرئيسية</a>
        </p>
      </div>
    </div>
  );
}
