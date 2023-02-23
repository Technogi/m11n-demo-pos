import { NextPage } from "next";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { products } from "../../data/products";
import { useRouter } from "next/router";
import CliLayout from "../../components/cli/CliLayout";
import { registerSale } from "../../lib/sales";
import ErrorModal from "../../components/cli/ErrorModal";
import OkModal from "../../components/cli/OkModal";
import Container from "../../components/cli/Container";

const currency = Intl.NumberFormat("es", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
  currency: "MXN",
});

const ProductsPage: NextPage = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [showError, setShowError] = useState<boolean>(false);
  const [showOk, setShowOk] = useState<boolean>(false);
  const inputRef = useRef();
  const router = useRouter();

  const reset = () => {
    setShowError(false);
    setShowModal(false);
    setShowOk(false);
  };
  const setFocus = () => {
    inputRef.current && (inputRef.current as any).focus();
  };

  const keyPressHandler = async ({ key }: KeyboardEvent) => {
    if (key === "v" || key === "V") {
      router.push("/cli/sales");
    } else if (key === "i" || key === "I") {
      router.push("/cli");
    } else if (key === "ArrowUp" && currentIndex > 0 && !showModal) {
      setCurrentIndex(currentIndex - 1);
    } else if (
      key === "ArrowDown" &&
      currentIndex < products.length - 1 &&
      !showModal
    ) {
      setCurrentIndex(currentIndex + 1);
    } else if (key === "Enter" && !showModal && (showError || showOk)) {
      console.log(33);
      reset();
    } else if (key === "Enter" && !showModal) {
      console.log(22);
      setShowModal(true);
      setTimeout(setFocus, 300);
      setTotal(1);
    } else if (key === "Enter" && showModal) {
      console.log("Registrando venta");
      const promises = [];
      for (let i = 0; i < total; i++)
        promises.push(registerSale(products[currentIndex].id));

      console.log("Esperando promesas", promises.length);
      try {
        await promises;
        setShowOk(true);
      } catch (e) {
        setShowError(true);
      } finally {
        setTotal(1);
        setShowModal(false);
        console.log("Terminando de registrar");
      }
    } else if (key === "Escape" && showModal) {
      reset();
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", keyPressHandler);
      return () => {
        window.removeEventListener("keydown", keyPressHandler);
      };
    }
  }, [setCurrentIndex, keyPressHandler, setShowModal]);

  return (
    <CliLayout>
      <>
        <div className="p-2">
          <Container>
            <div className="grid grid-cols-8 p-2 mb-1">
              <div className="col-span-2">Nombre</div>
              <div className="col-span-5">Descripción</div>
              <div className="col-span-1">Precio</div>
            </div>
            {products
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(({ id, name, description, price, ...props }, idx) => (
                <div
                  key={`product_${id}`}
                  className={`${
                    currentIndex === idx ? "bg-cyan-600 " : ""
                  }grid grid-cols-8 px-2 border-t border-gray-600 `}
                >
                  <div className="col-span-2">{name}</div>
                  <div className="col-span-5 overflow-y-hidden h-5">
                    {description}
                  </div>
                  <div className="col-span-1">${price}</div>
                </div>
              ))}
          </Container>
        </div>
        <div
          className={`${
            showModal ? "fixed" : "hidden"
          } top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border  right-auto bg-blue-cli p-1`}
        >
          <div className=" p-4 border">
            <div className="grid grid-cols-2 gap-x-4">
              <div className="">Producto:</div>
              <div className="">{products[currentIndex].name}</div>
              <div>Precio:</div>
              <div>${currency.format(products[currentIndex]?.price)}</div>
              <div>Unidades a vender</div>
              <input
                className="bg-blue-cli border-b text-center text-yellow-200 w-10 focus:ring-0 focus:ring-offset-0 focus:outline-none"
                type="number"
                value={total}
                min={1}
                onChange={({ target }) => setTotal(parseFloat(target.value))}
                ref={inputRef}
              ></input>
              <div className="">Total:</div>
              <div className="">
                ${currency.format(products[currentIndex].price * total)}
              </div>
            </div>

            <div className="text-center mt-3">
              <button className="text-cyan-300">Aceptar</button>
            </div>
          </div>
        </div>
        <ErrorModal show={showError} />
        <OkModal show={showOk} />
      </>
    </CliLayout>
  );
};

export default ProductsPage;
