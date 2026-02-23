// src/components/custom/Container.jsx

const Container = ({ children, className }) => {
  return (
    <section className={`container max-w-[1200px] mx-auto px-4 ${className}`}>
      {children}
    </section>
  );
};

export default Container;
