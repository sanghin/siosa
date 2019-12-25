import { memo } from 'react';

import css from './styles.css';

export default memo(() => <img className={css.logo} src='headhunter.png' alt='logo' />);
