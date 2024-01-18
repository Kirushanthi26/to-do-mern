import { type ReactNode } from "react";

interface headerProps {
  image: {
    src: string;
    alt: string;
  };

  children: ReactNode;
}

const Header: React.FC<headerProps> = ({ image, children }) => {
  return (
    <header className="flex flex-col items-center mt-2 mb-4">
      <img {...image} className="object-contain mb-4 w-32 rounded-full"/>
      {children}
    </header>
  );
};

export default Header;
