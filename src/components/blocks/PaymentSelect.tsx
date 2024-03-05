import { SelectProps } from "@radix-ui/react-select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export enum PaymentTypes {
    CREDITO = "credito",
    DEBITO = "debito",
    BOLETO = "boleto",
}

interface PaymentSelectPropTypes extends SelectProps {
    value: string;
    onValueChange: ((value: string) => void) | undefined
}

export default function PaymentSelect({value, onValueChange}: PaymentSelectPropTypes) {
    return(
        <Select
            value={value}
            onValueChange={onValueChange}
        >
        <SelectTrigger className="w-72">
          <SelectValue placeholder="Selecione a forma de pagamento" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={PaymentTypes.CREDITO}>Crédito</SelectItem>
          <SelectItem value={PaymentTypes.DEBITO}>Débito</SelectItem>
          <SelectItem value={PaymentTypes.BOLETO}>Boleto</SelectItem>
        </SelectContent>
      </Select>
    )
}