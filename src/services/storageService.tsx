import { MMKV } from "react-native-mmkv";

class StorageService {
    static #instance: StorageService;
    public storage: MMKV = new MMKV();

    private constructor() {}

    public static get instance(): StorageService {
        if (!StorageService.#instance){
            StorageService.#instance = new StorageService();
        }
        return StorageService.#instance;
    }
}

export const storageService: StorageService = StorageService.instance;