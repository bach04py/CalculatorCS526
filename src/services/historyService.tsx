import { MMKV } from "react-native-mmkv";
import { storageService } from "./storageService";

class HistoryService {
    private static separator = ' ';
    static storage: MMKV = storageService.storage;
    public static setHistory(calculations: string[]){
        let calculationString = calculations.join(this.separator)
        this.storage.set('history', calculationString);
    }
    public static getHistory(): string[]{
        let calculationString = this.storage.getString('history');
        if (!calculationString){
            return []
        }
        return calculationString.split(this.separator);
    }
}