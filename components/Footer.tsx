import Link from 'next/link';
import React, { FunctionComponent } from 'react'
import { NextPage } from 'next';
import { createStyles, Container, Group, ActionIcon, Footer, Box, Text } from '@mantine/core';
import { IconBrandTwitter, IconCode, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons';

interface IProps {

};

const FooterContent: FunctionComponent<IProps> = ({ }) => {


  return (
    <Footer height={60} p="md"
      sx={(theme) => ({

      })}
    >
      <Box
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',

        })}
      >

        <Link href="/" passHref>
          <Text component='a' weight={500}>
            Check
          </Text>
        </Link>

      </Box>
    </Footer>
  )
}

export default FooterContent;