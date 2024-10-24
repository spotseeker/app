import React, { useState } from "react";
import Screen from "@/components/Screen";
import SignupScreens from "./SignUp/SignupScreens";
import { UserData } from "@/Schemas/UserSchema";

export default function SignUp() {
  const [step, setStep] = useState(5);

  const [formData, setFormData] = useState<UserData>({
    email: "",
    username: "",
    firstname: "",
    lastname: "",
    aboutme: "",
    birthdate: new Date(),
    password: "",
    confirm: "",
    code: "",
  });

  return (
    <Screen>
      <SignupScreens
        setUserData={setFormData}
        userData={formData}
        step={step}
        setStep={setStep}
      />
    </Screen>
  );
}
