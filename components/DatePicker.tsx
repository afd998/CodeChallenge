import React, { ElementRef, MutableRefObject, Ref } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  View,
} from "react-native";
import { useState } from "react";
function DatePicker({
  dateSelected,
  setDateSelected,
  scrollY,
}: {
  dateSelected: Date;
  setDateSelected: Function;
  scrollY: MutableRefObject<Animated.Value>;
}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date: Date) => {
    setDateSelected(date);
    scrollY.current = new Animated.Value(0);
    hideDatePicker();
  };
  return (
    <View>
      <TouchableOpacity onPress={showDatePicker} style={styles.buttonContainer}>
        <Text
          style={styles.buttonText}
        >{`${dateSelected.toDateString()} \u2193`}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={dateSelected}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

export default DatePicker;

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 50,
    marginBottom: 5,
    elevation: 30,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
  },
});
