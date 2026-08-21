"use client";

import { useSyncExternalStore } from "react";

/**
 * "Shukriya, Ahmed." on the confirmation page.
 *
 * The name used to travel in the URL as ?name=…, which put the name of someone
 * arranging medical care into analytics page paths, browser history and any
 * outbound referrer header. A small leak for no benefit — the page is noindex
 * and nobody shares it.
 *
 * It rides in sessionStorage instead: written by the form immediately before
 * navigating, read here. Not cleared after reading — sessionStorage dies with
 * the tab anyway, and the only cost of leaving it is that returning to this
 * page in the same tab greets the person by their own name again, which is
 * harmless.
 *
 * Read with useSyncExternalStore rather than an effect: storage is an external
 * system, the server snapshot is empty so static generation is preserved, and
 * React swaps in the client value during hydration with no mismatch.
 */
const KEY = "sc:lead-name";

export function rememberName(name: string) {
  try {
    sessionStorage.setItem(KEY, name);
  } catch {
    /* private mode or blocked storage — the greeting is a nicety, not a feature */
  }
}

/** No store to subscribe to: the value is written once, before this page loads. */
const subscribe = () => () => {};

const getSnapshot = (): string => {
  try {
    return sessionStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
};

const getServerSnapshot = (): string => "";

export default function ConfirmGreeting() {
  const name = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!name) return null;

  return (
    <>
      <span data-en>Shukriya, {name}.</span>
      <span data-ur lang="ur" dir="rtl" className="urdu">شکریہ، {name}۔</span>
    </>
  );
}
