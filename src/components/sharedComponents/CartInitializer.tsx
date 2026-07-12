"use client";

import { useEffect, useRef } from "react";

export default function CartInitializer() {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
        
        initialized.current = true;
    }
  }, [initialized]);

  return <div className="">

  </div>;
}
