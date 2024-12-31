import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Color } from "@/constants/Colors";
import { BirthdayIcon } from "@/assets/icons";
import { RowCard } from "@/components";
import dayjs from "dayjs";

type CalendarType = "birth" | "adoption";
const CALENDAR_TYPES: CalendarType[] = ["birth", "adoption"];

interface DateStepProps {
  profileImage?: any;
  title?: string;
  initialBirthDate?: string;
  initialAdoptionDate?: string;
  initialAge?: string;
  showCalendar?: boolean;
}

const DateStep: React.FC<DateStepProps> = ({
  profileImage = require("@/assets/images/dogPlaceholder.png"),
  title = "Time to celebrate",
  initialBirthDate = "3 nov 2019",
  initialAdoptionDate = "6 jan 2020",
  initialAge = "3",
  showCalendar = false,
}) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(showCalendar);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [defaultDate, setDefaultDate] = useState("");

  const [activeCalendar, setActiveCalendar] = useState<CalendarType>("birth");
  const isBirthSelected = activeCalendar == "birth";

  const [birthDate, setBirthDate] = useState(initialBirthDate);
  const [age, setAge] = useState(initialAge);

  useEffect(() => {
    setIsCalendarVisible(showCalendar);
  }, [showCalendar]);

  // const showDatePicker = () => {
  //   setDatePickerVisibility(true);
  // };

  // const hideDatePicker = () => {
  //   setDatePickerVisibility(false);
  // };

  // const handleConfirm = (date) => {
  //   const formattedDate = dayjs(date).format("DD MMMM YYYY").toString();
  //   setDefaultDate(formattedDate);
  //   hideDatePicker();
  // };

  const handleRowCardPress = (type: CalendarType) => {
    // setActiveCalendar(type);
    // setIsCalendarVisible(true);
    // showDatePicker();
    console.log(type);
  };

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}>
            <Image
              source={profileImage}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>

      <View style={styles.textContainer}>
        <ThemedText color={Color.grey[800]} fontSize={14} style={styles.label}>
          {title}
        </ThemedText>
      </View>

      <View style={styles.rowCards}>
        {CALENDAR_TYPES.map((type) => {
          return (
            <Pressable onPress={() => handleRowCardPress(type)}>
              <RowCard
                icon={<BirthdayIcon />}
                label="Birthday"
                date={birthDate}
                detail={`${age} y.o`}
              />
            </Pressable>
          );
      })}
      </View>
      {/* <DateTimePickerModal
        isVisible={isDatePickerVisible}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
      /> */}
    </View>
  );
};

export default DateStep;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
  },
  circleContainer: {
    marginTop: 20,
  },
  outerCircle: {
    width: 166,
    height: 166,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: Color.grey[150],
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 133,
    height: 133,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: Color.grey[150],
    padding: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 200,
  },
  textContainer: {
    width: "100%",
    marginTop: 24,
    marginBottom: 40,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  rowCards: {
    width: "100%",
    paddingHorizontal: 24,
    gap: 16,
  },

  calendarContainer: {
    padding: 16,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: Color.grey[100],
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: "white",
  },
  tabText: {
    textAlign: "center",
    color: Color.grey[600],
  },
  activeTabText: {
    color: Color.grey[800],
    fontWeight: "500",
  },
});
