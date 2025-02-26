"use client";

import { Button } from "./components/ui/button/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card/Card";
import { useTheme } from "./hooks/useTheme";

export default function Home() {
  const { toggleTheme, theme, mounted } = useTheme();

  return (
    <main className="min-h-screen p-8 bg-background">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Button Showcase</CardTitle>
            <CardDescription>
              A showcase of all button variants with theme switching
              functionality.
              {mounted && ` Current theme: ${theme}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Default variants */}
            <Card>
              <CardHeader>
                <CardTitle>Variants</CardTitle>
                <CardDescription>
                  Different button style variants available in the system.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={toggleTheme}>Default</Button>
                  <Button variant="secondary" onClick={toggleTheme}>
                    Secondary
                  </Button>
                  <Button variant="destructive" onClick={toggleTheme}>
                    Destructive
                  </Button>
                  <Button variant="outline" onClick={toggleTheme}>
                    Outline
                  </Button>
                  <Button variant="ghost" onClick={toggleTheme}>
                    Ghost
                  </Button>
                  <Button variant="link" onClick={toggleTheme}>
                    Link
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Sizes */}
            <Card>
              <CardHeader>
                <CardTitle>Sizes</CardTitle>
                <CardDescription>
                  Button size variations from small to large.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm" onClick={toggleTheme}>
                    Small
                  </Button>
                  <Button size="default" onClick={toggleTheme}>
                    Default
                  </Button>
                  <Button size="lg" onClick={toggleTheme}>
                    Large
                  </Button>
                  <Button size="icon" onClick={toggleTheme}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2" />
                      <path d="M12 20v2" />
                      <path d="m4.93 4.93 1.41 1.41" />
                      <path d="m17.66 17.66 1.41 1.41" />
                      <path d="M2 12h2" />
                      <path d="M20 12h2" />
                      <path d="m6.34 17.66-1.41 1.41" />
                      <path d="m19.07 4.93-1.41 1.41" />
                    </svg>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* With icons */}
            <Card>
              <CardHeader>
                <CardTitle>With Icons</CardTitle>
                <CardDescription>
                  Buttons with icons for enhanced visual feedback.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-4">
                  <Button onClick={toggleTheme}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 3v2" />
                      <path d="M12 19v2" />
                      <path d="M4.93 4.93l1.41 1.41" />
                      <path d="M17.66 17.66l1.41 1.41" />
                      <path d="M2 12h2" />
                      <path d="M20 12h2" />
                      <path d="M6.34 17.66l-1.41 1.41" />
                      <path d="M19.07 4.93l-1.41 1.41" />
                    </svg>
                    Toggle theme
                  </Button>
                  <Button variant="secondary" onClick={toggleTheme}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                    Toggle theme
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Click any button to toggle between light and dark theme
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
