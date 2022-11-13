import { Group, Switch, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons';
import { FunctionComponent } from 'react';

interface IProps {

}

const SwitchTheme: FunctionComponent<IProps> = ({ }) => {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group position="center">
      <Switch
        sx={(theme) => ({
          'label': {
            cursor: 'pointer',
          }
        })}
        size="md"
        color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
        onLabel={<IconSun size={16} stroke={2.5} color={theme.colors.yellow[4]} />}
        offLabel={<IconMoonStars size={16} stroke={2.5} color={theme.colors.blue[6]} />}
        onClick={() => toggleColorScheme()}
        onChange={(event) => toggleColorScheme()}
      />
    </Group>
  );
}

export default SwitchTheme;