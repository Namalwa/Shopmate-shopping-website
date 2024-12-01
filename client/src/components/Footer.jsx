import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Contact Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <p className="text-base mb-2">Email: support@example.com</p>
            <p className="text-base">Phone: +123 456 7890</p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul>
              <li className="mb-2">
                <a href="/" className="text-base hover:text-orange-500">Home</a>
              </li>
              <li className="mb-2">
                <a href="/" className="text-base hover:text-orange-500">Shop</a>
              </li>
              <li className="mb-2">
                <a href="/" className="text-base hover:text-orange-500">About Us</a>
              </li>
              <li className="mb-2">
                <a href="/" className="text-base hover:text-orange-500">Contact</a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-2xl hover:text-blue-600" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-2xl hover:text-blue-400" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-2xl hover:text-pink-600" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-2xl hover:text-blue-700" />
              </a>
            </div>
          </div>

    
        </div>

        <div className="mt-12 text-center text-base">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
