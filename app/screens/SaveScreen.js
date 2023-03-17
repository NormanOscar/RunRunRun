import { 
  Text, 
  View, 
  Pressable,
  TextInput,
   Modal 
} from "react-native";
import React, { useEffect } from "react";
import { styles } from "../style/styles.js";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";

/**
 * Component for SaveScreen
 * 
 * @param {navigation} Navigation object
 * 
 * @return {Components} View of components
 */
export default function SaveScreen({ navigation }) {
  const [modalVisible, setModalVisible] = React.useState(false);

  const route = useRoute();
  const runData = route.params?.runData;

  /**
   * Sets default name of run depending on time of day
   *
   *  @return {string} String for name of run
   */
  const setDefaultName = () => {
    const startHour = runData.startTime.split(":")[0];
    if (startHour >= 0 && startHour < 6) {
      return "Night run";
    }
    if (startHour >= 6 && startHour < 11) {
      return "Morning run";
    }
    if (startHour >= 11 && startHour < 13) {
      return "Lunch run";
    }
    if (startHour >= 13 && startHour < 18) {
      return "Afternoon run";
    }
    if (startHour >= 18 && startHour < 24) {
      return "Evening run";
    }
  };

  const [runName, setRunName] = React.useState(setDefaultName());
  const [runDesc, setDesc] = React.useState("");
  const [runFeeling, setRunFeeling] = React.useState("good");

  /**
   * Saves rundata into async storage
   * 
   * @return {undefined}
   */
  const saveData = async () => {
    let savedData = [];
    let runIndex;
    runData.name = runName;
    runData.desc = runDesc;
    runData.feeling = runFeeling;
    try {
      savedData = JSON.parse(await AsyncStorage.getItem("savedData")) || [];
      runIndex = savedData.length;
      savedData.push(runData);
    } catch (error) {
      // Error retrieving data
    }
    runData.runIndex = Date.now();
    try {
      await AsyncStorage.setItem("savedData", JSON.stringify(savedData));
    } catch (error) {
      // Error saving data
    }
  };

  /**
   * Reders layout of screen
   */
  return (
    <View style={[styles.container, { backgroundColor: "white" }]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Do you want to delete this run?
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.modalBtns, styles.cancelBtn]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.modalBtnsText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalBtns, styles.deleteBtn]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate("Home");
                }}
              >
                <Text style={styles.modalBtnsText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.backBtnContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>Back</Text>
        </Pressable>
      </View>

      <View
        style={{
          alignItems: "center",
          flex: 0.9,
        }}
      >
        <Text style={{ fontSize: 30, paddingBottom: 10 }}>Save</Text>
        <View>
          <View>
            <View
              style={[
                styles.runDataContainer,
                {
                  width: "100%",
                  borderColor: "lightgrey",
                  borderWidth: "1",
                  marginBottom: 20,
                },
              ]}
            >
              <View>
                <Text style={styles.runDataTitle}>Time:</Text>
                <Text style={styles.runData}>{runData.duration}</Text>
              </View>
              <View style={styles.verticleLine}></View>
              <View>
                <Text style={styles.runDataTitle}>Distance:</Text>
                <Text style={styles.runData}>{runData.distance} km</Text>
              </View>
              <View style={styles.verticleLine}></View>
              <View>
                <Text style={styles.runDataTitle}>Pace:</Text>
                <Text style={styles.runData}>{runData.avgPace} /km</Text>
              </View>
            </View>
          </View>
        </View>
        <TextInput
          style={[styles.input, { height: 60 }]}
          placeholder="Name"
          onChangeText={(text) => setRunName(text)}
          value={runName}
        />
        <TextInput
          multiline={true}
          style={[styles.input, { height: 100 }]}
          placeholder="Description"
          onChangeText={(text) => setDesc(text)}
          value={runDesc}
        />
        <View style={{ justifyContent: "left", width: "100%" }}>
          <Text style={{ fontSize: 20, marginLeft: 25, marginBottom: 10 }}>
            How did it feel?
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "90%",
          }}
        >
          <Pressable
            style={[
              styles.feelingBtns,
              { backgroundColor: "#32cd32" },
              { borderColor: runFeeling == "good" ? "black" : "white" },
            ]}
            onPress={() => setRunFeeling("good")}
          >
            <Entypo name="emoji-happy" size={40} color="black" />
          </Pressable>
          <Pressable
            style={[
              styles.feelingBtns,
              { backgroundColor: "#ffff00" },
              { borderColor: runFeeling == "medium" ? "black" : "white" },
            ]}
            onPress={() => setRunFeeling("medium")}
          >
            <Entypo name="emoji-neutral" size={40} color="black" />
          </Pressable>
          <Pressable
            style={[
              styles.feelingBtns,
              { backgroundColor: "#FF5F5F" },
              { borderColor: runFeeling == "bad" ? "black" : "white" },
            ]}
            onPress={() => setRunFeeling("bad")}
          >
            <Entypo name="emoji-sad" size={40} color="black" />
          </Pressable>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Pressable
          style={[
            styles.btn,
            {
              backgroundColor: "rgb(59, 154, 226)",
            },
          ]}
          onPress={async () => {
            await saveData();
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.btnText}>Save run</Text>
        </Pressable>

        <Pressable onPress={() => setModalVisible(true)}>
          <Text style={styles.openModalBtn}>Delete run</Text>
        </Pressable>
      </View>
    </View>
  );
}
