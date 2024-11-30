import { FaTwitter, FaTelegram, FaMedium } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#1e293b] to-[#0F123D] bg-opacity-80 text-white py-4 ">
      <div className="container mx-auto flex justify-between items-center px-4 mb-8">
        {/* Left Section */}
        <div className="text-sm">
          <a
            href="#"
            className="text-blue-400 hover:text-white transition duration-300"
          >
            MultiSender Addresses
          </a>
        </div>

        {/* Middle Section */}
        <div className="text-sm text-blue-400">
          Version: <span className="text-white">LL.01</span>
        </div>

        {/* Right Section */}
        <div className="flex space-x-8 items-center text-blue-400">
          {/* <a
            href="https://medium.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <FaMedium size={24} />
          </a> */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <FaTelegram size={24} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <span role="img" aria-label="Language">
              🌐
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
