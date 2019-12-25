import css from './styles.css';

import Dropdown from '../Dropdown/Dropdown';

export default () => {
  const options = [
    { label: 1, value: 1 },
    { label: 2, value: 2 },
  ];

  return (
    <div className={css.search}>
      <Dropdown options={options} />
    </div>
  );
};
