import React, { ReactNode, useState } from "react";
import { TextInput, View, Text, Pressable } from "react-native";
import Icons from "./Icons";
import { styled } from "nativewind";
import { Control, useController } from "react-hook-form";
const StyledPressable = styled(Pressable);

type CustomInputs = {
  children: ReactNode;
  variant: "default" | "email" | "edit" | "search" | "password" | "description" | "number";
  name: string;
  control: Control;
};

function CustomInputs({ children, variant, name, control }: CustomInputs) {
  const { field, fieldState } = useController({
    control,
    defaultValue: "",
    name,
  });
  const { error } = fieldState;
  const { PersonIcon, SearchIcon, EditIcon, PasswordIcon } = Icons;
  const [shownPassword, setShownPassword] = useState(true);

  const renderIcon = () => {
    switch (variant) {
      case "email":
        return <PersonIcon color="#ee5d6c" />;
      case "search":
        return <SearchIcon color="#ee5d6c" />;
      case "edit":
        return <EditIcon color="#ee5d6c" />;
      case "password":
        return (
          <StyledPressable onPress={() => setShownPassword(!shownPassword)}>
            <PasswordIcon color="#ee5d6c" shown={shownPassword} />
          </StyledPressable>
        );

      default:
        return null;
    }
  };

  return (
    <View className="p-[20px]">
    <Text className="text-lightc font-psemibold text-[14px] pb-[5px]">
      {children}
    </Text>
    <View
      className={`flex flex-row  border border-gray-400 rounded-md ${
        variant == "description"
          ? "w-[338px] h-[140px]"
          : "w-[338px] h-[48px]"
      }`}
    >
      <TextInput
        className="flex-auto p-[11px] text-wrap"
        placeholder={`${children}`}
        secureTextEntry={variant === "password" && shownPassword}
        multiline={variant == "description"}
        inputMode={variant == "number" ? "numeric":"text"}
        textAlignVertical="top"
        value={field.value}
        onChangeText={field.onChange}
      />
      {renderIcon()}
    </View>
    {error?.message && <Text>{error.message}</Text>}
    </View>
  );
}

export default CustomInputs;
