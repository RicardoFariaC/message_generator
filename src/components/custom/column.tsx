import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ColumnPropTypes {
    children: ReactNode;
    className?: string | undefined;
}

export default function Column(props: ColumnPropTypes) {
    return (
        <div className={cn(`flex flex-col gap-2`, props.className)}>
            {props.children}
        </div>
    );
}