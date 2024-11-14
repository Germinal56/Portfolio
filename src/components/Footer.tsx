const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full text-center py-4 bg-transparent z-50 sm:fixed sm:bottom-0 sm:left-0 h-[7vh] relative mt-[-7vh] sm:mt-0">
      <p className="font-latoLight text-sm">
        &copy; {currentYear} crafted by Gianluca Fornaciari
      </p>
    </footer>
  );
};

export default Footer;
