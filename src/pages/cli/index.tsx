import { NextPage } from "next";
import CliLayout from "../../components/cli/CliLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import TechnogiBanner from "../../components/cli/TechnogiBanner";
import POSBanner from "../../components/cli/POSBanner";

const CliHomePage: NextPage = () => {
  const router = useRouter();
  const keyPressHandler = async ({ key }: KeyboardEvent) => {
    if (key === "p" || key === "P") {
      router.push("/cli/products");
    } else if (key === "v" || key === "V") {
      router.push("/cli/sales");
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

  return (
    <CliLayout>
      <div className="text-center mt-2 text-xl text-orange-400">
        Bienvenido a POS-1986
      </div>
      <div className="text-center mb-4 text-yellow-200"> versión 24.2</div>
      <POSBanner />
    </CliLayout>
  );
};

export default CliHomePage;
