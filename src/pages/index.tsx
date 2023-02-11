import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Image from "next/image";
import reactLogo from "../assets/react.svg";
import tauriLogo from "../assets/tauri.svg";
import nextLogo from "../assets/next.svg";
import { IconType } from "react-icons";
import { IoHome, IoPricetag, IoAnalytics, IoHelp } from "react-icons/io5";
import Link from "next/link";

function Selector(props: { title?: string; url: string; icon: IconType }) {
  return (
    <Link href={`/${props.url}`}>
      <div
        className="
        flex justify-center flex-col items-center w-40 pt-4 pb-2 
        border border-red-500 text-red-400 rounded-lg hover:bg-white
        hover:shadow-md shadow-sm transition-all mx-2"
      >
        <div>
          <props.icon size={50} />
        </div>
        <div className="mt-2 text-lg uppercase font-bold">
          {props.title || props.url}
        </div>
      </div>
    </Link>
  );
}

function App() {
  return (
    <div className="container">
      <h1 className="text-4xl text-zinc-600 border-b pb-2">
        Welcome to M11N POS
      </h1>

      <div className="flex justify-center items-center mt-5 p-5">
        <Selector icon={IoHome} url="" title="home" />
        <Selector icon={IoPricetag} url="products" />
        <Selector icon={IoAnalytics} url="sales" />
        <Selector icon={IoHelp} url="help" />
      </div>
    </div>
  );
}

export default App;
