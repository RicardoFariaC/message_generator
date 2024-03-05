import { InputProps } from "react-day-picker";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";

interface InputMoneyPropType extends InputProps {
    value: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    currency?: string;
};

export default function InputMoney({value, onChange, currency = "R$", ...props }: InputMoneyPropType) {
    const [currentValue, setCurrentValue] = useState<string>(`${value}`);    
    useEffect(() => {
        const valueString = `${value}`;

        if(!/\D/.test(valueString.replace(".", ""))) {
            setCurrentValue(value.toFixed(2).toString().replace(".", ","));
        }
    }, [value])

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valueRemoved = event.target.value.replace(",", "");
        const strSize = valueRemoved.length - 2;
        const newValue = [
            valueRemoved.slice(0, strSize),
            ".",
            valueRemoved.slice(strSize)
        ].join("");
        onChange({
            ...event,
            target: {
                ...event.target,
                value: newValue
            }
        });
    } 
    
    return (
    <div className="relative flex items-center max-w-2xl ">
        <div className="absolute left-2 h-6 w-4 transform">{currency}</div>        
        <Input
            placeholder="1.200,00"
            className="pl-8"
            value={currentValue}
            onChange={handleOnChange}
            {...props}
        />
    </div>
    );
}