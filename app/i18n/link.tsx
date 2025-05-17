import { Link as RouterLink, type LinkProps } from "@tanstack/react-router";
import { useLanguage } from "./use-language";

interface Props
  extends Omit<React.ComponentPropsWithoutRef<"a">, "children" | "target">,
    Omit<LinkProps, "children" | "target"> {
  target?: React.ComponentPropsWithoutRef<"a">["target"];
  children?: React.ReactNode;
}

export const Link: React.FC<Props> = ({ to, children, ...rest }) => {
  const { language } = useLanguage();
  const langTo = "/" + language + to;

  return (
    <RouterLink {...rest} to={langTo} resetScroll={true}>
      {children}
    </RouterLink>
  );
};

Link.displayName = "Link";
