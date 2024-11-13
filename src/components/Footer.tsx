const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full text-center py-4 bg-transparent z-50 sm:absolute sm:bottom-0">
      <p className="font-latoLight text-sm">
        &copy; {currentYear} crafted by Gianluca Fornaciari
      </p>
    </footer>
  );
};

export default Footer;
