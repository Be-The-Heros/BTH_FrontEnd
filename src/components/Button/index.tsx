import React from "react";

interface ButtonCustomProps {
  size?: "small" | "medium" | "large";
  children?: React.ReactNode;
  variant?:
    | "normal"
    | "primary"
    | "secondary"
    | "danger"
    | "warning"
    | "success"
    | "error";
}
export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonCustomProps;
export const ButtonCustom = (props: ButtonProps) => {
  const { size, children, variant } = props;
  const getSizeClassName = () => {
    switch (size) {
      case "small":
        return "btn--small";
      case "medium":
        return "btn--medium";
      case "large":
        return "btn--large";
      default:
        return "btn--medium";
    }
  };

  const getVariantClassName = () => {
    switch (variant) {
      case "primary":
        return "btn--primary";
      case "secondary":
        return "btn--secondary";
      case "success":
        return "btn--success";
      case "warning":
        return "btn--warning";
    }
  };

  const className = `${getSizeClassName()} ${getVariantClassName()} ${
    props.className
  }`;
  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};
