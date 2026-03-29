import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { CHIBI_CARD_STYLE, CHIBI_THEME } from "../../../../packages/chibi-ui/src";

const ORACLE_HINTS = [
  "宜：给今天留一点松弛感。",
  "宜：先做最小的一步，再继续。",
  "宜：和喜欢的人分享一件小事。",
  "忌：把自己逼得太紧。",
  "宜：慢慢来，也会到达。"
] as const;

const ORACLE_BLESSINGS = [
  "小羊卷今天想对你说：你已经很努力了。",
  "今天适合温柔一点，先照顾好自己。",
  "每一步都算数，哪怕很小。"
] as const;

export function OracleScreen() {
  const day = new Date().getDate();
  const tip = ORACLE_HINTS[day % ORACLE_HINTS.length] ?? ORACLE_HINTS[0];
  const blessing = ORACLE_BLESSINGS[day % ORACLE_BLESSINGS.length] ?? ORACLE_BLESSINGS[0];

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.card}>
        <Text style={styles.title}>时色签</Text>
        <Text style={styles.desc}>今天的轻提醒：不用完美，只要向前一点点。</Text>
        <View style={styles.tipBox}>
          <Text style={styles.tip}>{tip}</Text>
        </View>
        <Text style={styles.bless}>{blessing}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>今日小行动</Text>
        <Text style={styles.item}>1. 先喝一口温水</Text>
        <Text style={styles.item}>2. 完成一件最小任务</Text>
        <Text style={styles.item}>3. 给自己一句鼓励</Text>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>我已收到</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { paddingBottom: 20 },
  card: {
    ...CHIBI_CARD_STYLE,
    marginBottom: 12
  },
  title: { fontSize: 19, fontWeight: "800", color: CHIBI_THEME.color.textStrong, marginBottom: 8 },
  desc: { color: CHIBI_THEME.color.textSoft, lineHeight: 20 },
  tipBox: {
    marginTop: 12,
    borderRadius: 14,
    backgroundColor: "#F6FAFF",
    borderWidth: 1,
    borderColor: "#DCE8FF",
    padding: 12
  },
  tip: { color: "#3B527F", fontWeight: "700" },
  bless: { marginTop: 10, color: CHIBI_THEME.color.textNormal },
  item: { color: CHIBI_THEME.color.textNormal, marginBottom: 6 },
  btn: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "#4B7FE8",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  btnText: { color: "#FFFFFF", fontWeight: "700" }
});
