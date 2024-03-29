import {
  Text,
  View,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { styles } from "../style/styles.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { Entypo } from "@expo/vector-icons";

/**
 * Component for HomeScreen
 * 
 * @param {navigation} Navigation object
 * 
 * @return {Components} View of components
 */
export default function HomeScreen({ navigation }) {
  //AsyncStorage.clear();

  const [location, setLocation] = useState(null);
  const [runList, setRunList] = useState([]);
  let errorMsg;

  /**
   * Runs when component is mounted
   *
   * @return {undefined}
   */
  useEffect(() => {
    /**
     * Asks and gets users location
     * 
     * @return {undefined}
     */
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync();
        setLocation(location);
      } else {
        Alert("Permission to access location was denied");
      }
    })();

    /**
     * Listens if screen is in focus
     * 
     * @return {undefined}
     */
    const unsubscribe = navigation.addListener("focus", async () => {
      // The screen is focused, get the runs
      try {
        setRunList(
          JSON.parse(await AsyncStorage.getItem("savedData")).reverse() || []
        );
      } catch (error) {
        errorMsg = "Could not load runs";
      }
    });
    return unsubscribe;
  }, [navigation, runList]);

  /**
   * Reders layout of screen
   */
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>RunRunRun</Text>
      </View>

      {errorMsg && (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={errorMsg}>
            <Text style={styles.errorMsgText}>{errorMsg}</Text>
          </View>
        </ScrollView>
      )}
      {runList.length == 0 && (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.errorMsg}>
            <Text style={styles.errorMsgText}>There are no previous runs</Text>
          </View>
        </ScrollView>
      )}
      <ScrollView
        contentContainerStyle={styles.scrollView}
      >
        {runList.length > 0 &&
          runList.map((run) => (
            <Pressable
              key={run.runIndex}
              style={{ width: "100%" }}
              onPress={() => navigation.navigate("Run", { runData: run })}
            >
              <View style={styles.runView}>
                <View>
                  <Text style={styles.runName}>{run.name}</Text>
                  <View style={styles.runDateTime}>
                    <Entypo name="calendar" size={16} color="black" />
                    <Text style={styles.runDateTimeText}>
                      {run.date} at {run.startTime}
                    </Text>
                    <Entypo name="location-pin" size={16} color="black" />
                    <Text style={styles.runDateTimeText}>{run.startGeo}</Text>
                  </View>
                </View>
                <View style={styles.runDataContainer}>
                  <View>
                    <Text style={styles.runDataTitle}>Time:</Text>
                    <Text style={styles.runData}>{run.duration}</Text>
                  </View>
                  <View style={styles.verticleLine}></View>
                  <View>
                    <Text style={styles.runDataTitle}>Distance:</Text>
                    <Text style={styles.runData}>{run.distance} km</Text>
                  </View>
                  <View style={styles.verticleLine}></View>
                  <View>
                    <Text style={styles.runDataTitle}>Pace:</Text>
                    <Text style={styles.runData}>{run.avgPace} /km</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        <View style={{ height: 130 }}></View>
      </ScrollView>
      <View style={[styles.btnContainer, styles.newBtnContainer]}>
        <Pressable
          style={styles.btn}
          onPress={() => navigation.navigate("Record", { location })}
        >
          <Text style={styles.btnText}>New</Text>
        </Pressable>
      </View>
    </View>
  );
}
