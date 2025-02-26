"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet/Sheet";
import { NavigationMenu } from "../ui/navigation-menu/NavigationMenu";
import { ScrollArea } from "../ui/scroll-area/ScrollArea";
import { Separator } from "../ui/separator/Separator";
import { Button } from "../ui/button/Button";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  return (
    <div className="relative flex min-h-screen">
      {/* Mobile Trigger */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="absolute left-4 top-4">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="px-6 pt-6">
            <SheetTitle>ClariFi Menu</SheetTitle>
          </SheetHeader>
          <MobileSidebar />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col border-r">
        <DesktopSidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
}

function MobileSidebar() {
  return (
    <ScrollArea className="h-full py-6">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">ClariFi</h2>
          <NavigationMenu />
        </div>
        <Separator />
        <div className="px-3 py-2">{/* Quick stats will go here */}</div>
      </div>
    </ScrollArea>
  );
}

function DesktopSidebar() {
  return (
    <ScrollArea className="flex-1 py-6">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">ClariFi</h2>
          <NavigationMenu />
        </div>
        <Separator />
        <div className="px-3 py-2">{/* Quick stats will go here */}</div>
      </div>
    </ScrollArea>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
