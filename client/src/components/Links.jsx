import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, useLocation } from "react-router-dom";
const Links = ({ to, icon, title }) => {
  const location = useLocation();
  const { pathname } = location;

  const style =
    pathname === to
      ? "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
      : "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8";
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to={to} className={style}>
            {icon}
            <span className="sr-only">{title}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{title}</TooltipContent>
      </Tooltip>
    </>
  );
};

export default Links;
