import { Label } from "@radix-ui/react-label";
import Column from "../custom/column";
import { 
    Select, 
    SelectItem, SelectTrigger, 
    SelectContent, SelectValue 
} from "@/components/ui/select";
import { CarIcon, HeartIcon, HomeIcon, HotelIcon } from "lucide-react";
import Row from "../custom/row";
import { SelectProps } from "@radix-ui/react-select";

export enum InsuranceEnum {
    AUTO = "auto",
    RESIDENCIAL = "residencial",
    EMPRESARIAL = "empresarial",
    VIDA = "vida"
}

interface InsurancePropTypes extends SelectProps {
    value: string;
    onValueChange: ((value: string) => void) | undefined
}

export default function InsuranceTypes({value, onValueChange}: InsurancePropTypes) {
    return(
        <Column>
              <Select
                value={value}
                onValueChange={onValueChange}
              >
                <SelectTrigger 
                  className="w-72 text-lg" 
                >
                  <SelectValue 
                    placeholder="Selecione o tipo de seguro"
                  />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value={InsuranceEnum.AUTO}>
                    <Row className="items-center gap-2 text-lg">
                      <CarIcon />
                      Auto
                    </Row>
                  </SelectItem>
                  <SelectItem value={InsuranceEnum.RESIDENCIAL}>
                    <Row className="items-center gap-2 text-lg">
                      <HomeIcon />
                      Residencial
                    </Row>
                  </SelectItem>
                  <SelectItem value={InsuranceEnum.EMPRESARIAL}>
                    <Row className="items-center gap-2 text-lg">
                      <HotelIcon />
                      Empresarial
                    </Row>
                  </SelectItem>
                  <SelectItem value={InsuranceEnum.VIDA}>
                    <Row className="items-center gap-2 text-lg">
                      <HeartIcon />
                      Vida
                    </Row>
                  </SelectItem>
                </SelectContent>
              </Select>
        </Column>
    )
}