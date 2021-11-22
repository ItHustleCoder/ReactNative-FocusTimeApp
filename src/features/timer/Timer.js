import React, { useState } from "react";
import { View, Text, StyleSheet, Vibration, Platform } from "react-native";
import { RoundedButton } from "../../components/RoundedButton";
import { fontSize, spacing } from "../../utils/sizes";
import { ProgressBar } from "react-native-paper";
import { Timinig } from "./Timing";
import { colors } from "../../utils/colors";
import { CountDown } from "../../components/CountDown";
import { useKeepAwake } from "expo-keep-awake";

const DEFAULT_TIME = 0.1;
export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === "ios") {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 5000);
    } else {
      Vibration.vibrate(5000);
    }
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  const onEnd = () => {
    onTimerEnd();
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contdown}>
        <CountDown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          color="#5E84E2"
          style={{ height: 10 }}
          progress={progress}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Timinig onChangeTime={changeTime} />
      </View>

      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="| |" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: "center",
  },
  section: {
    paddingTop: spacing.xxxl,
  },
  task: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  contdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    flex: 0.3,
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});
