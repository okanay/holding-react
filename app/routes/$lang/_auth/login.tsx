import { getLanguageFromSearch } from "@/i18n/action";
import { seoTranslations } from "@/i18n/languages";
import { Link } from "@/i18n/link";
import { useAuth } from "@/providers/auth";
import { AlreadyLoginCheck } from "@/providers/auth/session-control";
import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/$lang/_auth/login")({
  loader: async ({ location: { search } }) => {
    const lang = getLanguageFromSearch(search);
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

function LoginPage() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form doğrulama
    if (!formData.username.trim() || !formData.password.trim()) {
      setErrorMessage("Lütfen tüm alanları doldurun");
      return;
    }

    setIsLoading(true);

    try {
      const response = await login(formData);

      if (response.success) {
        // Artık manuel olarak sayfayı yeniden yüklemek yerine yönlendirme yapabilirsiniz
        window.location.href = "/blog/editor";
      } else {
        setErrorMessage(
          "Giriş başarısız. Lütfen kullanıcı adı ve şifrenizi kontrol edin.",
        );
      }
    } catch (error) {
      setErrorMessage(
        "Giriş başarısız. Bir sorun oluştu, lütfen daha sonra tekrar deneyin.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlreadyLoginCheck>
      <main className="flex min-h-screen flex-col bg-gradient-to-br from-sky-50 to-zinc-100">
        {/* Üst Şerit - Daha zarif bir gradient */}
        <div className="from-primary-700 via-primary-500 absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r to-teal-400 opacity-80 blur-[1px]"></div>

        {/* Ana İçerik */}
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            {/* Logo ve Başlık */}
            <div className="mb-12 flex flex-col items-center space-y-7">
              <Link
                to="/"
                aria-label="Holding Sitesi - Anasayfaya dön"
                className="transition-transform duration-300 hover:scale-105 focus:outline-none"
              >
                <img
                  src="/images/brand.svg"
                  alt="Holding Sitesi Logo"
                  loading="eager"
                  className="h-14 w-auto drop-shadow-md"
                  width="140"
                  height="48"
                />
              </Link>

              <div className="text-center">
                <h1 className="text-color-font-dark mb-1 text-4xl font-extrabold tracking-tight">
                  Dashboard Paneli
                </h1>
              </div>
            </div>

            {/* Form Kartı - Daha zarif ve sade */}
            <div className="border-cover overflow-hidden rounded-3xl border bg-white/80 ring-1 ring-zinc-100 backdrop-blur-md transition-all duration-300">
              {/* Hata Mesajı - Daha zarif görünüm */}
              {errorMessage && (
                <div className="border-l-4 border-red-400 bg-red-50/80 px-5 py-3 text-sm text-red-700">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="size-5 flex-shrink-0" />
                    <p className="font-medium">{errorMessage}</p>
                  </div>
                </div>
              )}

              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-7">
                  {/* Kullanıcı Adı Alanı */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="username"
                      className="block text-sm font-semibold text-zinc-800"
                    >
                      Kullanıcı Adı
                    </label>
                    <div className="group relative rounded-xl shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <Mail className="group-focus-within:text-primary-500 size-5 text-zinc-300 transition-colors duration-200" />
                      </div>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        value={formData.username}
                        onChange={handleChange}
                        className="focus:border-primary-400 focus:ring-primary-400/20 block w-full rounded-xl border border-zinc-200 bg-zinc-50/80 px-11 py-3 font-medium text-zinc-900 transition-colors duration-200 placeholder:text-zinc-400 focus:bg-white focus:ring-2 focus:outline-none"
                        placeholder="Kullanıcı adınızı girin"
                      />
                    </div>
                  </div>

                  {/* Şifre Alanı */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-zinc-800"
                      >
                        Şifre
                      </label>
                    </div>
                    <div className="group relative rounded-xl shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <Lock className="group-focus-within:text-primary-500 size-5 text-zinc-300 transition-colors duration-200" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="focus:border-primary-400 focus:ring-primary-400/20 block w-full rounded-xl border border-zinc-200 bg-zinc-50/80 px-11 py-3 font-medium text-zinc-900 transition-colors duration-200 placeholder:text-zinc-400 focus:bg-white focus:ring-2 focus:outline-none"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-4"
                        aria-label={
                          showPassword ? "Şifreyi gizle" : "Şifreyi göster"
                        }
                        tabIndex={-1}
                      >
                        {showPassword ? (
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
                    disabled={isLoading}
                    className="from-primary-700 to-primary-500 hover:from-primary-800 hover:to-primary-600 focus:ring-primary-400/50 disabled:from-primary-300 disabled:to-primary-200 mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r px-5 py-3.5 text-base font-semibold text-white shadow-md transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="size-5 animate-spin text-white"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
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
      </main>
    </AlreadyLoginCheck>
  );
}
