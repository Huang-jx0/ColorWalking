import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { MobileSheepCompanion } from "../components/MobileSheepCompanion";
import { CHIBI_CARD_STYLE, CHIBI_THEME } from "../../../../packages/chibi-ui/src";

export function PetScreen() {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.card}>
        <Text style={styles.title}>小羊卷</Text>
        <Text style={styles.desc}>今天的小羊卷状态: 元气满满，想和你贴贴。</Text>
        <MobileSheepCompanion phase="happy" colorName="云朵蓝" />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>陪伴进度</Text>
        <Text style={styles.item}>亲密度: 58 / 100</Text>
        <Text style={styles.item}>今日互动: 3 次</Text>
        <Text style={styles.item}>推荐: 摸摸头 + 抽一次色</Text>
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
  desc: { color: CHIBI_THEME.color.textSoft, lineHeight: 20, marginBottom: 6 },
  item: { color: CHIBI_THEME.color.textNormal, marginBottom: 6 }
});
