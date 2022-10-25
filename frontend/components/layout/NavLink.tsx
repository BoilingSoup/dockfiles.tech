import { NavLink as MantineNavLink, NavLinkProps } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

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
        <MantineNavLink styles={{ body: { textAlign: "center" } }} {...sharedProps} />
      </Link>
    );
  }

  return (
    <MantineNavLink
      styles={{ body: { textAlign: "center" }, rightSection: { position: "absolute", right: 10 } }}
      {...sharedProps}
    >
      {children}
    </MantineNavLink>
  );
};
