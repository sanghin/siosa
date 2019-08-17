import React, { ReactNode } from 'react';

import Head from 'next/head';

declare interface Props {
  children: ReactNode;
}

export default ({ children }: Props) => <>{children}</>;
