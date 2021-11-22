import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Platform, AsyncStorage } from "react-native";
import { Focus } from "./src/features/focus/Focus";
import { FocusHistory } from "./src/features/focus/FocusHistory";
import Constants from "expo-constants";
import { colors } from "./src/utils/colors";
import { Timer } from "./src/features/timer/Timer";
import { spacing } from "./src/utils/sizes";

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([
      ...focusHistory,
      { key: String(focusHistory.length + 1), subject, status },
    ]);
  };

  console.log(focusHistory);

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
    } catch (err) {
      console.log(err);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const histroy = await AsyncStorage.getItem("focusHistory");
      if (histroy && JSON.parse(histroy).length) {
        setFocusHistory(JSON.parse(histroy));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            setFocusSubject(null);
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED);
          }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? spacing.md : spacing.lg,
    backgroundColor: colors.darkGradient,
  },
});
