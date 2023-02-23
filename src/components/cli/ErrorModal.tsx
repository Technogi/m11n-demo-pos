import { FC } from "react";

const ErrorModal: FC<{ show: boolean }> = ({ show }) => {
  return (
    <div
      className={`${
        show ? "fixed" : "hidden"
      } top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border  right-auto bg-blue-cli p-1 text-red-500`}
    >
      <div className=" p-4 border">Ha habido un error !</div>
    </div>
  );
};

export default ErrorModal;
