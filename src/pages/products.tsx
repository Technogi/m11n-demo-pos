import { NextPage } from "next";
import { invoke } from "@tauri-apps/api";
import toast, { Toaster } from "react-hot-toast";
import { products } from "../data/products";
import { IoCheckmark, IoCheckmarkCircle } from "react-icons/io5";
import axios from "axios";

const ProductsPage: NextPage = () => {
  const buyProduct = (productId: number) => async () => {
    try {
      await invoke("do_sale", { productId });
      toast.custom((t) => (
        <div
          className={`bg-white px-4 py-2 shadow-md rounded flex items-center ${
            t.visible ? "animate-enter" : "animate-leave"
          }`}
        >
          The sale was registered correctly
          <IoCheckmarkCircle className="text-green-700 ml-2" size={24} />
        </div>
      ));
    } catch (e) {
      console.error("ERROR", e);
      toast(JSON.stringify(e));
    }

    try {
      const resp = await axios.post(
        "https://hermes-m11n-demo.io.technogi.com.mx/",
        {
          "event-type": "NewSale",
          "product-id": productId,
          "sold-on": Date.now(),
        },
        {
          headers: {
            "X-Api-Key": "je5uvQ3fX88zh8I0rKzdR4FxSTxqln2CaOFjQ1R7",
          },
        }
      );
    } catch (e) {
      console.error("ERROR", e);
      //  toast(JSON.stringify(e));
    }
  };

  return (
    <div className="text-left p-4">
      <h1 className="border-b mb-2 text-lg">Products</h1>
      <div className="relative overflow-x-auto max-h-[calc(100vh_-_7em)]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th colSpan={2} scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(({ id, name, description, price, ...props }) => (
              <tr
                key={`product_${id}`}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">
                  <props.icon />
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {name}
                </th>
                <td className="px-6 py-4">{description}</td>
                <th className="px-6 py-4">${price}</th>
                <td className="px-6 py-4">
                  <button
                    onClick={buyProduct(id)}
                    className="text-red-600 font-bold"
                  >
                    buy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster />
    </div>
  );
};

export default ProductsPage;
