import React from 'react';

interface HeaderProps {
  title: string;
  navigation?: { name: string; href: string }[]; // Opcional: enlaces de navegación
}

const Header: React.FC<HeaderProps> = ({ title, navigation }) => {
  return (
    <header className="bg-blue-600 text-white shadow">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Title */}
        <h1 className="text-2xl font-bold">{title}</h1>

        {/* Navigation */}
        {navigation && (
          <nav>
            <ul className="flex space-x-4">
              {navigation.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white hover:text-gray-200 transition"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
