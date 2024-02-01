import React from "react";

type Props = {
  title: string;
};

const Title = ({ title }: Props) => {
  return (
    <h2 className="font-bold text-xl mb-4">
      {title}
      <span className=""></span>
    </h2>
  );
};

export default Title;
