export const DashboardFooter = ({ className = "" }: { className?: string }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`${className} relative z-20 mt-auto border-t border-zinc-200 bg-white px-6 py-4`}
    >
      <div className="flex flex-col items-center justify-between text-sm text-zinc-500 sm:flex-row">
        <p>
          &copy; {currentYear} Holding Yönetim Paneli. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
};
