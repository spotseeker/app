import React, { useState } from 'react'
import Screen from '@/src/components/Screen'
import SignupScreen from '@/src/screens/signup'
import { UserData } from '@/src/schemas/UserSchema'

export default function SignUp() {
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState<UserData>({
    email: '',
    username: '',
    firstname: '',
    lastname: '',
    aboutme: '',
    birthdate: new Date(),
    password: '',
    confirm: '',
    code: ''
  })

  return (
    <Screen>
      <SignupScreen
        setUserData={setFormData}
        userData={formData}
        step={step}
        setStep={setStep}
      />
    </Screen>
  )
}
