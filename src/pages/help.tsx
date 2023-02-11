import { NextPage } from "next";
import { products } from "../data/products";

const HelpPage: NextPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">M11n POS</h1>
      <div className="mb-2">
        This is a demo application intended to be used as an example on how to
        integrate legacy applications into the cloud.
      </div>
      <div className="mb-2">
        For mor information pleas contact{" "}
        <a
          className="text-red-600 hover:underline"
          href="https://technogi.com.mx"
        >
          TECHNOGI
        </a>{" "}
        at{" "}
        <a
          className="text-red-600 hover:underline"
          href="mailto:contact@technogi.com.mx"
        >
          contact@technogi.com.mx
        </a>
        .
      </div>
      <div>
        This demo is implemented with:
        <ul>
          <li>Rust</li>
          <li>Tauri</li>
          <li>NextJS</li>
          <li>Typescript</li>
        </ul>
      </div>
    </div>
  );
};

export default HelpPage;
