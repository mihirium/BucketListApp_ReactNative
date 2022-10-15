import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function EditItem({ navigation, route }) {
  const { item } = route.params;
  const { fullArr } = route.params;
  const [title, setTitle] = useState(item.title);
  const [body, setBody] = useState(item.body);
  const [id, setid] = useState(item.id);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [MYDATE, SETMYDATE] = useState(item.date);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("TASKS", value);
      //   console.log(value);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const updateNewItem = () => {
    let newTask = {
      title: title,
      body: body,
      id: id,
      date: MYDATE,
      done: false,
    };
    fullArr[item.id - 1] = newTask;
    clearAll();
    fullArr.sort(byDate);
    storeData(JSON.stringify(fullArr));
    navigation.navigate("Home");
  };

  function byDate(a, b) {
    return new Date(a.date).valueOf() - new Date(b.date).valueOf();
  }
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
          placeholder="write you title here"
          onChangeText={(value) => {
            setTitle(value);
          }}
        />
        <TextInput
          style={styles.input}
          value={body}
          placeholder="write you description here"
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
            height: "15%",
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
          updateNewItem();
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
