import { useState } from "react";
import { Progress, Box, ButtonGroup, Button, Flex } from "@chakra-ui/react";
import Form1, { Form1Data } from "./Form1";
import Form2, { Form2Data } from "./Form2";
import Form3, { Form3Data } from "./Form3";
import Preview from "../Preview";

export interface FormsData {
  form1: Form1Data;
  form2: Form2Data;
  form3: Form3Data;
}

export default function Multistep() {
  const [step, setStep] = useState<number>(0);
  const [progress, setProgress] = useState<number>(33.33);
  const [formsData, setFormsData] = useState<FormsData>({
    form1: {} as Form1Data,
    form2: {} as Form2Data,
    form3: {} as Form3Data,
  });
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [filling, setFilling] = useState<boolean>(false);

  //@ts-ignore
  const handleFormChange = (data: any, formNumber: number) => {
    setFilling(true);
    setFormsData((prevData) => ({
      ...prevData,
      [`form${formNumber}`]: data,
    }));
  };

  const handleNext = () => {
    setFilling(false);

    if (
      step === 0 &&
      isFormFilled(formsData.form1) &&
      !["Đất", "Văn phòng", "Mặt tiền"].includes(formsData.form1.type || "")
    ) {
      setStep(1);
      setProgress(66.66);
    } else if (step === 1 && isFormFilled(formsData.form2)) {
      setStep(2);
      setProgress(100);
    }
  };

  const handleBack = () => {
    setFilling(true);

    if (["Đất", "Mặt tiền", "Văn phòng"].includes(formsData.form1.type || "")) {
      setStep(step - 2);
    } else {
      setStep(step - 1);
    }

    if (step === 2) {
      setProgress(66.66);
    } else if (step === 1) {
      setProgress(33.33);
    }
  };

  //@ts-ignore
  const isFormFilled = (data: any) => {
    //@ts-ignore
    return Object.values(data).every((value: any) => value !== "");
  };

  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      shadow="1px 1px 3px rgba(0,0,0,0.3)"
      p={6}
      minHeight="90vh"
      as="form"
    >
      <Progress
        hasStripe
        value={progress}
        mb="5%"
        mx="5%"
        isAnimated
      ></Progress>
      {step === 0 ? (
        <Form1
          data={formsData.form1}
          //@ts-ignore
          onFormChange={(data: any) => handleFormChange(data, 1)}
        />
      ) : step === 1 ? (
        <Form2
          data={formsData.form2}
          //@ts-ignore
          onFormChange={(data: any) => handleFormChange(data, 2)}
        />
      ) : (
        <Form3
          data={formsData.form3}
          //@ts-ignore
          onFormChange={(data: any) => handleFormChange(data, 3)}
        />
      )}
      <ButtonGroup mt="5%" w="100%">
        <Flex w="100%" justifyContent="space-between">
          <Flex>
            <Button
              onClick={handleBack}
              isDisabled={step === 0}
              colorScheme="teal"
              variant="solid"
              w="7rem"
              mr="5%"
            >
              Back
            </Button>
            <Button
              w="7rem"
              isDisabled={
                !filling ||
                //@ts-ignore
                (step < 2 && !isFormFilled(formsData[`form${step + 1}`]))
              }
              onClick={handleNext}
              colorScheme="teal"
              variant="outline"
            >
              Next
            </Button>
          </Flex>
          {step === 2 && (
            <>
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                isDisabled={
                  //@ts-ignore
                  !filling || !isFormFilled(formsData[`form${step + 1}`])
                }
                onClick={() => setIsSubmit(true)}
              >
                Submit
              </Button>
              {isSubmit && (
                <Preview formsData={formsData} setIsSubmit={setIsSubmit} />
              )}
            </>
          )}
        </Flex>
      </ButtonGroup>
    </Box>
  );
}
