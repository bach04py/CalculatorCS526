import AsyncStorage from "@react-native-async-storage/async-storage";

export default class HistoryService {
    private static separator = ' ';
    public static async addToHistory(calculation: string){
        let history = (await this.getHistory()).join(this.separator);
        try {
            await AsyncStorage.setItem('history', history + this.separator + calculation);
            console.log("History saved")
        } catch (error) {
            console.error('Failed to save history', error);
        }
    }
    public static async getHistory(): Promise<string[]>{
        try {
            let calculationString = await AsyncStorage.getItem('history');
            if (!calculationString){
                return []
            }
            console.log("History retrieved")
            return calculationString.trim().split(this.separator);
    
        } catch (error) {
            console.error('Failed to get history', error);
            return []
        }
    }
    public static async clearHistory(){
        try {
            console.log("History cleared")
            await AsyncStorage.removeItem('history');
        } catch (error) {
            console.error('Failed to clear history', error);
        }
    }
}
