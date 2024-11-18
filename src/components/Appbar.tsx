import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useContext, useMemo, useState } from 'react';
import HistoryService from '../services/historyService';
import { ThemeContext } from '../context/ThemeContext';


export default function Appbar({sheetRef, onThemeChange}){
    const theme = useContext(ThemeContext);
    const [sheetState, setSheetState] = useState(false);

    function onHistoryPressed(){
        HistoryService.getHistory().then(history => {
            console.log(history);
            sheetRef.current?.snapToIndex(0);
        });
    }

    const styles = useMemo(() => StyleSheet.create({
        row: {
            flexDirection: 'row',
            width: '100%',
            paddingTop: 10,
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        appbar_title: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme === 'light' ? 'black' : 'white',
            tintColor: theme === 'light' ? 'black' : 'purple',
        },
        action: {
            width: 30,
            height: 30,
            tintColor: theme === 'light' ? 'black' : 'white', 
        },
    }), [theme]); 

    return (
        <View style={styles.row}>
            <TouchableOpacity onPress={onHistoryPressed}>
                <Image style={styles.action} source={require("../../assets/history.png")} />
            </TouchableOpacity>
            <Text style={styles.appbar_title}>Calculator</Text>
            <TouchableOpacity onPress={onThemeChange}>
                <Image style={styles.action} source={require("../../assets/moon.png")} />
            </TouchableOpacity>
        </View>
    )
    
}

