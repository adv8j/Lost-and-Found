import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import path from "path";
export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white py-6 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">© 2024 Lost and Found</p>
        <nav className="flex items-center gap-6">
          
            {/* <FaCode size={30} /> */}
            Developed by Advait Jain
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="https://github.com/adv8j"
          >
            <FaGithub size={30} />
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="https://www.linkedin.com/in/advait-jain-2958a9281"
          >
            <FaLinkedin size={30} />
            {/* <FaCode size={30} /> */}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
