import { NextPage } from "next";
import CliLayout from "../../components/cli/CliLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Container from "../../components/cli/Container";
import { products } from "../../data/products";
import { invoke } from "@tauri-apps/api";

const currency = Intl.NumberFormat("es", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  currency: "MXN",
});

type Sale = {
  product_id: number;
  sold_on: number;
};

type SalesCount = {
  id: number;
  price: number;
  count: number;
  name: string;
};

function countSales(productId: number, sales: Sale[]) {
  return sales.filter(({ product_id }) => product_id === productId).length;
}

const SalesPage: NextPage = () => {
  const [sales, setSales] = useState<SalesCount[]>([]);

  const router = useRouter();

  const keyPressHandler = async ({ key }: KeyboardEvent) => {
    if (key === "p" || key === "P") {
      router.push("/cli/products");
    } else if (key === "i" || key === "I") {
      router.push("/cli");
    }
  };

  const loadSales = async () => {
    try {
      const res = await invoke<string>("get_sales");
      const sales: Sale[] = JSON.parse(res);
      setSales(
        products
          .map(({ name, id, price }) => ({
            name,
            id,
            count: countSales(id, sales),
            price,
          }))
          .sort((a, b) => b.count - a.count)
      );
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", keyPressHandler);
      return () => {
        window.removeEventListener("keydown", keyPressHandler);
      };
    }
  }, [keyPressHandler]);

  useEffect(() => {
    loadSales();
  }, []);
  return (
    <CliLayout>
      <div className="p-2">
        <Container>
          <div className="grid grid-cols-6 p-2 mb-1">
            <div />
            <div className="col-span-2">Nombre</div>
            <div className="text-center">Unidades Vendidas</div>
            <div className="text-right">Total de Ventas</div>
          </div>
          {sales
            //.sort((a, b) => a.name.localeCompare(b.name))
            .map(({ id, name, count, price }) => (
              <div
                key={`product_${id}`}
                className="grid grid-cols-6 px-2 border-t border-gray-500"
              >
                <div />
                <div className="col-span-2">{name}</div>
                <div className="text-center">${count}</div>
                <div className="text-right">
                  ${currency.format(count * price)}
                </div>
              </div>
            ))}
          <br />
        </Container>
      </div>
    </CliLayout>
  );
};

export default SalesPage;
