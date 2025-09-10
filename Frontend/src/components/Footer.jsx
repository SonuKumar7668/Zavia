const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-white py-10">
      <div className="container mx-auto grid md:grid-cols-3 gap-8 px-6">
        <div>
          <h3 className="font-bold text-lg mb-3">Quick Links</h3>
          <ul>
            <li><a href="#home" className="hover:underline">Home</a></li>
            <li><a href="#mentors" className="hover:underline">Mentors</a></li>
            <li><a href="#stories" className="hover:underline">Stories</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>

        <div className="text-sm text-gray-200">
          © {new Date().getFullYear()} Zavia. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
export default Footer;
