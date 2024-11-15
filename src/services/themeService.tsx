import { MMKV } from "react-native-mmkv";
import { storageService } from "./storageService";

class ThemeService {
    static themes = ['light', 'dark']
    static storage: MMKV = storageService.storage;
    public static get theme(): String {
        const theme = this.storage.getString('theme');
        return theme && this.themes.includes(theme) ? theme : 'light';
    }
    public static setTheme(theme: string): boolean {
        if (!this.themes.includes(theme)) {
            return false
        }
        this.storage.set('theme', theme);
        return true;
    }
}