import classNames from "classnames";
import { FormikProps, FormikValues, getIn } from "formik";
import { ComponentPropsWithoutRef, ReactNode } from "react";

interface Props<T extends FormikValues>
  extends Omit<ComponentPropsWithoutRef<"input">, "name"> {
  formik: FormikProps<T>;
  name: Extract<keyof T, string>;
  labelText: string;
  inputType?: string;
  handleInputChange?: string;
}

export const FormInput = <T extends FormikValues>({
  formik,
  className,
  name,
  labelText,
  inputType = "text",
  id = name,
  ...props
}: Props<T>): ReactNode => (
  <div className="flex flex-col relative gap-2">
    <input
      id={id}
      name={name}
      type={inputType}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      {...props}
      className={classNames(
        "order-2 peer text-xl border focus:outline-none focus:border-orange200  rounded-md bg-cream200 p-3",
        {
          "border-red":
            getIn(formik.touched, name) && getIn(formik.errors, name),
          "border-warm-grey200": !getIn(formik.touched, name),
        },
        className
      )}
    />
    <label
      htmlFor={id}
      className={classNames(
        "order-1 pl-2 pt-7 text-xl peer-focus:text-orange400",
        {
          "text-red":
            !!getIn(formik.errors, name) && getIn(formik.touched, name),
        }
      )}
    >
      {labelText}
    </label>
    {/* {getIn(formik.touched, name) && getIn(formik.errors, name) && (
      
    )} */}
    <div
      className={classNames("order-3   text-base pl-3", {
        "text-red": getIn(formik.touched, name) && getIn(formik.errors, name),
        "text-warm-grey400": !getIn(formik.touched, name),
      })}
    >
      {getIn(formik.errors, name)}
    </div>
  </div>
);
