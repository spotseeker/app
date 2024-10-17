import React, { useEffect } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Control, useController } from "react-hook-form";

type DatePickerProps = {
  setDate: (date: Date) => void;
  setShow: (show: boolean) => void;
  control: Control;
  name: string;
  setDateError: (errors: string) => void;
};

function DatePicker({
  setDate,
  setShow,
  control,
  name,
  setDateError,
}: DatePickerProps) {
  const { field, fieldState } = useController({
    control,
    name,
    defaultValue: new Date(), // Establecer el valor por defecto a la fecha actual o a una fecha específica
  });
  const { error } = fieldState;
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "set") {
      // Verificar si se ha seleccionado una fecha
      setShow(false); // Cerrar el DatePicker
      if (selectedDate) {
        field.onChange(selectedDate); // Actualizar el valor del campo en el formulario
        setDate(selectedDate);
        setDateError(""); // Limpiar el error al seleccionar una fecha válida
      } else {
        setDateError("No se seleccionó una fecha válida."); // Mensaje de error si no se selecciona una fecha
      }
    } else {
      // Si se cierra el picker sin seleccionar una fecha, se establece el error.
      setShow(false); // Cerrar el DatePicker
      if (!field.value) {
        setDateError("Por favor, selecciona una fecha."); // Mensaje de error si no hay fecha
      }
    }
  };

  useEffect(() => {
    // Verificar si hay un error y establecer el mensaje de error correspondiente
    if (error) {
      setDateError(error.message as string);
    } else {
      setDateError(""); // Limpiar el error si es válido
    }
  }, [fieldState.error, setDateError]);

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
