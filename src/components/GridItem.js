// Need this component to wrap item to be dragged.
export const GridItem = ({ forwardedRef, ...props }) => {
  return <div className="column wide three" ref={forwardedRef} {...props} />;
};
