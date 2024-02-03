"use client";

import { motion } from "framer-motion";
import CountingNumbers from "@/components/shared/counting-numbers";

export default function Discount() {
  return (
    <div className="relative h-full w-full text-5xl text-gray-500">
      <CountingNumbers
        value={75}
        duration={2500}
        className="absolute inset-0 mx-auto flex items-center justify-center font-display text-5xl text-gray-500"
      />%
    </div>
  );
}
