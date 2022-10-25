import { CSSObject, MantineTheme, NavLink as MantineNavLink, NavLinkProps } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { colorSchemeHandler } from "../../theme/color-scheme-handler";

const bodyStyles: CSSObject = {
  textAlign: "center",
};

const labelStyles: CSSObject = {
  fontWeight: "bold",
  fontSize: "1rem",
};

const navLinkStyles = {
  body: bodyStyles,
  label: labelStyles,
};

const hoverStyles = ({ colorScheme, colors }: MantineTheme) => ({
  "&:hover": { backgroundColor: colorSchemeHandler(colorScheme, { light: colors.gray[1], dark: colors.slate[8] }) },
});

type Props = {
  href?: string;
  text: string;
  children?: ReactElement;
};

export const NavLink = ({ href, text, children }: Props) => {
  const router = useRouter();

  const sharedProps: NavLinkProps = {
    label: text,
    active: router.pathname === href,
    variant: "filled",
    color: "navy",
    p: "lg",
  };

  if (href) {
    return (
      <Link href={href} passHref>
        <MantineNavLink styles={{ ...navLinkStyles }} sx={hoverStyles} {...sharedProps} />
      </Link>
    );
  }

  return (
    <MantineNavLink
      styles={{ ...navLinkStyles, rightSection: { position: "absolute", right: 10 } }}
      sx={hoverStyles}
      {...sharedProps}
    >
      {children}
    </MantineNavLink>
  );
};
