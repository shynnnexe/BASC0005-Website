import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "./utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-auto items-center justify-start gap-1 bg-transparent",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap px-3 sm:px-4 md:px-6 py-2 text-xs sm:text-sm font-medium ring-offset-white transition-all rounded-full",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#5ca4d8] data-[state=active]:to-[#4a90e2] data-[state=active]:text-white",
      "data-[state=inactive]:text-[#546e7a] hover:text-[#4a90e2] hover:bg-[#4a90e2]/10",
      "dark:data-[state=active]:from-[#4a90e2] dark:data-[state=active]:to-[#3d7ec0]",
      "dark:data-[state=inactive]:text-[#9eb3c8] dark:hover:text-[#5ca4d8]",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-8 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9caea9] focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }