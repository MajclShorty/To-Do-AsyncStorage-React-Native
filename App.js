import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ToDoListPage from "./Routes/ToDoListPage";
import ToDoDetailPage from "./Routes/ToDoDetailPage";
import { Text } from 'react-native';

function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ToDoListPage"
          component={ToDoListPage}
          options={({ navigation }) => ({
            title: "ToDo List",
            headerRight: () => (
              <Text onPress={() => navigation.navigate("ToDoDetailPage")} style={{fontSize: 25, marginRight: 15}}>
                +
              </Text>
            ),
          })}
        />
        
        <Stack.Screen
          name="ToDoDetailPage"
          component={ToDoDetailPage}
          options={{title: "ToDo Detail Page"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;