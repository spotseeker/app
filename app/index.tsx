import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { View } from "react-native";
import SignIn from "./(auth)/Sign-in";
export default function Index() {
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSignIn(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return !showSignIn ? (
    <Loading />
  ) : (
    <View className="flex-1 justify-center items-center">
      <SignIn />
    </View>
  );
}
