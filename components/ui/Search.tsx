import { TextInput, TextInputProps, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons';
import Router from 'next/router'
import { FunctionComponent, useState } from 'react';


const Search: FunctionComponent<TextInputProps> = ({ }) => {
  const theme = useMantineTheme();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    Router.push(`/${search}`);
  }

  return (
    <TextInput
      icon={<IconSearch size={18} stroke={1.5} />}
      placeholder="Найти друга"
      radius="xl"
      size="xl"
      rightSection={
        <ActionIcon onClick={() => handleSearch()} size={50} radius="xl" color={theme.primaryColor} variant="filled">
          <IconArrowRight color="white" size={25} stroke={1.5} />
        </ActionIcon>
      }
      rightSectionWidth={60}
      value={search}
      onChange={(e) => setSearch(e.currentTarget.value)}
    />
  );
}

export default Search;