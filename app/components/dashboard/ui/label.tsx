interface Props extends React.ComponentProps<"label"> {
  isRequired?: boolean;
}

export const Label = ({ isRequired = false, children, ...props }: Props) => {
  return (
    <label {...props}>
      {children}
      {isRequired && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
};

Label.displayName = "Form-Label";
