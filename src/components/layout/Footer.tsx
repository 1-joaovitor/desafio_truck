import React from 'react';
import { FilmIcon, Heart, Mail, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-8 mt-12 shadow-inner">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <FilmIcon className="h-5 w-5 mr-2 text-indigo-600" />
              <span className="text-gray-800 font-bold">Studio Ghibli Films</span>
            </div>
            <p className="text-gray-600 text-sm mt-2">
              &copy; {new Date().getFullYear()} Todos os direitos reservados.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-indigo-600 transition flex items-center">
              <Shield size={14} className="mr-1" />
              <span>Termos</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-indigo-600 transition flex items-center">
              <Heart size={14} className="mr-1" />
              <span>Privacidade</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-indigo-600 transition flex items-center">
              <Mail size={14} className="mr-1" />
              <span>Contato</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;