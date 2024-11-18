import { useRef, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet } from 'react-native';
import { myColors } from './src/styles/Colors';
import { ThemeContext } from './src/context/ThemeContext';
import MyKeyboard from './src/components/MyKeyboard';
import Appbar from './src/components/Appbar';
import HistoryBottomSheet from './src/components/HistoryBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';




export default function App() {
  const [theme, setTheme] = useState('light');
  const sheetRef = useRef<BottomSheet>(null);
  const [sheetState, setSheetState] = useState(false);
  const onSheetChange = (index: number) => {
    setSheetState(index !== -1);
  }
  const onThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  const closeBottomSheet = () => {
    console.log("Closing bottom sheet");
    sheetRef.current?.close();
    setSheetState(false);
  }
  return (
    <GestureHandlerRootView>
    <ThemeContext.Provider value={theme}>
      <SafeAreaView style={theme === 'light' ? styles.container : [styles.container, {backgroundColor: 'black'}]}>
        {sheetState && (
          <Pressable style={styles.overlay} onPress={closeBottomSheet} />
        )}

        {/* <Switch
          value={theme === 'dark'}
          onValueChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        /> */}
        <Appbar sheetRef={sheetRef} onThemeChange={onThemeChange}/>
        <MyKeyboard />
        <HistoryBottomSheet sheetRef={sheetRef} onSheetChange={onSheetChange}/>
      </SafeAreaView>
    </ThemeContext.Provider></GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    tintColor: "rgba(0,0,0,0.5)"
  },
});
