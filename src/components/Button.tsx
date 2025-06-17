import classNames from "classnames";
import { ButtonHTMLAttributes, FC } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gradient-orange";
}

export const Button: FC<Props> = ({
  variant = "primary",
  className,
  children,
  disabled,
  ...props
}) => (
  <button
    {...props}
    aria-disabled={disabled}
    className={classNames(
      "py-[13px] px-[50px] ",

      {
        "bg-orange400 text-cream200": variant == "primary",
        "bg-cream400 text-orange400": variant == "secondary",
        "text-cream200 rounded-md bg-gradient-1": variant == "gradient-orange",
      },
      className,
      {
        "": !disabled, // Исправить для неактивной кнопки
        " cursor-not-allowed bg-warm-grey200 text-cream200": disabled, // Условие для disabled
      }
    )}
  >
    {children}
  </button>
);
