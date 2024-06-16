import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FormsData } from "../Form";
import { sendCompletionRequest } from "../api";

interface Props {
  formsData: FormsData;
  setIsSubmit: Dispatch<SetStateAction<boolean>>;
}

export default function Preview({ formsData, setIsSubmit }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [maxtok, setMaxtok] = useState<number>(0);
  const [platform, setPlatform] = useState<string>("");
  useEffect(() => onOpen(), []);

  const concatenateProperties = (obj: FormsData): string => {
    return `Loại: ${obj.form1.type}, Mô tả thêm: ${obj.form1.description}, Địa chỉ: ${obj.form1.location}, Diện tích: ${obj.form1.area}, Tiện ích xung quanh: ${obj.form1.amenities}, Giá: ${obj.form1.price}, Số tầng: ${obj.form2.floors}, Số phòng ngủ: ${obj.form2.bedrooms}, Số phòng tắm: ${obj.form2.bathrooms}, Thông tin liên hệ: ${obj.form3.name}, Số điện thoại: ${obj.form3.phoneNumber}`;
  };

  const handleSendRequest = (maxTokens: number, currentPlatform: string) => {
    setPlatform(currentPlatform);
    sendCompletionRequest(concatenateProperties(formsData), maxTokens, platform)
      .then((result) => {
        setGeneratedText(result);
        setResultModalOpen(true);
      })
      .catch((error) => {
        console.error("Request failed:", error);
      });
  };

  const handleGenerateAgain = () => {
    handleSendRequest(maxtok, platform);
  };

  return (
    <>
      <Modal
        closeOnOverlayClick={true}
        isOpen={isOpen && !resultModalOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Kiểm tra lại thông tin</ModalHeader>
          <ModalBody pb={6}>
            Loại: {formsData.form1.type} <br />
            Mô tả thêm: {formsData.form1.description}
            <br />
            Địa chỉ: {formsData.form1.location}
            <br />
            Diện tích: {formsData.form1.area}
            <br />
            Tiện ích xung quanh: {formsData.form1.amenities}
            <br />
            Giá thuê/bán: {formsData.form1.price}
            <br />
            {formsData.form2 && Object.keys(formsData.form2).length > 0 && (
              <>
                Số tầng: {formsData.form2.floors} <br />
                Số phòng ngủ: {formsData.form2.bedrooms} <br />
                Số phòng tắm: {formsData.form2.bathrooms} <br />
              </>
            )}
            Thông tin liên hệ:
            <br />
            Tên: {formsData.form3.name}
            <br />
            Số điện thoại: {formsData.form3.phoneNumber}
            <br />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                handleSendRequest(800, "facebook");
                setMaxtok(800);
              }}
            >
              Facebook
            </Button>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={() => {
                handleSendRequest(500, "tiktok");
                setMaxtok(500);
              }}
            >
              Tiktok
            </Button>
            <Button
              onClick={() => {
                setIsSubmit(false);
                onClose();
              }}
            >
              Quay lại
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={resultModalOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Kết quả</ModalHeader>
          <ModalBody>{generatedText}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleGenerateAgain}>
              Generate lại
            </Button>
            <Button
              onClick={() => {
                setIsSubmit(false);
                onClose();
              }}
            >
              Quay lại
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
