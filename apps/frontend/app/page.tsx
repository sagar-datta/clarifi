"use client";

import { Button } from "./components/ui/button/Button";
import { useTheme } from "./hooks/useTheme";

export default function Home() {
  const { toggleTheme, theme, mounted } = useTheme();

  return (
    <main className="min-h-screen p-8 bg-background">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">
            Button Variants
          </h1>
          {mounted && (
            <p className="text-muted-foreground">Current theme: {theme}</p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button onClick={toggleTheme}>Default Button</Button>
            <Button variant="destructive" onClick={toggleTheme}>
              Destructive
            </Button>
            <Button variant="outline" onClick={toggleTheme}>
              Outline
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="secondary" onClick={toggleTheme}>
              Secondary
            </Button>
            <Button variant="ghost" onClick={toggleTheme}>
              Ghost
            </Button>
            <Button variant="link" onClick={toggleTheme}>
              Link Style
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Button size="sm" onClick={toggleTheme}>
              Small
            </Button>
            <Button size="default" onClick={toggleTheme}>
              Default Size
            </Button>
            <Button size="lg" onClick={toggleTheme}>
              Large
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
