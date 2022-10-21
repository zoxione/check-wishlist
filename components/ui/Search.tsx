import { TextInput, TextInputProps, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons';
import { FunctionComponent } from 'react';


const Search: FunctionComponent<TextInputProps> = ({ }) => {
  const theme = useMantineTheme();

  return (
    <TextInput
      icon={<IconSearch size={18} stroke={1.5} />}
      radius="xl"
      size="xl"
      rightSection={
        <ActionIcon size={50} radius="xl" color={theme.primaryColor} variant="filled">
          <IconArrowRight color="white" size={25} stroke={1.5} />
        </ActionIcon>
      }
      placeholder="Search user"
      rightSectionWidth={60}
    // {...props}
    />
  );
}

export default Search;