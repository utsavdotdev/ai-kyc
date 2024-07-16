import React, { useContext, useEffect } from "react";
import {
  Home,
  LineChart,
  Package2,
  PanelLeft,
  Settings,
  ScanFace,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Links from "../components/Links";
import { ContextProvider } from "../config/Context";
import axios from "../config/axios";

const links = [
  {
    to: "/dashboard",
    icon: <Home className="h-5 w-5" />,
    title: "Dashboard",
  },
  {
    to: "/analytics",
    icon: <LineChart className="h-5 w-5" />,
    title: "Analytics",
  },
  {
    to: "/setting",
    icon: <Settings className="h-5 w-5" />,
    title: "Setting",
  },
];

const NavOnly = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken === null && role !== "org") {
      return navigate("/");
    }
  }, []);

  const Logout = async () => {
    const res = await axios.post(
      "/user/logout",
      { refreshToken: refreshToken },
      header
    );
    window.location.reload();
    localStorage.clear();
    setUser([]);
  };

  const { user, setUser } = useContext(ContextProvider);
  const location = useLocation();
  const { pathname } = location;
  const path = pathname.split("/");
  path.shift();
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              to="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <ScanFace className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Kyc Master</span>
            </Link>
            <TooltipProvider>
              {links.map((link, index) => (
                <>
                  <Links
                    key={index}
                    to={link.to}
                    icon={link.icon}
                    title={link.title}
                  />
                </>
              ))}
            </TooltipProvider>
          </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    to="#"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  >
                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">Kyc Master</span>
                  </Link>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    to="/analytics"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <LineChart className="h-5 w-5" />
                    Analytics
                  </Link>
                  <Link
                    to="/setting"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Settings className="h-5 w-5" />
                    Settings
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink to="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                {path[0] === "dashboard" ? null : <BreadcrumbSeparator />}
                {path.map((item, index) => (
                  <>
                    {item === "dashboard" ? null : (
                      <>
                        <BreadcrumbItem key={index}>
                          <BreadcrumbLink to="#">
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        {index === path.length - 1 ? null : (
                          <BreadcrumbSeparator />
                        )}
                      </>
                    )}
                  </>
                ))}
                {/* <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>All Users</BreadcrumbPage>
                </BreadcrumbItem> */}
              </BreadcrumbList>
            </Breadcrumb>
            <div className="relative ml-auto flex-1 md:grow-0"></div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <img
                    src={user?.avatar}
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button variant="ghost" size="sm" onClick={Logout}>
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default NavOnly;
