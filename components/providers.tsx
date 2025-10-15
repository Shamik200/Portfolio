"use client"

import { ThemeProvider } from "next-themes"
import { type ReactNode } from "react"

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      forcedTheme="dark"
      disableTransitionOnChange={false}
    >
      {children}
    </ThemeProvider>
  )
}