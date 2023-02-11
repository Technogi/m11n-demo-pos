import Link from "next/link";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { IoHome, IoPricetag, IoAnalytics, IoHelp } from "react-icons/io5";

function MenuItem(props: { title?: string; url: string; icon: IconType }) {
  return (
    <Link
      className="text-zinc-200 flex items-center mb-2 hover:underline hover:text-white border-b border-zinc-500 pb-2 pt-2"
      href={`/${props.url}`}
    >
      <span className="w-7">
        <props.icon />
      </span>
      <span className="uppercase text-sm font-bold">
        {props.title || props.url}
      </span>
    </Link>
  );
}

export default function Layout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <div>
      <header className="bg-red-500 p-1 shadow">
        <div>
          <div className="text-white text-xl font-bold">M11N POS</div>
          <div className="text-red-200 text-sm font-bold">
            Elevate your POS to the Cloud
          </div>
        </div>
      </header>
      <div className="grid grid-cols-12">
        <div className="col-span-2 bg-zinc-700 pt-6 px-4 min-h-[100vh] h-max">
          <MenuItem url="" title="home" icon={IoHome} />
          <MenuItem url="products" icon={IoPricetag} />
          <MenuItem url="sales" icon={IoAnalytics} />
          <MenuItem url="help" icon={IoHelp} />
        </div>
        <main className="col-span-10">{children}</main>
      </div>
    </div>
  );
}
