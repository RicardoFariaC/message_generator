"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Row from "@/components/custom/row";
import Column from "@/components/custom/column";
import { DatePicker } from "@/components/custom/datepicker";
import { useEffect, useState } from "react";
import InputMoney from "@/components/custom/moneyinput";
import CarPlateInput from "@/components/custom/carplateinput";
import InsuranceTypes, { InsuranceEnum } from "@/components/blocks/SecuritySelect";
import MultipleSelector, { Option } from "@/components/custom/multiselect";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import img from "../assets/download.png"
import Image from "next/image";

const PaymentTypes = [
  { label: "Débito em conta", value: "débito em conta" },
  { label: "Crédito", value: "crédito" },
  { label: "Boleto", value: "boleto" },
]

const insuranceList = [
  "azul", "tokio marine", "sompo", "allianz", 
  "porto seguro", "suhai", "hdi", "sul américa", 
  "zurich", "bradesco", "liberty"
]

export default function Home() {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [employee, setEmployee] = useState<string>("");
  const [insuranceCompany, setInsuranceCompany] = useState<string>("");
  const [insurance, setInsurance] = useState<string>("");
  const [currency, setCurrency] = useState<number>(0.00);
  const [plate, setPlate] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [cep, setCEP] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [useType, setUseType] = useState<string>("");
  const [isBelow25, setIsBelow25] = useState<boolean>(false);
  const [payment, setPayment] = useState<Option[]>([]);
  const [paymentTimes, setPaymentTimes] = useState<number[]>([]);
  const [generateMessage, setGenerateMessage] = useState<boolean>(false);
  const [messageInfo, setMessageInfo] = useState<string>("");

  function setPaymentTimesInPosition(e: number, id: number) {
    let items = [...paymentTimes]
    let item = items[id];
    item = e;
    items[id] = item;
    setPaymentTimes(items);
  }

  function setPaymentDebug(e: Option[]) {
    setPayment(e);
  }

  const handleInsuranceTypeChange = (e: string) => {
    setInsurance(e);
    if(insurance == InsuranceEnum.AUTO) setAddress("");
    else if(insurance == InsuranceEnum.VIDA) {
      setAddress("");
      setModel("");
      setPlate("");
    } else {
      setModel("");
      setPlate("");
    }
  }

  const handleClipboardCopy = () => {
    navigator.clipboard.writeText(messageInfo);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGenerateMessage(true);

    const message: string = `
🚨 SEU SEGURO ${insurance.toUpperCase()} VENCE NO DIA ${date.toLocaleDateString("pt-BR")} 🚨
🔐 ${name} 

A Renovação do seu seguro chegou, para não ficar sem seguro estamos aqui para lembra-la(o)
Segue abaixo um resumo para analisar:

🥇 ${insuranceCompany.toUpperCase()}
💲 R$ ${currency.toFixed(2).replace(".", ",")}
${payment.map((pay, id): string => {
  return `✅ Até ${paymentTimes[id]} x sem juros no ${pay.value}\n`
}).join("")}
${insurance == InsuranceEnum.AUTO ?
  `⚠️ *CONFIRME O VEÍCULO E O PERFIL*
🚘 Modelo: ${model}        
🎟 Placa: ${plate}
Uso particular, comercial ou motorista de app? ${[useType.charAt(0).toUpperCase() + useType.slice(1)]}
Condutor menor de 25 anos? ${isBelow25 ? "Sim" : "Não"}
  ` 
  : insurance == InsuranceEnum.EMPRESARIAL || insurance == InsuranceEnum.RESIDENCIAL ?
  `
⚠ CONFIRME SEU ENDEREÇO e PERFIL
🏡 ${address} `
  :
  ``
}
CEP: ${[cep.slice(0, cep.length - 3), "-", cep.slice(cep.length-3)].join("")}

Em anexo para sua análise e aprovação. Planilha completa com PERFIL, PARCELAMENTOS E VEICULO.
🥇365Vale Seguros esta sempre a sua disposição🥇

Aguardamos seu retorno e aprovação
Atenciosamente,

${employee}
    `
    console.log(message)
    setMessageInfo(message);
  }

  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-24 pt-0 border-2">
      <Image
        className="w-32 m-12 select-none"
        draggable={false}
        src={img}
        alt="365 vale seguros"
      />
      <Card>
        <CardHeader>
          <CardTitle>
            Entre com as informações do cliente
          </CardTitle>
          <CardDescription>
            No final, clique no botão destacado para gerar a mensagem.
          </CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          <form className="flex flex-col mt-2" onSubmit={handleSubmit}>
            <Column className="gap-6">
              <Row>
                <Column>
                  <Label>Vencimento:</Label>
                  <DatePicker
                    mode="single"
                    value={date}
                    onSelect={(e) => setDate(e!)}
                  />
                </Column>
                <Column>
                  <Label>Nome do segurado:</Label>
                  <Input 
                    placeholder="Fulano da Silva"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </Column>
                <Column>
                  <Label>Custo do seguro</Label>
                  <InputMoney
                    value={currency}
                    onChange={(e) => setCurrency(Number.parseFloat(e.target.value))}
                  />
                </Column>
              </Row>
              <Row> 
                <Column>
                  <Label>Funcionário:</Label>
                  <Input
                    className="border-2"
                    placeholder="Fulano da Silva"
                    value={employee}
                    onChange={(e) => setEmployee(e.target.value)}
                    />
                </Column>
                <Column>
                      <Label>CEP:</Label>
                      <Input
                        placeholder="00000000"
                        maxLength={8}
                        type="number"
                        value={cep}
                        onChange={(e) => setCEP(e.target.value)}
                        />
                    </Column> 
                <Column>
                  <Label>Seguro:</Label>
                  <Select
                    value={insuranceCompany}
                    onValueChange={(e) => setInsuranceCompany(e)}
                  >
                    <SelectTrigger className="w-96 text-lg">
                      <SelectValue
                        placeholder="Selecione o seguro"
                      />
                      <SelectContent>
                        {
                          insuranceList.sort().map((insuranceOne, id) => {
                            return (
                              <SelectItem key={insuranceOne} value={insuranceOne} className="text-lg">
                                {insuranceOne.toUpperCase()}
                              </SelectItem>
                            )
                          })
                        }
                      </SelectContent>
                    </SelectTrigger>
                  </Select>
                </Column>
              </Row>
              <Row>
              <Column>
                  <Label>Tipo de seguro</Label>
                  <InsuranceTypes
                    value={insurance}
                    onValueChange={(e) => handleInsuranceTypeChange(e)}
                  ></InsuranceTypes>
                </Column>
                {insurance == InsuranceEnum.AUTO ?
                  <>
                    <Column>
                      <Label>Placa:</Label>
                      <CarPlateInput
                        placeholder="AAA0000"
                        value={plate}
                        onChange={(e) => setPlate(e.target.value)}
                      />
                    </Column>
                    <Column>
                      <Label>Modelo:</Label>
                      <Input
                        placeholder="Fiat Uno 2010" 
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                      />
                    </Column>
                  </>
                  : insurance == InsuranceEnum.RESIDENCIAL || insurance == InsuranceEnum.EMPRESARIAL ?
                    <Column>
                      <Label>Endereço:</Label>
                      <Input
                        className=""
                        placeholder="Rua das Letras, 123"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        />
                    </Column> 
                  : ""
                }
              </Row>
              {
                insurance == InsuranceEnum.AUTO ?
                  <Row className="items-start">
                  <Column>
                    <Label className="">Seguro para condutor abaixo dos 25 anos?</Label>
                    <Checkbox 
                      className="h-5 w-5" 
                      checked={isBelow25}
                      onCheckedChange={() => setIsBelow25(!isBelow25)}
                    />
                  </Column>
                  <Column>
                    <Label>Tipo de uso:</Label>
                    <Select
                      value={useType}
                      onValueChange={(e) => setUseType(e)}
                    >
                      <SelectTrigger className="text-lg w-96">
                        <SelectValue
                          placeholder="Particular, Comercial ou APP?"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className="text-lg" value="particular">Particular</SelectItem>
                        <SelectItem className="text-lg" value="comercial">Comercial</SelectItem>
                        <SelectItem className="text-lg" value="app">App</SelectItem>
                      </SelectContent>
                    </Select>
                  </Column>
                </Row> :
                ""
              }
              <Row>
                <Column>
                  <Label>Forma de pagamento:</Label>
                  <MultipleSelector
                    className="w-auto"
                    placeholder="Escolha as formas de pagamento..."
                    defaultOptions={PaymentTypes}
                    value={payment}
                    onChange={setPaymentDebug}
                  />
                </Column>
              </Row>
              {
                payment.map((payMethod, id) => {
                  return (
                  <Column>
                    <Label>Quantas vezes sem juros? {payMethod.label}</Label>
                    <Input
                      key={id}
                      value={paymentTimes[id]}
                      onChange={(e) => setPaymentTimesInPosition(parseInt(e.target.value), id)}
                      type="number"
                      placeholder="12"
                    ></Input>
                  </Column>
                      
                  )
                })
              }
            </Column>
            <Separator className="mt-5 mb-5"/>
            <Row className="flex-row-reverse">
              <Button type="submit" >Gerar mensagem</Button>
            </Row>
          </form>
        </CardContent>
      </Card>

      {messageInfo != "" ?
        <Card className="mt-5 whitespace-pre-line w-auto flex flex-row">
          <CopyIcon 
            className="m-5 mb-0 active:text-slate-950 hover:text-slate-400"
            onClick={() => handleClipboardCopy()}
          />
          <CardContent className="items-start">
            {messageInfo}
          </CardContent>
        </Card>
        :
        ""
      }
    </main>
  );
}
