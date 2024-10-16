"use client";

type ButtonProps = {
  title: string | React.JSX.Element;
  type: "confirm" | "cancel" | "close" | "undone";
  onSmash?: () => void;
};

const Button = ({ title, type, onSmash }: ButtonProps) => {
  let style;
  if (type === "confirm") {
    style = "btn_blue";
  } else if (type === "cancel") {
    style = "btn_white";
  } else if (type === "close") {
    style = "btn_red";
  } else if (type === "undone") {
    style = "btn_undone";
  }
  return (
    <button className={style} onClick={onSmash}>
      {title}
    </button>
  );
};

export default Button;
