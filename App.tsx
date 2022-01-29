import { Animated } from "react-native";
import React, { useState, useRef } from "react";
import Neos from "./components/Neos";
import Layout from "./components/Layout";
import DatePicker from "./components/DatePicker";

export default function App() {
  const scrollY = useRef<Animated.Value>(new Animated.Value(0));
  const [dateSelected, setDateSelected] = useState(new Date());

  return (
    <Layout>
      <DatePicker
        scrollY={scrollY}
        dateSelected={dateSelected}
        setDateSelected={setDateSelected}
      />
      <Neos date={dateSelected} scrollY={scrollY.current} />
    </Layout>
  );
}
