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

const navLinkSx = ({ colors, colorScheme, fn, shadows }: MantineTheme): CSSObject => {
  const navy = colors.navy[8];
  const blue = colors.blue[9];
  const slate = colors.slate[8];

  return {
    boxShadow: shadows.sm,
    "&:hover": {
      backgroundColor: colorSchemeHandler(colorScheme, { light: colors.cyan[2], dark: slate }),
      "&[data-active]": {
        backgroundColor: colorSchemeHandler(colorScheme, {
          light: fn.darken(blue, 0.05),
          dark: fn.lighten(navy, 0.05),
        }),
      },
    },
    "&[data-active]": {
      backgroundColor: colorSchemeHandler(colorScheme, { light: blue, dark: navy }),
    },
  };
};

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
    p: "lg",
  };

  if (href !== undefined) {
    return (
      <Link href={href} passHref>
        <MantineNavLink styles={{ ...navLinkStyles }} sx={navLinkSx} {...sharedProps} />
      </Link>
    );
  }

  return (
    <MantineNavLink
      styles={{ ...navLinkStyles, rightSection: { position: "absolute", right: 10 } }}
      sx={navLinkSx}
      {...sharedProps}
    >
      {children}
    </MantineNavLink>
  );
};
