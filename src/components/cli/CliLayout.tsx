import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import { FaChevronRight } from "react-icons/fa";

const Menu: FC = () => {
  const router = useRouter();
  return (
    <div className="px-4 bg-zinc-300">
      <div className="grid grid-cols-8 ">
        <Link className="text-black flex items-center" href="/cli/products">
          <FaChevronRight
            style={{
              display: router.asPath === "/cli" ? "inherit" : "none",
            }}
          />
          <span className="text-red-700">I</span>nicio
        </Link>
        <Link className="text-black flex items-center" href="/cli/products">
          <FaChevronRight
            style={{
              display: router.asPath === "/cli/products" ? "inherit" : "none",
            }}
          />
          <span className="text-red-700">P</span>roductos
        </Link>
        <Link className="text-gray-700 flex items-center" href="/cli/sales">
          <FaChevronRight
            style={{
              display: router.asPath === "/cli/sales" ? "inherit" : "none",
            }}
          />
          <span className="text-red-700">V</span>entas
        </Link>
      </div>
    </div>
  );
};

const CliLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="font-mono text-gray-200 bg-blue-cli min-h-screen font-bold uppercase">
      <div className="grid grid-cols-3 bg-magenta px-4 text-yellow-300">
        <div>{new Date().toLocaleDateString()}</div>
        <div className="text-center">POS-1986</div>
        <div className="text-right">Version 24.2</div>
      </div>
      <Menu />
      {children}
    </div>
  );
};

export default CliLayout;
