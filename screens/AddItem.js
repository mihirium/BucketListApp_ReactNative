import {
  Alert,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-native-date-picker";

export default function AddItem({ route, navigation }) {
  //   const { title, body } = route.params;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [MYDATE, SETMYDATE] = useState("");

  useEffect(() => {
    SETMYDATE(date.toDateString());
  });
  const total = route.params.item;
  const setNewTask = (title, body, total, date) => {
    if (title.length == 0 || body.length == 0) {
      Alert.alert("Error!", "Please enter a value in both the title and body!");
    } else {
      let length = total.length;
      let newTask = {
        title: title,
        body: body,
        id: length + 1,
        date: date,
        done: false,
      };
      let tasks = [...total, newTask];
      tasks.sort(byDate);
      storeData(JSON.stringify(tasks));
      navigation.navigate("Home");
    }
  };

  function byDate(a, b) {
    return new Date(a.date).valueOf() - new Date(b.date).valueOf();
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("TASKS", value);
      //   console.log(value);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const getTasks = () => {
    AsyncStorage.getItem("TASKS")
      .then((tasks) => {
        const parsedTasks = JSON.parse(tasks);
        if (parsedTasks && typeof parsedTasks === "object") {
          console.log(parsedTasks);
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
    console.log("Done.");
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    SETMYDATE(currentDate.toDateString());
  };
  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(false);
      if (Platform.OS == "ios") {
        setShow(true);
      }
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    console.log("here");
    showMode("date");
    setShow("true");
  };
  return (
    <View>
      <View style={{ alignItems: "center" }}>
        <TextInput
          style={styles.input}
          value={title}
          placeholder="write your title in here"
          onChangeText={(value) => {
            setTitle(value.toString());
          }}
        />
        <TextInput
          style={styles.input}
          value={body}
          placeholder="write your description in here"
          onChangeText={(value) => {
            setBody(value);
          }}
        />

        <Text style={{ fontSize: 20, marginBottom: 15 }}>
          Your current date: {MYDATE}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 15,
            height: "10%",
            width: "60%",
          }}
          onPress={showDatepicker}
        >
          <Text
            style={{
              textAlign: "center",
              justifyContent: "center",
              fontSize: 20,
              marginTop: 5,
            }}
          >
            Press to Change Date
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {show && (
          <View>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          </View>
        )}
      </View>

      <Button
        title="save"
        onPress={() => {
          setNewTask(title, body, total, MYDATE);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "95%",
    borderWidth: 1,
    borderColor: "#555555",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    textAlign: "left",
    fontSize: 20,
    margin: 20,
    paddingHorizontal: 10,
    height: "15%",
  },
});
