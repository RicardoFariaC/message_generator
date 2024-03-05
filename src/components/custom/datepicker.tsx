"use client"

import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ReactPropTypes, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { DayPickerSingleProps, SelectSingleEventHandler } from "react-day-picker";

interface DatePickerProps extends DayPickerSingleProps {
    value: Date;
    onSelect: SelectSingleEventHandler | undefined;
}

export function DatePicker({value, onSelect, ...props}: DatePickerProps) {
    const [date, setDate] = useState<Date>();

    return (
        <Popover>
            <PopoverTrigger asChild className="w-72 flex justify-start text-lg">
                <Button
                    size={"lg"}
                    variant={"secondary"}
                >
                    <CalendarIcon className="mr-2 h-4 w-4"/>
                    {value ? format(value, "PPP", {locale: ptBR}) : <span>Defina a data</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    selected={value}
                    onSelect={onSelect}
                    locale={ptBR}
                    initialFocus
                    {...props}
                />
            </PopoverContent>
        </Popover>
    );
}