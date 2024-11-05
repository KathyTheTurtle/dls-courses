import { Outlet } from 'react-router-dom';
import { Center } from '@mantine/core';

export function RootLayout() {
  return (
    <Center style={{ height: '100vh', width: '100vw' }}>
      <Outlet />
    </Center>
  );
}

export default RootLayout;
