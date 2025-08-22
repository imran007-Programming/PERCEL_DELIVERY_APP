
import type { ThemeProviderState } from "@/components/Providers/ThemeProvider"
import { createContext } from "react"


const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)