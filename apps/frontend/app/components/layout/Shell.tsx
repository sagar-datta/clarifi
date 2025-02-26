"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet/Sheet";
import { ScrollArea } from "../ui/scroll-area/ScrollArea";
import { Separator } from "../ui/separator/Separator";
import { Button } from "../ui/button/Button";
import { MainNav } from "./Sidebar/MainNav";
import { QuickStats } from "./Sidebar/QuickStats";
import { Collapse } from "./Sidebar/Collapse";
import { Header } from "./Header";
import { cn } from "@/app/lib/utils";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = React.useState(false);
  const pathname = usePathname();

  return (
    <div className="relative flex min-h-screen transition-colors duration-300">
      {/* Mobile Trigger */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-4 top-4 z-50"
          >
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="border-b px-6 py-4">
            <SheetTitle>ClariFi</SheetTitle>
          </SheetHeader>
          <MobileSidebar />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen hidden lg:flex flex-col border-r bg-background transition-all duration-300 z-40",
          isDesktopCollapsed ? "w-[80px]" : "w-72"
        )}
      >
        <div className="relative border-b px-6 py-4 h-16">
          <h2
            className={cn(
              "text-lg font-semibold transition-opacity duration-300",
              isDesktopCollapsed ? "opacity-0" : "opacity-100"
            )}
          >
            ClariFi
          </h2>
          <Collapse
            isCollapsed={isDesktopCollapsed}
            onToggle={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
          />
        </div>
        <DesktopSidebar isCollapsed={isDesktopCollapsed} />
      </aside>

      {/* Main content area */}
      <main
        className={cn(
          "flex-1 flex flex-col transition-all duration-300 bg-background",
          "lg:ml-[80px]",
          !isDesktopCollapsed && "lg:ml-72"
        )}
      >
        <div
          className="fixed top-0 right-0 z-30 border-b bg-background h-16 transition-all duration-300"
          style={{
            width: `calc(100% - ${isDesktopCollapsed ? "80px" : "288px"})`,
          }}
        >
          <Header className="border-b-0" />
        </div>
        <div className="mt-[64px] flex-1 transition-colors duration-300">
          <div className="p-4 md:p-8">
            <AnimatePresence mode="wait" initial={false}>
              {children}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

function MobileSidebar() {
  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="flex flex-col gap-4 p-6">
        <MainNav />
        <Separator />
        <QuickStats />
      </div>
    </ScrollArea>
  );
}

function DesktopSidebar({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <ScrollArea className="flex-1">
      <div className={cn("flex flex-col gap-4", isCollapsed ? "p-2" : "p-6")}>
        <MainNav isCollapsed={isCollapsed} />
        <Separator />
        <QuickStats isCollapsed={isCollapsed} />
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
