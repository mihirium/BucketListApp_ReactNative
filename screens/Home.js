import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import deepcopy from "deepcopy";
import { setStatusBarTranslucent } from "expo-status-bar";

export default function Home({ navigation, route }) {
  const testDate = new Date().toDateString();
  const [arr, setArr] = useState([
    {
      title: "Climb Mt. Everest",
      body: "Need to buy gear",
      id: 1,
      date: testDate,
      done: false,
    },
    {
      title: "Eat a bowl of ghost peppers",
      body: "Pray for me",
      id: 2,
      date: testDate,
      done: false,
    },
  ]);
  const [clickView, setClickView] = useState(false);
  const getTasks = async () => {
    AsyncStorage.getItem("TASKS")
      .then((tasks) => {
        const parsedTasks = JSON.parse(tasks);
        if (parsedTasks && typeof parsedTasks === "object") {
          setArr(parsedTasks);
        }
      })
      .catch((err) => console.log(err));
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }
    console.log("CLEARED");
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("TASKS", value);
      //   console.log(value);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const setTheDone = (arr, id) => {
    let newTask = {
      title: arr[id - 1].title,
      body: arr[id - 1].body,
      id: arr[id - 1].id,
      date: arr[id - 1].date,
      done: !arr[id - 1].done,
    };
    arr[id - 1] = newTask;
    storeData(JSON.stringify(arr));
  };

  useFocusEffect(() => {
    // console.log("HERE");
    // console.log("_____");
    getTasks();
  });
  return (
    <View style={styles.body}>
      <Text style={{ fontSize: 30 }}> INCOMPLETE ITEMS</Text>
      <FlatList
        data={arr.filter((checkIfDone) => checkIfDone.done === false)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 20,
              marginBottom: 10,
              width: "100%",
            }}
            onPress={() => {
              navigation.navigate("EditItem", { item: item, fullArr: arr });
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <BouncyCheckbox
                isChecked={item.done}
                onPress={() => {
                  setTheDone(arr, item.id);
                  getTasks();
                }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 20,
                  }}
                >
                  {item.title}
                </Text>
                <Text style={{ fontSize: 15 }}>Description : {item.body}</Text>
                <Text
                  style={{ fontSize: 15, textAlign: "left", color: "blue" }}
                >
                  Due: {item.date}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <Text style={{ fontSize: 30 }}> ________________</Text>
      <Text style={{ fontSize: 30 }}> COMPLETED ITEMS!</Text>
      <FlatList
        data={arr.filter((checkIfDone) => checkIfDone.done == true)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 20,
              marginBottom: 10,
              width: "100%",
            }}
            onPress={() => {
              navigation.navigate("EditItem", { item: item, fullArr: arr });
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <BouncyCheckbox
                isChecked={item.done}
                onPress={() => {
                  setTheDone(arr, item.id);
                }}
              />
              <View>
                <Text style={{ fontSize: 30 }}>{item.title}</Text>
                <Text style={{ fontSize: 15 }}>Description: {item.body}</Text>
                <Text style={{ fontSize: 15 }}> Due: {item.date} </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("AddItem", { item: arr });
        }}
      >
        <Text style={{ fontSize: 40 }}>+</Text>
      </TouchableOpacity>

      {/* <Button title="emergency!" onPress={clearAll()}></Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    right: 10,
    elevation: 5,
    borderColor: "#000000",
    borderWidth: 2,
  },
});
