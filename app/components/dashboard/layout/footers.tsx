export const DashboardFooter = ({ className = "" }: { className?: string }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`${className} mt-auto border-t border-zinc-200 bg-white px-6 py-4`}
    >
      <div className="flex flex-col items-center justify-between text-sm text-zinc-500 sm:flex-row">
        <p>
          &copy; {currentYear} Holding Admin Dashboard. All rights reserved.
        </p>
        <div className="mt-2 flex items-center gap-4 sm:mt-0">
          <a href="#" className="hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};
