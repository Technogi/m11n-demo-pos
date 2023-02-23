import { FC, ReactNode } from "react";

const Container: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="p-1 border border-gray-400">
    <div className="border border-gray-400">{children}</div>
  </div>
);

export default Container;
