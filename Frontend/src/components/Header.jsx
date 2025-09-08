const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="https://i.ibb.co/RpYtQM5Y/logo.png" alt="Zavia" className="w-10 h-10"/>
          <h1 className="text-xl font-bold text-blue-600">Zavia</h1>
        </div>

        {/* Navbar */}
        <nav className="hidden md:flex space-x-6 font-medium">
          <a href="#home" className="hover:text-blue-600">Home</a>
          <a href="#why" className="hover:text-blue-600">Why Us</a>
          <a href="#mentors" className="hover:text-blue-600">Mentors</a>
          <a href="#stories" className="hover:text-blue-600">Stories</a>
          <a href="#contact" className="hover:text-blue-600">Contact</a>
        </nav>

        {/* CTA */}
        <a href="#mentors" className="hidden md:block bg-blue-600 text-white px-5 py-2 rounded-full shadow hover:bg-blue-700">
          Get Started
        </a>
      </div>
    </header>
  );
};
export default Header;
