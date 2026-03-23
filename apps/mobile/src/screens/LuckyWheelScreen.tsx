import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLOR_PALETTE, createDrawEngine, type DrawResult } from "@colorwalking/shared";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import { WheelGraphic } from "../components/WheelGraphic";

const HISTORY_KEY = "colorwalking.history.v1";
const WHEEL_SIZE = 300;
const EXTRA_ROUNDS = 6;

export function LuckyWheelScreen() {
  const engine = useMemo(() => createDrawEngine(COLOR_PALETTE), []);
  const rotate = useRef(new Animated.Value(0)).current;
  const totalAngle = useRef(0);
  const [result, setResult] = useState<DrawResult | null>(null);
  const [history, setHistory] = useState<DrawResult[]>([]);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(HISTORY_KEY).then((raw) => {
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw) as DrawResult[];
        setHistory(parsed.slice(0, 5));
      } catch {
        setHistory([]);
      }
    });
  }, []);

  const persistHistory = useCallback(async (next: DrawResult[]) => {
    const keep = next.slice(0, 100);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(keep));
    setHistory(keep.slice(0, 5));
  }, []);

  const spin = useCallback(() => {
    if (spinning) return;

    const draw = engine.draw();
    const sector = 360 / engine.palette.length;
    const targetCenter = draw.index * sector + sector / 2;
    const pointerAt = 360;
    const alignment = pointerAt - targetCenter;
    const nextAngle = totalAngle.current + EXTRA_ROUNDS * 360 + alignment;

    setSpinning(true);
    Animated.timing(rotate, {
      toValue: nextAngle,
      duration: 2300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true
    }).start(async () => {
      totalAngle.current = nextAngle % 360;
      rotate.setValue(totalAngle.current);
      setResult(draw);
      await persistHistory([draw, ...history]);
      setSpinning(false);
    });
  }, [engine, history, persistHistory, rotate, spinning]);

  const spinStyle = {
    transform: [
      {
        rotate: rotate.interpolate({
          inputRange: [0, 360],
          outputRange: ["0deg", "360deg"]
        })
      }
    ]
  };

  return (
    <View style={styles.page}>
      <View style={styles.wheelBlock}>
        <View style={styles.pointer} />
        <Pressable style={styles.wheelPressable} onPress={spin}>
          <Animated.View style={[styles.wheelSurface, spinStyle]}>
            <WheelGraphic size={WHEEL_SIZE} colors={engine.palette} />
          </Animated.View>
          <Pressable style={styles.centerBtn} onPress={spin}>
            <Text style={styles.centerText}>{spinning ? "转动中" : "再抽一次"}</Text>
          </Pressable>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>今日幸运色</Text>
        {result ? (
          <>
            <View style={[styles.swatch, { backgroundColor: result.color.hex }]} />
            <Text style={styles.colorName}>{result.color.name}</Text>
            <Text style={styles.hex}>{result.color.hex}</Text>
            <Text style={styles.message}>{result.color.message}</Text>
          </>
        ) : (
          <Text style={styles.placeholder}>点击转盘，开始今天的好心情。</Text>
        )}
      </View>

      <View style={styles.historyCard}>
        <Text style={styles.cardTitle}>最近抽取</Text>
        {history.length === 0 ? (
          <Text style={styles.placeholder}>还没有记录</Text>
        ) : (
          history.map((item) => (
            <View key={item.id} style={styles.historyRow}>
              <View style={[styles.dot, { backgroundColor: item.color.hex }]} />
              <Text style={styles.historyText}>{item.color.name}</Text>
              <Text style={styles.historyHex}>{item.color.hex}</Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center"
  },
  wheelBlock: {
    marginTop: 6,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  pointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 22,
    borderStyle: "solid",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#1F2A44",
    marginBottom: -4,
    zIndex: 2
  },
  wheelPressable: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    alignItems: "center",
    justifyContent: "center"
  },
  wheelSurface: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    borderRadius: WHEEL_SIZE / 2,
    overflow: "hidden",
    borderWidth: 6,
    borderColor: "#FFFFFF",
    elevation: 6
  },
  centerBtn: {
    position: "absolute",
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: "#1F2A44",
    alignItems: "center",
    justifyContent: "center"
  },
  centerText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700"
  },
  card: {
    width: "100%",
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 12
  },
  historyCard: {
    width: "100%",
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    padding: 16
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1F2A44",
    marginBottom: 10
  },
  swatch: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginBottom: 10
  },
  colorName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1F2A44"
  },
  hex: {
    fontSize: 14,
    color: "#61708B",
    marginBottom: 6
  },
  message: {
    fontSize: 15,
    color: "#33415F"
  },
  placeholder: {
    color: "#77839A"
  },
  historyRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 10
  },
  historyText: {
    flex: 1,
    color: "#2A3653"
  },
  historyHex: {
    color: "#6A7791"
  }
});
