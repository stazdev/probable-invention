import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Color } from "@/constants/Colors";
import { DAYS_OF_WEEK, MONTHS } from "@/utils";


interface CalendarProps {
  onDateSelect: (date: Date) => void;
  initialDate?: Date;
}

export const Calendar: React.FC<CalendarProps> = ({
  onDateSelect,
  initialDate = new Date(),
}) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedYear, setSelectedYear] = useState(initialDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(initialDate.getMonth());

  

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(selectedYear, selectedMonth, day);
    setSelectedDate(newDate);
    onDateSelect(newDate);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);
    const days = [];

    // Add empty spaces for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === selectedMonth &&
        selectedDate.getFullYear() === selectedYear;

      days.push(
        <TouchableOpacity
          key={day}
          style={[styles.dayCell, isSelected && styles.selectedDay]}
          onPress={() => handleDateSelect(day)}
        >
          <ThemedText
            style={[styles.dayText, isSelected && styles.selectedDayText]}
          >
            {day}
          </ThemedText>
        </TouchableOpacity>
      );
    }

    return days;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1))
          }
        >
          <ThemedText style={styles.navigationText}>{"<"}</ThemedText>
        </TouchableOpacity>
        <View style={styles.monthYearContainer}>
          <ThemedText style={styles.monthYear}>
            {MONTHS[selectedMonth]} {selectedYear}
          </ThemedText>
        </View>
        <TouchableOpacity
          onPress={() =>
            setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1))
          }
        >
          <ThemedText style={styles.navigationText}>{">"}</ThemedText>
        </TouchableOpacity>
      </View>
      <View style={styles.weekDays}>
        {DAYS_OF_WEEK.map((day) => (
          <View key={day} style={styles.weekDayCell}>
            <ThemedText style={styles.weekDayText}>{day}</ThemedText>
          </View>
        ))}
      </View>
      <View style={styles.daysContainer}>{renderCalendarDays()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  monthYearContainer: {
    flex: 1,
    alignItems: "center",
  },
  monthYear: {
    fontSize: 18,
    fontWeight: "600",
    color: Color.grey[800],
  },
  navigationText: {
    fontSize: 24,
    padding: 8,
    color: Color.grey[600],
  },
  weekDays: {
    flexDirection: "row",
    marginBottom: 8,
  },
  weekDayCell: {
    flex: 1,
    alignItems: "center",
    padding: 8,
  },
  weekDayText: {
    fontSize: 14,
    color: Color.grey[600],
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dayText: {
    fontSize: 16,
    color: Color.grey[800],
  },
  selectedDay: {
    backgroundColor: Color.blue[500],
    borderRadius: 8,
  },
  selectedDayText: {
    color: "white",
    fontWeight: "600",
  },
});
