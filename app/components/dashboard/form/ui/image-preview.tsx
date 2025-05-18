interface Props extends React.ComponentProps<"input"> {}

export const ImagePreview = ({ children, ...props }: Props) => {
  return <input {...props}>{children}</input>;
};

ImagePreview.displayName = "Form-ImagePreview";
