import { Box, Button, Text } from "@mantine/core"
import { FunctionComponent } from "react"

interface IProps {
  btnText: string
  desc: string
  onClick?: () => void
  children?: React.ReactNode
};

const SettingsSection: FunctionComponent<IProps> = (props) => {
  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '15px',
        [theme.fn.largerThan('xs')]: {
          flexDirection: 'row',
        },
      })}
    >
      <Text>{props.desc}</Text>
      <Button variant="outline" color="red" onClick={props.onClick}>{props.btnText}</Button>
    </Box>
  )
}

export default SettingsSection;

