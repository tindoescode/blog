import React, { memo, ReactElement } from "react";
import clsx from "clsx";
// import shield check heroicon-outline
import { ShieldCheckIcon } from "@heroicons/react/outline";

interface Props {}

function AdminNav({}: Props): ReactElement {
  return (
    <div
      className={clsx([
        "sticky top-0 left-0",
        "flex mx-0 px-2 py-1 z-50",
        // "bg-gray-300 bg-opacity-50 shadow-md",
      ])}
    >
      <Button>
        <ShieldCheckIcon className="w-4 h-4" />
        Admin Panel
      </Button>

      <style jsx>{`
        .z-9999 {
          z-index: 9999;
        }
      `}</style>
    </div>
  );
}

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
}

function Button({ children }: ButtonProps): ReactElement {
  return (
    <div
      className={clsx([
        "p-2 text-white bg-green-400 hover:bg-green-300 transition rounded-xl cursor-pointer flex items-center gap-1",
      ])}
    >
      {children}
    </div>
  );
}

export default memo(AdminNav);
