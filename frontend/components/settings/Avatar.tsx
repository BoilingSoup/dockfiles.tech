import { Box, MantineNumberSize, Transition, useMantineColorScheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconCamera } from "@tabler/icons";
import { useAuth } from "../../contexts/AuthProvider";
import { DARK } from "../../contexts/ColorSchemeProvider";
import { avatarSx, cameraContainerSx, overlayBoxSx } from "./styles";

type Props = {
  m?: MantineNumberSize;
  mt?: MantineNumberSize;
  mb?: MantineNumberSize;
  ml?: MantineNumberSize;
  mr?: MantineNumberSize;
};

export const Avatar = ({ m, mt, mb, ml, mr }: Props) => {
  const { user } = useAuth();
  const { hovered, ref } = useHover();
  const { colorScheme } = useMantineColorScheme();
  const camerIconColor = colorScheme === DARK ? "rgba(180, 180, 180)" : "rgba(220, 220, 220)";

  return (
    user && (
      <Box ref={ref} sx={avatarSx} m={m} mt={mt} mb={mb} ml={ml} mr={mr} w={140} h={140}>
        {/*eslint-disable-next-line*/}
        <img src={user.avatar ?? "/default_avatar.png"} alt="User avatar" width={140} height={140} />
        <Transition mounted={hovered} transition="fade" duration={100} timingFunction="ease">
          {() => <Box sx={overlayBoxSx}></Box>}
        </Transition>
        <Box sx={cameraContainerSx}>
          <IconCamera size={30} color={camerIconColor} />
        </Box>
      </Box>
    )
  );
};
