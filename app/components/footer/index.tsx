import { useTranslation } from "react-i18next";
import {
  Send,
  MapPin,
  Phone,
  Printer,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";

export const RootFooter = () => {
  const { t } = useTranslation();

  return (
    <>
      <footer className="bg-white py-10 text-gray-950 sm:py-16">
        {/* Ana konteyner */}
        <div className="container mx-auto max-w-6xl px-4">
          {/* Üst kısım: Logo ve iletişim bilgileri */}
          <div className="mb-8 grid grid-cols-1 items-center gap-6 border-b border-gray-200 pb-10 sm:mb-12 md:grid-cols-2">
            {/* Sol bölüm - Logo ve açıklama */}
            <div className="flex w-full flex-col items-start justify-start gap-y-8">
              <img
                src="/images/brand/dark.svg"
                alt="Şirket Logo"
                className="h-12 w-auto sm:h-16"
              />
              <p className="text-gray-600">
                Rüyalarımızın, kültürümüzün ve insanlarımızın gücüyle dünya için
                sürdürülebilir değer yaratıyoruz.
              </p>

              {/* Bültene Abone Olma Formu */}
              <div className="flex w-full flex-col gap-6 sm:max-w-sm">
                <label
                  htmlFor="email"
                  className="relative inline-block font-bold sm:text-lg"
                >
                  Abone Olun
                  <span className="from-primary-600 via-primary-700 to-primary-600 absolute -bottom-2 left-0 h-1 w-12 bg-gradient-to-r"></span>
                </label>

                <div className="flex">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="E-posta adresiniz"
                    style={{
                      WebkitAppearance: "none",
                      WebkitBorderRadius: 0,
                      borderRadius: "0 0 0 0",
                    }}
                    className="focu:ring-1 bg-primary-950 focus:border-primary-700 focus:ring-primary-200 w-full rounded-l-sm border border-r-0 border-gray-950 px-4 py-2 text-gray-100 placeholder-gray-100/50 ring-transparent focus:outline-none"
                  />
                  <button className="from-primary-600 via-primary-700 to-primary-600 rounded-r-sm bg-gradient-to-r px-4 py-2 transition-opacity duration-300 hover:opacity-75">
                    <Send className="size-5 text-gray-50" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sağ bölüm - İletişim */}
            <div className="w-full md:order-2 lg:order-2">
              <h3 className="relative mb-6 inline-block font-bold sm:text-lg">
                Bize Ulaşın
                <span className="from-primary-600 via-primary-700 to-primary-600 absolute -bottom-2 left-0 h-1 w-12 bg-gradient-to-r"></span>
              </h3>

              {/* Adres ve İletişim Bilgileri */}
              <div className="grid w-full grid-cols-1 gap-4">
                <div className="flex items-center gap-2">
                  <div className="bg-primary-950 mt-1 rounded-sm p-2">
                    <MapPin className="size-5 text-gray-50" />
                  </div>
                  <p className="text-sm text-balance text-gray-800 hover:underline">
                    Nakkaştepe, Azizbey Sokak, No:1, Kuzguncuk 34674, İstanbul /
                    Türkiye
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-primary-950 rounded-sm p-2">
                    <Phone className="size-5 text-gray-50" />
                  </div>
                  <a
                    href="tel:+902165310000"
                    className="text-sm text-gray-800 hover:underline"
                  >
                    +90 216 531 00 00
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-primary-950 rounded-sm p-2">
                    <Printer className="size-5 text-gray-50" />
                  </div>
                  <span className="text-sm text-gray-800 hover:underline">
                    +90 216 531 00 99
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-primary-950 rounded-sm p-2">
                    <Mail className="size-5 text-gray-50" />
                  </div>
                  <div>
                    <a
                      href="mailto:info@sirket.com"
                      className="text-sm text-gray-800 hover:underline"
                    >
                      iletisim@sirket.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alt kısım: Sosyal medya ve telif hakkı */}
          <div className="flex flex-col items-start justify-between gap-y-4 sm:items-center md:flex-row">
            {/* Telif hakkı metni */}
            <div>
              <p className="text-sm text-gray-600">
                &copy; 2025 Şirket A.Ş. Tüm hakları saklıdır.
              </p>
            </div>

            {/* Sosyal Medya Linkleri */}
            <div className="flex space-x-3">
              <a
                href="#"
                className="bg-primary-950 hover:bg-primary-800 rounded-full p-2 transition-colors duration-300"
              >
                <Facebook className="size-5 text-gray-50" />
              </a>
              <a
                href="#"
                className="bg-primary-950 hover:bg-primary-800 rounded-full p-2 transition-colors duration-300"
              >
                <Instagram className="size-5 text-gray-50" />
              </a>
              <a
                href="#"
                className="bg-primary-950 hover:bg-primary-800 rounded-full p-2 transition-colors duration-300"
              >
                <Linkedin className="size-5 text-gray-50" />
              </a>
              <a
                href="#"
                className="bg-primary-950 hover:bg-primary-800 rounded-full p-2 transition-colors duration-300"
              >
                <Twitter className="size-5 text-gray-50" />
              </a>
              <a
                href="#"
                className="bg-primary-950 hover:bg-primary-800 rounded-full p-2 transition-colors duration-300"
              >
                <Youtube className="size-5 text-gray-50" />
              </a>
            </div>

            {/* Yasal bağlantılar */}
            <div>
              <ul className="flex flex-wrap gap-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 transition-colors hover:underline"
                  >
                    Gizlilik Politikası
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 transition-colors hover:underline"
                  >
                    Çerez Ayarları
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 transition-colors hover:underline"
                  >
                    Yasal Bilgiler
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Accent Line */}
      <div className="from-primary-600 via-primary-700 to-primary-600 h-4 w-full bg-gradient-to-r"></div>
    </>
  );
};
