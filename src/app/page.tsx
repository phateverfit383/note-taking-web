"use client";

import Head from "next/head";
import * as React from "react";
import "@/lib/env";

import ArrowLink from "@/components/links/ArrowLink";
import ButtonLink from "@/components/links/ButtonLink";
import UnderlineLink from "@/components/links/UnderlineLink";
import UnstyledLink from "@/components/links/UnstyledLink";

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Logo from "~/svg/Logo.svg";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const [mode, setMode] = React.useState<"dark" | "light">("dark");

  function toggleMode() {
    return mode === "dark" ? setMode("light") : setMode("dark");
  }

  const router = useRouter();

  // redirect to notes page
  useEffect(() => {
    router.push("/notes");
  }, []);

  return <></>;
}
