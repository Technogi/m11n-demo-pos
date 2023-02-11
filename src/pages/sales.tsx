import { NextPage } from "next";
import { products } from "../data/products";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";
import toast, { Toaster } from "react-hot-toast";
import { IconType } from "react-icons";

type Sale = {
  product_id: number;
  sold_on: number;
};

type SalesCount = {
  id: number;
  count: number;
  name: string;
  icon: IconType;
};

function countSales(productId: number, sales: Sale[]) {
  return sales.filter(({ product_id }) => product_id === productId).length;
}

const SalesPage: NextPage = () => {
  const [sales, setSales] = useState<SalesCount[]>([]);

  const loadSales = async () => {
    try {
      const res = await invoke<string>("get_sales");
      const sales: Sale[] = JSON.parse(res);
      setSales(
        products
          .map(({ name, id, icon }) => ({
            name,
            id,
            icon,
            count: countSales(id, sales),
          }))
          .sort((a, b) => b.count - a.count)
      );
    } catch (e) {
      toast("Error loading sales", e);
    }
  };
  useEffect(() => {
    loadSales();
  }, []);
  return (
    <div className="text-left p-4">
      <h1 className="border-b mb-2 text-lg">Sales</h1>
      <div className="relative overflow-x-auto max-h-[calc(100vh_-_7em)]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Total Units Sold
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sales.map(({ id, name, count, ...props }) => (
              <tr
                key={`product_${id}`}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 flex items-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <props.icon className="mr-2" /> {name}
                </th>
                <td className="px-6 py-4 text-center">{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster />
    </div>
  );
};

export default SalesPage;
