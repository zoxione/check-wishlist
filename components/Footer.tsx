import { Box, Footer, Text } from '@mantine/core';
import Link from 'next/link';
import { FunctionComponent } from 'react';

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