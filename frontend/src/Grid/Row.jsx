import { useState } from "react";

const Row = ({ children }) => {
  const [word, setWord] = useState();
  return <div className="flex gap-5">{children}</div>;
};

export default Row;
