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
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(33.33);
  const [formsData, setFormsData] = useState<FormsData>({
    form1: {},
    form2: {},
    form3: {},
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [filling, setFilling] = useState(false);

  const handleFormChange = (data: any, formNumber: number) => {
    setFilling(true);
    setFormsData((prevData) => ({
      ...prevData,
      [`form${formNumber}`]: data,
    }));
  };

  const handleNext = () => {
    setFilling(false);
    const { form1, form2 } = formsData;

    if (
      step === 0 &&
      isFormFilled(form1) &&
      !["Đất", "Văn phòng", "Mặt tiền"].includes(form1.type || "")
    ) {
      setStep(1);
      setProgress(66.66);
    } else if (isFormFilled(form2)) {
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

  const isFormFilled = (data: any) => {
    return Object.values(data).every((value) => value !== "");
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
          onFormChange={(data) => handleFormChange(data, 1)}
        />
      ) : step === 1 ? (
        <Form2
          data={formsData.form2}
          onFormChange={(data) => handleFormChange(data, 2)}
        />
      ) : (
        <Form3
          data={formsData.form3}
          onFormChange={(data) => handleFormChange(data, 3)}
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
                !isFormFilled(formsData[`form${step + 1}`]) ||
                step === 2
              }
              onClick={handleNext}
              colorScheme="teal"
              variant="outline"
            >
              Next
            </Button>
          </Flex>
          {step === 2 ? (
            <>
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                isDisabled={
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
          ) : null}
        </Flex>
      </ButtonGroup>
    </Box>
  );
}
