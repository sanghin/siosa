import css from './styles.css';

type Props = {
  className?: string;
  options: Array<{ label?: string | number; value: string | number }>;
  size?: number;
};

export default ({ className, options, size = 5 }: Props) => {
  const concatclassName = className ? `${className} ${css.dropdown}` : css.dropdown;

  return (
    <select multiple size={size} className={concatclassName}>
      {options.map(({ label, value }) => (
        <option value={value}>{label || value}</option>
      ))}
    </select>
  );
};
