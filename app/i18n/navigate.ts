import { useNavigate as useRN, NavigateOptions } from "@tanstack/react-router";
import { useLanguage } from "./use-language";

export function useNavigate() {
  const { language } = useLanguage();
  const navigate = useRN();

  return (options: NavigateOptions) => {
    const langTo = "/" + language + options.to;
    return navigate({ ...options, to: langTo });
  };
}
