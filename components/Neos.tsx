import React, { Ref, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";

const AVATAR_SIZE = 60;
const SPACING = 5;
const ITEM_SIZE = AVATAR_SIZE + 30 + SPACING + 2;

interface Neo {
  name: string;
  id: number;
  speed: number;
  isPotentiallyHazardous: boolean;
  diameter: number;
  missDistance: number;
}
interface NeoFromApi {
  name: string;
  id: number;
  estimated_diameter: {
    feet: { estimated_diameter_min: number; estimated_diameter_max: number };
  };
  close_approach_data: Array<{
    relative_velocity: { miles_per_hour: number };
    miss_distance: { miles: number };
  }>;
  is_potentially_hazardous_asteroid: boolean;
}

function Neos({ date, scrollY }: { date: Date; scrollY: Animated.Value }) {
  let api_key = "2zcSAHeiiktxliyCHz2eVVzGfUpwPsFqTX97WquF";
  const start_date = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${start_date}&api_key=${api_key}`,
      {}
    )
      .then((res) => res.json())
      .then((res) => {
        let map = res.near_earth_objects[`${start_date}`].map(
          (obj: NeoFromApi) => {
            return {
              id: obj.id,
              name: obj.name.startsWith("(")
                ? obj.name.substring(1, obj.name.length - 1)
                : obj.name.substring(
                    obj.name.indexOf("(") + 1,
                    obj.name.length - 1
                  ),
              diameter:
                (obj.estimated_diameter.feet.estimated_diameter_max +
                  obj.estimated_diameter.feet.estimated_diameter_min) /
                2,
              missDistance: obj.close_approach_data[0].miss_distance.miles,
              speed:
                obj.close_approach_data[0].relative_velocity.miles_per_hour,
              isPotentiallyHazardous: obj.is_potentially_hazardous_asteroid,
            };
          }
        );
        setData(map);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [date]);

  return loading ? null : (
    <Animated.FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      renderItem={({ item, index }) => {
        return <Neo data={item} index={index} scrollY={scrollY} />;
      }}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        padding: 20,
      }}
    />
  );
}

const Neo = ({
  data,
  index,
  scrollY,
}: {
  scrollY: Animated.Value;
  index: number;
  data: Neo;
}) => {
  const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];
  const scale = scrollY.interpolate({
    inputRange,
    outputRange: [1, 1, 1, 0],
  });
  const opacityInputRange = [
    -1,
    0,
    ITEM_SIZE * index,
    ITEM_SIZE * (index + 0.2),
  ];
  const opacity = scrollY.interpolate({
    inputRange: opacityInputRange,
    outputRange: [1, 1, 1, 0],
  });
  return (
    <Animated.View style={{ ...styles.NEO, transform: [{ scale }], opacity }}>
      <View style={styles.avatarContainer}>
        <Text style={{ ...styles.attribute, textAlign: "center" }}>
          {data.name}
        </Text>
      </View>
      <View>
        <Text
          style={{
            ...styles.attribute,
            color: data.isPotentiallyHazardous ? "#FF0000" : "#888888",
          }}
        >
          {data.isPotentiallyHazardous ? "HAZARDOUS" : "NOT HAZARDOUS"}
        </Text>
        <Text style={styles.attribute}>
          {`Diameter: ${(Math.round(data.diameter * 100) / 100).toLocaleString(
            "en-US"
          )} ft`}
        </Text>
        <Text style={styles.attribute}>
          {`Miss Distance: ${(
            Math.round(data.missDistance * 100) / 100
          ).toLocaleString("en-US")} mi`}
        </Text>
        <Text style={styles.attribute}>
          {`Velocity: ${(Math.round(data.speed * 100) / 100).toLocaleString(
            "en-US"
          )} mi/h`}
        </Text>
      </View>
    </Animated.View>
  );
};
export default Neos;

const styles = StyleSheet.create({
  attribute: {
    borderRadius: 100,
    fontWeight: "700",
  },
  avatarContainer: {
    backgroundColor: "#FFFFFF",
    marginRight: 10,
    height: AVATAR_SIZE,
    borderRadius: 100,
    flex: 1,
    maxWidth: AVATAR_SIZE,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  NEO: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    marginBottom: SPACING * 4,
    padding: SPACING,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 20,
    shadowOpacity: 0.0,
  },
});
