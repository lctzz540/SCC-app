import { useState } from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export interface Form3Data {
  name?: string;
  phoneNumber?: string;
}

interface Props {
  onFormChange: (data: Form3Data) => void;
  data: Form3Data;
}

export default function Form3({ onFormChange, data }: Props) {
  const [formData, setFormData] = useState<Form3Data>({
    name: data.name || "",
    phoneNumber: data.phoneNumber || "",
  });

  const handleInputChange = (id: keyof Form3Data, value: string) => {
    const newData = { ...formData, [id]: value };
    setFormData(newData);
    onFormChange(newData);
  };

  return (
    <>
      <FormControl mt="2%">
        <FormLabel htmlFor="name" fontWeight={"md"}>
          Tên
        </FormLabel>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="phoneNumber" fontWeight={"md"}>
          Số điện thoại
        </FormLabel>
        <Input
          id="phoneNumber"
          value={formData.phoneNumber}
          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
        />
      </FormControl>
    </>
  );
}
