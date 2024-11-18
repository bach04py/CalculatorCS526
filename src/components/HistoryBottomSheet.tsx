import React, { useCallback, useMemo, useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import HistoryService from "../services/historyService";
import { TouchableOpacity } from "react-native-gesture-handler";

const HistoryBottomSheet = ({sheetRef, onSheetChange}) => {
  // variables
  const snapPoints = useMemo(() => ["80%"], []);
  const [historyItems, setHistoryItems] = useState<React.ReactNode[]>([]);

//   useEffect(() => {
//     HistoryService.getHistory().then(history => setHistory(history));
//   }, []);
  useEffect(() => {
    setHistory();
  }, []);
  
  const setHistory = async () => {
    const history = await HistoryService.getHistory();
    setHistoryItems(history.map(item => renderItem(item)));
    console.log("History Set", history);
  }
  const onClearHistoryPressed = async () => {
    HistoryService.clearHistory();
    setHistoryItems([]);
  }
  const onSheetAnimate = async (fromIndex: number, toIndex: number) => {
    if (toIndex > -1){
        setHistory();  
    }
  }
  const renderItem = useCallback(
    (item) => (
      <View key={item} style={styles.itemContainer}>
        <Text style={styles.text}>{item}</Text>
        <View style={styles.separator} />
      </View>
    ),
    []
  );
  return (
      <BottomSheet
        enablePanDownToClose={true}
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onAnimate={(startIndex, toIndex) => {
            onSheetAnimate(startIndex, toIndex);
            onSheetChange(toIndex);
        }}
        >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.sheetTopBar}>
                <TouchableOpacity style={styles.button} onPress={() => onClearHistoryPressed()}>
                    <Text>Clear History</Text
                ></TouchableOpacity>
            </View>
            {historyItems}
        </BottomSheetScrollView>
      </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
  contentContainer: {
    backgroundColor: "white",
  },
  itemContainer: {
    flexDirection: "column",
    padding: 6,
    margin: 6,
  },
  text: {
    letterSpacing: 4,
    fontSize: 40,
    fontWeight: "bold",
  },
  separator: {
    height: 1, 
    backgroundColor: '#ccc',
    marginVertical: 10, 
  },
  sheetTopBar: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    paddingHorizontal: 10
  },
  button: {
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 1,
    padding: 10,
  }
});

export default HistoryBottomSheet;