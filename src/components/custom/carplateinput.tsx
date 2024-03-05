import { useEffect, useState } from "react";
import { Input, InputProps } from "../ui/input";

interface CarPlateInputPropType extends InputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CarPlateInput({value, onChange, ...props}: CarPlateInputPropType) {
    const [plateValue, setPlateValue] = useState<string>(`${value}`);
    
    useEffect(() => {
        setPlateValue(value)
    }, [value])
    
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...event,
            target: {
                ...event.target,
                value: event.target.value.toUpperCase()
            }
        })
    }
    
    return (
        <Input
            maxLength={7}
            value={plateValue}
            onChange={handleOnChange}
            {...props}
        />
    );
}