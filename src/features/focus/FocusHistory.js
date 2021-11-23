import React from "react";
import { View, StyleSheet, FlatList, Text, SafeAreaView } from "react-native";
import { fontSize, spacing } from "../../utils/sizes";
import { RoundedButton } from "../../components/RoundedButton";

const HistoryItem = ({ item, index }) => {
  return (
    <Text style={styles.historyItem(item.status)}>
      {JSON.stringify(item.subject)}
    </Text>
  );
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: "center" }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things we've focused on</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: "center" }}
              data={focusHistory}
              renderItem={HistoryItem}
            ></FlatList>
            <View style={styles.clearContainer}>
              <RoundedButton
                size={85}
                isIcon={true}
                name="trash"
                iconColor="#911"
                iconSize={40}
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status > 1 ? "red" : "green",
    fontSize: fontSize.lg,
    fontWeight: "bold",
  }),

  title: {
    color: "white",
    fontSize: fontSize.lg,
    paddingBottom: spacing.sm,
  },

  clearContainer: {
    alignItems: "center",
    padding: spacing.md,
  },
});
