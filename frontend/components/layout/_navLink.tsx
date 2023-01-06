import { NavLink as MantineNavLink, NavLinkProps } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { navLinkStyles, navLinkSx } from "./styles";

type Props = {
  href?: string;
  text: string;
  children?: ReactElement;
  disabled?: boolean;
};

export const NavLink = ({ href, text, children, disabled = false }: Props) => {
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
        <MantineNavLink styles={navLinkStyles} sx={navLinkSx} {...sharedProps} disabled={disabled} />
      </Link>
    );
  }

  return (
    <MantineNavLink
      styles={{ ...navLinkStyles, rightSection: { position: "absolute", right: 10 } }}
      sx={navLinkSx}
      {...sharedProps}
      childrenOffset={0}
      disabled={disabled}
    >
      {children}
    </MantineNavLink>
  );
};
