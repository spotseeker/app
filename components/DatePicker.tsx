import React, { useEffect } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Control, useController } from "react-hook-form";
import { Platform, View, TouchableOpacity, Text } from "react-native";

type DatePickerProps = {
  setDate: (date: Date) => void;
  setShow: (show: boolean) => void;
  control: Control;
  name: string;
  setDateError: (errors: string) => void;
  show: boolean;
};

function DatePicker({
  setDate,
  setShow,
  control,
  name,
  setDateError,
  show,
}: DatePickerProps) {
  const { field, fieldState } = useController({
    control,
    name,
    defaultValue: new Date(),
  });
  const { error } = fieldState;

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "set") {
      setShow(false);
      if (selectedDate) {
        field.onChange(selectedDate);
        setDate(selectedDate);
        setDateError("");
      } else {
        setDateError("No se seleccionó una fecha válida.");
      }
    } else {
      setShow(false);
      if (!field.value) {
        setDateError("Por favor, selecciona una fecha.");
      }
    }
  };

  const datePickerIOS = () => {
    const selectedDate = field.value; // Obtén la fecha seleccionada
    if (selectedDate) {
      field.onChange(selectedDate); // Actualiza el valor del campo
      setDate(selectedDate); // Actualiza el estado de la fecha
      setDateError(""); // Limpia cualquier error
    } else {
      setDateError("Por favor, selecciona una fecha.");
    }
    setShow(false); // Cierra el picker
  };

  useEffect(() => {
    if (error) {
      setDateError(error.message as string);
    } else {
      setDateError("");
    }
  }, [fieldState.error, setDateError]);

  return (
    <View>
      <DateTimePicker
        testID="dateTimePicker"
        value={field.value || new Date()}
        mode="date"
        display="spinner"
        is24Hour={true}
        onChange={Platform.OS === "android" ? onChange : () => ""}
        style={{
          height: 120,
          marginTop: -10,
        }}
        textColor="black"
      />

      {show && Platform.OS === "ios" && (
        <View className="flex flex-row justify-around my-[10px]">
          <TouchableOpacity
            style={{
              backgroundColor: "#11182711",
              paddingHorizontal: 20,
              borderRadius: 20,
              marginHorizontal: 20,
            }}
          >
            <Text
              style={{ color: "#075985", fontSize: 14, fontWeight: "500" }}
              onPress={() => setShow(false)}
            >
              Cancelar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#11182711",
              paddingHorizontal: 20,
              borderRadius: 20,
              marginHorizontal: 20,
            }}
            onPress={datePickerIOS}
          >
            <Text style={{ color: "#075985", fontSize: 14, fontWeight: "500" }}>
              Confirmar
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default DatePicker;
