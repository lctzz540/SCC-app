import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  RadioGroup,
  Radio,
  Textarea,
} from "@chakra-ui/react";

export interface Form1Data {
  type?: string;
  description?: string;
  location?: string;
  area?: string;
  price?: string;
  amenities?: string;
}

interface Props {
  onFormChange: (data: Form1Data) => void;
  data: Form1Data;
}

export default function Form1({ onFormChange, data }: Props) {
  const [formData, setFormData] = useState<Form1Data>({
    type: data.type || "",
    description: data.description || "",
    location: data.location || "",
    area: data.area || "",
    price: data.price || "",
    amenities: data.amenities || "",
  });

  const handleInputChange = (id: string, value: string) => {
    const newData = { ...formData, [id]: value };
    setFormData(newData);
    onFormChange(newData);
  };

  return (
    <>
      <FormControl mr="5%" mb={5}>
        <FormLabel htmlFor="type" fontWeight={"md"}>
          Loại bất động sản
        </FormLabel>
        <RadioGroup
          value={formData.type}
          onChange={(value) => handleInputChange("type", value)}
        >
          <Stack direction="row" spacing={12}>
            <Radio value="Nhà ở">Nhà ở</Radio>
            <Radio value="Căn hộ">Căn hộ</Radio>
            <Radio value="Đất">Đất</Radio>
            <Radio value="Mặt tiền">Mặt tiền</Radio>
            <Radio value="Văn phòng">Văn phòng</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      <FormControl id="description" mt={1}>
        <FormLabel>Mô tả thêm</FormLabel>
        <Textarea
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Mô tả ngắn gọn về loại bất động sản"
          rows={3}
        />
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="location" fontWeight={"md"}>
          Địa chỉ
        </FormLabel>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => handleInputChange("location", e.target.value)}
        />
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="area" fontWeight={"md"}>
          Diện tích
        </FormLabel>
        <Input
          id="area"
          value={formData.area}
          onChange={(e) => handleInputChange("area", e.target.value)}
        />
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="amenities" fontWeight={"md"}>
          Tiện ích xung quanh
        </FormLabel>
        <Input
          id="amenities"
          value={formData.amenities}
          onChange={(e) => handleInputChange("amenities", e.target.value)}
        />
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="price" fontWeight={"md"}>
          Giá thuê/bán
        </FormLabel>
        <Input
          id="price"
          value={formData.price}
          onChange={(e) => handleInputChange("price", e.target.value)}
        />
      </FormControl>
    </>
  );
}
