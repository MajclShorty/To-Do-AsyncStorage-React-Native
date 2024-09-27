import AsyncStorage from "@react-native-async-storage/async-storage";

class ToDoService {
    constructor() {
        this.keys = [];
        this.key = 0;
    }

    //Ukládání dat
    StoreToDo = async (todo, key) => {
        this.keys.push(key);
        try {
            const jsonToDo = JSON.stringify(todo);
            await AsyncStorage.setItem(key, jsonToDo);
        } catch (e) {
            console.log("Nastala chyba při ukládání dat: ", e);
        }
    };

    //Načtení jednoho úkolu
    GetToDo = async (key) => {
        try {
            const jsonToDo = await AsyncStorage.getItem(key);
            return jsonToDo != null ? JSON.parse(jsonToDo) : null;
        } catch (e) {
            console.log("Nastala chyba při přijímání operace: ", e);
        }
    };

    //Načtení všech úkolů
    GetAllToDos = async () => {
        let ToDos = [];

        await Promise.all(
            this.keys.map(async (key) => {
                let todo = await this.GetToDo(key.toString());
                ToDos.push(todo); //push(), přidání nového prvku na konec existujícího pole
            })
        );

        return ToDos;
    };

    //Odebrání úkolu
    RemoveToDo = async (key) => {
        this.keys = this.keys.filter((k) => k !== key);

        try {
            await AsyncStorage.removeItem(key.toString());
        } catch (e) {
            console.log("Chyba při odstranění předmětu z AsyncStorage: ", e);
        }
    };

    //Získání klíče
    GetKey = () => {
        this.key++;
        return this.key.toString();
    };

}



const service = new ToDoService();

export default service;