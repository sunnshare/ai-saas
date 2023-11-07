"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("d38d0063-332f-4452-b65b-b2f82f9026bb")
  }, [])

  return null;
}