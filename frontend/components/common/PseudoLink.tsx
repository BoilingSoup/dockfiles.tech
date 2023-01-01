import { MouseEventHandler } from "react";

type Props = {
  href: string;
  children: JSX.Element;
};

/**
 * PseudoLink is a wrapper component to add the browser-default href previews on mouse hover.
 * Redirect to href on click is disabled. Useful for wrapping buttons that go to another page.
 **/
export const PseudoLink = ({ href, children }: Props) => {
  const noUnderline = { textDecoration: "none" };
  const preventDefaultHandler: MouseEventHandler<HTMLAnchorElement> = (event) => event.preventDefault();

  return (
    <a href={href} style={noUnderline} onClick={preventDefaultHandler}>
      {children}
    </a>
  );
};
