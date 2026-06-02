"use client";

import { useEffect } from "react";
import { setupReveal } from "@/app/reveal";

export function RevealBoot() {
  useEffect(() => {
    setupReveal();
  }, []);

  return null;
}
