import AsyncStorage from "@react-native-async-storage/async-storage";

export default class ThemeService {
    static themes = ['light', 'dark']
    public static async getTheme(): Promise<string> {
        const theme = await AsyncStorage.getItem('theme');
        return theme && this.themes.includes(theme) ? theme : 'light';
    }
    public static async setTheme(theme: string): Promise<boolean> {
        if (!this.themes.includes(theme)) {
            return false
        }
        await AsyncStorage.setItem('theme', theme);
        return true;
    }
}
