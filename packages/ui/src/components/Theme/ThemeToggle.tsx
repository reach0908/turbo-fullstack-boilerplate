"use client";

import { Button } from "@workspace/ui/components/button";
import { MoonIcon } from "@workspace/ui/components/moon";
import { SunIcon } from "@workspace/ui/components/sun";
import { useTheme } from "next-themes";


export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <SunIcon /> : <MoonIcon />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
