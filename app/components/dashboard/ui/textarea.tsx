interface Props extends React.ComponentProps<"textarea"> {}

export const Textarea = ({ children, ...props }: Props) => {
  return <textarea {...props}>{children}</textarea>;
};

Textarea.displayName = "Form-Textarea";
