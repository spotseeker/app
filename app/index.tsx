import React, { useState, useEffect } from "react";
import Loading from "./Loading";

import { SafeAreaView } from "react-native-safe-area-context";


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
    <SafeAreaView >
      
      

    </SafeAreaView>
  );
}
