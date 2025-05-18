interface Props extends React.ComponentProps<"select"> {}

export const Select = ({ children, ...props }: Props) => {
  return (
    <select {...props}>
      <option>Options 1</option>
      <option>Options 2</option>
    </select>
  );
};

Select.displayName = "Form-Select";
