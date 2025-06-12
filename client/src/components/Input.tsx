import React, { useEffect, useState } from "react";

interface Props {
  id: string;
  title: string;
  formType: string;
  placeHolderLG: string;
  placeHolderSM: string;
  logo: string;
}

const Input: React.FC<Props> = ({
  id,
  title,
  formType,
  placeHolderLG,
  placeHolderSM,
  logo,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const placeholder = windowWidth >= 1050 ? placeHolderLG : placeHolderSM;

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={formType} className="hidden  text-zinc-700 lgn:block">
        {title}
      </label>

      <div className="relative flex flex-row items-center">
        <img src={logo} alt={formType} className="absolute left-2 w-7 " />
        <input
          className="w-full py-3 transition-all duration-300 ease-in-out border rounded-lg text-zinc-500 pl-11 border-zinc-300 focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-zinc-500"
          id={id}
          type={formType}
          name={formType}
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
};

export default Input;
