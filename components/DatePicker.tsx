import React from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Control, useController } from "react-hook-form";

type DatePickerProps = {
  setDate: (date: Date) => void;
  setShow: (show: boolean) => void;
  control: Control;
  name: string;
};

function DatePicker({ setDate, setShow, control, name }: DatePickerProps) {
  const { field } = useController({
    control,
    name,
    defaultValue: new Date(), // Establecer el valor por defecto a la fecha actual o a una fecha específica
  });

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false); // Cerrar el DatePicker
    if (selectedDate) {
      field.onChange(selectedDate); // Actualizar el valor del campo en el formulario
      setDate(selectedDate);
    }
  };

  return (
    <>
      <DateTimePicker
        testID="dateTimePicker"
        value={field.value || new Date()} // Usar el valor del campo o la fecha actual si está vacío
        mode="date"
        display="spinner"
        is24Hour={true}
        onChange={onChange}
      />
    </>
  );
}

export default DatePicker;
