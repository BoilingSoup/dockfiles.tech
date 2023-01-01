import { IconArrowUp } from "@tabler/icons";
import { useMediaQuery, useWindowScroll } from "@mantine/hooks";
import { Affix, Button, Transition } from "@mantine/core";
import { buttonSx } from "./styles";

export const ScrollToTop = () => {
  const [scroll, scrollTo] = useWindowScroll();
  const largeScreen = useMediaQuery("(min-width: 1400px)");
  const asideWidth = 300;

  const clickHandler = () => scrollTo({ y: 0 });

  return (
    <>
      <Affix position={{ bottom: 20, right: largeScreen ? asideWidth + 30 : 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button leftIcon={<IconArrowUp size={16} />} style={transitionStyles} sx={buttonSx} onClick={clickHandler}>
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
    </>
  );
};
