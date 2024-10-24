import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import PostCardList from "@/components/PostCardList";
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
    <SafeAreaView className="flex-1 justify-center items-center">
      <PostCardList />
      

    </SafeAreaView>
  );
}
