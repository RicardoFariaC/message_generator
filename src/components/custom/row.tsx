import { cn } from "@/lib/utils";
import { ReactNode, ReactPropTypes } from "react";

type RowPropTypes = {
    children: ReactNode;
    className?: string | undefined;
}

export default function Row(props: RowPropTypes) {
    return (
        <div className={cn("flex flex-row md:gap-6", props.className)}>
            {props.children}
        </div>
    );
}