import { Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title}>
        <Text inherit variant="gradient" component="span" gradient={{ from: 'black', to: 'green' }}>
          DLS Courses
        </Text>
      </Title>
    </>
  );
}
