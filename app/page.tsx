"use client";

import { SlideContainer } from "@/components/SlideContainer";
import { slides } from "@/data/slides";

export default function Home() {
  return <SlideContainer slides={slides} />;
}
