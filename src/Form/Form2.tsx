import { useState } from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export interface Form2Data {
  floors?: string;
  bedrooms?: string;
  bathrooms?: string;
}

interface Props {
  onFormChange: (data: Form2Data) => void;
  data: Form2Data;
}

export default function Form2({ onFormChange, data }: Props) {
  const [formData, setFormData] = useState<Form2Data>({
    floors: data.floors || "",
    bedrooms: data.bedrooms || "",
    bathrooms: data.bathrooms || "",
  });

  const handleInputChange = (id: keyof Form2Data, value: string) => {
    const newData = { ...formData, [id]: value };
    setFormData(newData);
    onFormChange(newData);
  };

  return (
    <>
      <FormControl mt="2%">
        <FormLabel htmlFor="floors" fontWeight={"md"}>
          Số tầng
        </FormLabel>
        <Input
          id="floors"
          value={formData.floors}
          onChange={(e) => handleInputChange("floors", e.target.value)}
        />
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="bedrooms" fontWeight={"md"}>
          Số phòng ngủ
        </FormLabel>
        <Input
          id="bedrooms"
          value={formData.bedrooms}
          onChange={(e) => handleInputChange("bedrooms", e.target.value)}
        />
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="bathrooms" fontWeight={"md"}>
          Số phòng tắm
        </FormLabel>
        <Input
          id="bathrooms"
          value={formData.bathrooms}
          onChange={(e) => handleInputChange("bathrooms", e.target.value)}
        />
      </FormControl>
    </>
  );
}
