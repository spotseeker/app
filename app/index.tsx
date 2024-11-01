import React, { useState, useEffect } from "react";
import Loading from "./Loading";

import { SafeAreaView } from "react-native-safe-area-context";

import Welcome from "./Welcome";
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
    <SafeAreaView className="flex-1 justify-center items-center">
      <Welcome/>
      

    </SafeAreaView>
  );
}
