interface Props extends React.ComponentProps<"input"> {}

export const Input = ({ children, ...props }: Props) => {
  return <input {...props}>{children}</input>;
};

Input.displayName = "Form-Input";
