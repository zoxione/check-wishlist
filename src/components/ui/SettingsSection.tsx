import { Box, Text } from "@mantine/core"
import { FunctionComponent } from "react"

interface IProps {
  title?: string
  children?: React.ReactNode
};

const SettingsSection: FunctionComponent<IProps> = (props) => {
  return (
    <Box>
      {
        props.title &&
        <Text
          sx={(theme) => ({
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
            fontSize: '1.125rem',
            fontWeight: 500,
            marginBottom: "10px",
            [theme.fn.largerThan('xs')]: {
              marginBottom: "0px",
            },
          })}
        >
          {props.title}
        </Text>
      }
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '5px',
          [theme.fn.largerThan('xs')]: {
            flexDirection: 'row',
            gap: '15px',
          },
        })}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export default SettingsSection;

