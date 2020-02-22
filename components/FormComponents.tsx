import React from "react";
import { useField } from "formik";

interface Props {
  name: string;
  label: string;
  type: "text" | "number";
}

export function Input({
  label,
  ...props
}: Props & React.HTMLProps<HTMLInputElement>) {
  const [field, meta] = useField(props.name);

  return (
    <div className="govuk-form-group">
      <label className="govuk-label" htmlFor={props.name}>
        {label}
      </label>
      <input
        className="govuk-input"
        id={props.name}
        name={props.name}
        type={props.type}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
}
