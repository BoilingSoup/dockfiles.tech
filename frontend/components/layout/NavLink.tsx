import { Center, Text, NavLink as MantineNavLink } from "@mantine/core";
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

  if (href) {
    return (
      <Link href={href} passHref>
        <MantineNavLink
          label={text}
          styles={{ body: { textAlign: "center" } }}
          active={router.pathname === href}
          variant="filled"
          color="navy"
        />
      </Link>
    );
  }

  return (
    <MantineNavLink
      label={text}
      styles={{ body: { textAlign: "center" }, rightSection: { position: "absolute", right: 10 } }}
      active={router.pathname === href}
      variant="filled"
      color="navy"
    >
      {children}
    </MantineNavLink>
  );
};
