import { getLanguageFromSearch } from "@/i18n/action";
import { seoTranslations } from "@/i18n/languages";
import { Link } from "@/i18n/link";
import { useAuth } from "@/providers/auth";
import { AlreadyLoginCheck } from "@/providers/auth/session-control";
import { createFileRoute } from "@tanstack/react-router";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Loader,
  Lock,
  LogIn,
  Mail,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/$lang/_auth/login")({
  loader: async ({ params: { lang } }) => {
    return { lang };
  },

  head: ({ loaderData: { lang } }) => {
    const seoData = seoTranslations[lang];
    return {
      meta: [
        { title: seoData.auth.login.title },
        { name: "description", content: seoData.auth.login.description },
      ],
    };
  },

  component: LoginPage,
});

type LoginState = {
  isLoading: boolean;
  showPassword: boolean;
  errorMessage: string | null;
  username: string;
  password: string;
};

function LoginPage() {
  const { login } = useAuth();

  // Tüm state'ler tek bir objede
  const [state, setState] = useState<LoginState>({
    isLoading: false,
    showPassword: false,
    errorMessage: null,
    username: "",
    password: "",
  });

  // Input değişikliklerini yönetir
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
      errorMessage: prev.errorMessage ? null : prev.errorMessage,
    }));
  };

  // Şifre göster/gizle
  const toggleShowPassword = () => {
    setState((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };

  // Form submit işlemi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!state.username.trim() || !state.password.trim()) {
      setState((prev) => ({
        ...prev,
        errorMessage: "Lütfen tüm alanları doldurun",
      }));
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await login({
        username: state.username,
        password: state.password,
      });

      if (response.success) {
        window.location.href = "/blog/dashboard";
      } else {
        setState((prev) => ({
          ...prev,
          errorMessage:
            "Giriş başarısız. Lütfen kullanıcı adı ve şifrenizi kontrol edin.",
        }));
      }
    } catch {
      setState((prev) => ({
        ...prev,
        errorMessage:
          "Giriş başarısız. Bir sorun oluştu, lütfen daha sonra tekrar deneyin.",
      }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <AlreadyLoginCheck>
      <main className="relative flex min-h-screen bg-white">
        {/* Sol Form Alanı */}
        <div
          className={`from-primary-50/40 via-primary-50 to-primary-700/40 z-20 order-1 flex min-h-screen w-full shrink-0 flex-col items-center justify-center gap-y-8 bg-gradient-to-br px-4 py-12 backdrop-blur-md transition-all duration-300 sm:px-6 md:mr-auto md:w-[512px] lg:px-4`}
        >
          <Link to="/">
            <img
              src="/images/brand/dark.svg"
              alt="Holding Sitesi Logo"
              className="h-10 w-auto drop-shadow-lg"
              width="120"
              height="40"
            />
          </Link>
          <div className="border-cover relative w-full max-w-md overflow-hidden rounded-lg border bg-white">
            {/* Form Kartı */}
            <div className="">
              {/* Hata Mesajı */}
              {state.errorMessage && (
                <div className="border-l-4 border-red-400 bg-red-50/80 px-5 py-3 text-sm text-red-700">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="size-5 flex-shrink-0" />
                    <p className="font-medium">{state.errorMessage}</p>
                  </div>
                </div>
              )}

              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-7">
                  {/* Kullanıcı Adı */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="username"
                      className="block text-sm font-semibold text-zinc-800"
                    >
                      Kullanıcı Adı
                    </label>
                    <div className="group relative rounded-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <Mail className="group-focus-within:text-primary-500 size-5 text-zinc-300 transition-colors duration-200" />
                      </div>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        value={state.username}
                        onChange={handleChange}
                        className="focus:border-primary-400 focus:ring-primary-400/20 block w-full rounded-sm border border-zinc-200 bg-zinc-50/80 px-11 py-3 font-medium text-zinc-900 transition-colors duration-200 placeholder:text-zinc-400 focus:bg-white focus:ring-2 focus:outline-none"
                        placeholder="Kullanıcı adınızı girin"
                      />
                    </div>
                  </div>

                  {/* Şifre */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-zinc-800"
                      >
                        Şifre
                      </label>
                    </div>
                    <div className="group relative rounded-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <Lock className="group-focus-within:text-primary-500 size-5 text-zinc-300 transition-colors duration-200" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={state.showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        value={state.password}
                        onChange={handleChange}
                        className="focus:border-primary-400 focus:ring-primary-400/20 block w-full rounded-sm border border-zinc-200 bg-zinc-50/80 px-11 py-3 font-medium text-zinc-900 transition-colors duration-200 placeholder:text-zinc-400 focus:bg-white focus:ring-2 focus:outline-none"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="absolute inset-y-0 right-0 flex items-center pr-4"
                        aria-label={
                          state.showPassword
                            ? "Şifreyi gizle"
                            : "Şifreyi göster"
                        }
                        tabIndex={-1}
                      >
                        {state.showPassword ? (
                          <EyeOff className="size-5 text-zinc-400 transition-colors duration-200 hover:text-zinc-600" />
                        ) : (
                          <Eye className="size-5 text-zinc-400 transition-colors duration-200 hover:text-zinc-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Giriş Butonu */}
                  <button
                    type="submit"
                    disabled={state.isLoading}
                    className="from-primary-700 to-primary-500 hover:from-primary-800 hover:to-primary-600 focus:ring-primary-400/50 disabled:from-primary-300 disabled:to-primary-200 mt-3 flex w-full items-center justify-center gap-2 rounded-sm bg-gradient-to-r px-5 py-3.5 text-base font-semibold text-white transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed"
                  >
                    {state.isLoading ? (
                      <>
                        <Loader className="size-5 animate-spin text-white" />
                        <span>İşleniyor...</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="size-5" />
                        <span>Giriş Yap</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Alt bilgi */}
                <div className="mt-10 text-center text-xs font-light tracking-wide text-zinc-400">
                  Holding Sitesi © {new Date().getFullYear()} &mdash; Dashboard
                  Paneli
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Sağ Manzara Alanı (Sadece md ve üzeri ekranlarda görünür) */}
        <div
          className={`from-primary-50/40 via-primary-50 to-primary-700/40 order-2 hidden bg-gradient-to-br md:static md:flex md:w-full`}
        >
          <img
            src="https://assets.hoi.com.tr/login-min.png"
            alt="Manzara"
            className="h-full w-full object-cover object-center opacity-80"
            loading="lazy"
          />

          {/* Manzara üstüne gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/60 to-zinc-800/30" />
        </div>
      </main>
    </AlreadyLoginCheck>
  );
}
