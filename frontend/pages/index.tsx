import type { NextPage } from "next";
import { AppShell, MediaQuery, Aside, Text } from "@mantine/core";
import { useState } from "react";
import { Header } from "../components/layout/Header";
import { Navbar } from "../components/layout/Navbar";
import Head from "next/head";
import { colorSchemeHandler } from "../theme/color-scheme-handler";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dockfiles.io | Home</title>
      </Head>
    </>
  );
};

export default Home;
