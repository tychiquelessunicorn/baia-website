"use client";

import { useEffect } from "react";

export function Jump({ hash }: { hash: string }) {
  useEffect(() => {
    window.location.replace(`/${hash}`);
  }, [hash]);
  return null;
}
