"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function UserProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}
