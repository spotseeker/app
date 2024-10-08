import React, { useState } from "react";
import { Text } from "react-native";
import Screen from "@/components/Screen";
import Icons from "@/components/Icons";
import CustomButton from "@/components/CustomButton";
export default function SignUp() {
  const { ShyIcon, CameraIcon, HappyIcon, HomeIcon } = Icons;
  const [registerStep, setRegisterStep] = useState("step1");

  return (
    <Screen>
      <Text>Flijo de registro</Text>
      {registerStep === "step1" && <ShyIcon />}
      {registerStep === "step2" && <CameraIcon />}
      {registerStep === "step3" && <HappyIcon />}
      {registerStep === "step4" && <HomeIcon />}
      <CustomButton
        width={140}
        height={40}
        variant="primary"
        onPress={() => setRegisterStep("step1")}
      >
        paso1
      </CustomButton>
      <CustomButton
        width={140}
        height={40}
        variant="primary"
        onPress={() => setRegisterStep("step2")}
      >
        paso2
      </CustomButton>
      <CustomButton
        width={140}
        height={40}
        variant="primary"
        onPress={() => setRegisterStep("step3")}
      >
        paso3
      </CustomButton>
      <CustomButton
        width={140}
        height={40}
        variant="primary"
        onPress={() => setRegisterStep("step4")}
      >
        paso4
      </CustomButton>
    </Screen>
  );
}
