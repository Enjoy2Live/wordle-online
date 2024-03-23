const Row = ({ children, className, ...props }) => {
  return (
    <div className={`flex gap-5 lg:gap-8 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Row;
