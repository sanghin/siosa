type option = { label?: string | number; value: string | number };

type Props = {
  className?: string;
  options: Array<option>;
  size?: number;
  placeholder?: string;
};

export default ({ className, options, size = 1, placeholder }: Props) => {
  return (
    <select size={size} className={className}>
      {placeholder ? (
        <option value='' disabled selected>
          {placeholder}
        </option>
      ) : null}

      {options.map(({ label, value }, index) => (
        <option key={`${index}${value}`} value={value}>
          {label || value}
        </option>
      ))}
    </select>
  );
};
