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
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = React.useState(false);
  const pathname = usePathname();
  const { isLoaded, isSignedIn } = useUser();

  // Animation values
  const sidebarWidth = isDesktopCollapsed ? 72 : 240;
  const animationConfig = {
    type: "spring",
    stiffness: 200,
    damping: 25,
  };

  // Don't show anything while loading auth state
  if (!isLoaded) {
    return null;
  }

  return (
    <div className="relative flex min-h-screen">
      {isSignedIn && (
        <>
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
          <motion.aside
            layout
            animate={{ width: sidebarWidth }}
            transition={animationConfig}
            className={cn(
              "fixed left-0 top-0 h-screen hidden lg:flex flex-col border-r bg-background z-40"
            )}
          >
            <div className="flex h-16 items-center justify-between border-b px-4">
              <Link href="/" className={cn("flex items-center")}>
                <span
                  className={cn(
                    "text-lg font-semibold",
                    isDesktopCollapsed && "opacity-0"
                  )}
                >
                  ClariFi
                </span>
              </Link>
            </div>
            <DesktopSidebar isCollapsed={isDesktopCollapsed} />
          </motion.aside>

          {/* Collapse button positioned outside the sidebar */}
          <motion.div
            className="fixed top-1/2 -translate-y-1/2 z-50 hidden lg:block"
            animate={{ left: sidebarWidth }}
            transition={animationConfig}
          >
            <Collapse
              isCollapsed={isDesktopCollapsed}
              onToggle={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
            />
          </motion.div>
        </>
      )}

      {/* Main content area */}
      <div
        style={{
          paddingLeft: isSignedIn ? `${sidebarWidth}px` : 0,
        }}
        className={cn("flex-1 flex flex-col bg-background")}
      >
        <div
          style={{
            width: isSignedIn ? `calc(100% - ${sidebarWidth}px)` : "100%",
          }}
          className={cn("fixed top-0 right-0 z-40 bg-background h-16 border-b")}
        >
          <Header className="h-full" />
        </div>
        <div className="mt-16 flex-1">
          <div className="p-4 md:p-8">
            <AnimatePresence mode="wait" initial={false}>
              {children}
            </AnimatePresence>
          </div>
        </div>
      </div>
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
