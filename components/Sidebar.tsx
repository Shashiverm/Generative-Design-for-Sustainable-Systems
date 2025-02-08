'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, BarChart2, Settings, HelpCircle, FolderPlus } from "lucide-react"

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Projects", href: "/projects", icon: BarChart2 },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen flex-col border-r bg-gray-100/40 dark:bg-gray-800/40">
      <div className="flex h-14 items-center border-b px-4">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          <FolderPlus className="h-6 w-6" />
          <span>New Project</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid items-start px-4 py-4">
          {navItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn("w-full justify-start gap-2", {
                  "bg-gray-200 dark:bg-gray-700": pathname === item.href,
                })}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}

