import React, { useMemo, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type CompanionModuleId = "emotion" | "memory" | "interaction" | "device";

type CompanionModule = {
  id: CompanionModuleId;
  name: string;
  summary: string;
  upgradePath: string;
};

type BrandWorldProfile = {
  heroName: string;
  heroTitle: string;
  originStory: string;
};

type ProductShowcaseItem = {
  name: string;
  mobileImageUrl: string;
};

const WORLD_PROFILE: BrandWorldProfile = {
  heroName: "小羊卷",
  heroTitle: "幸运色陪伴体",
  originStory: "来自颜色云岛，以低打扰节奏提供情绪陪伴、日常互动和温柔提醒。"
};

const MODULES: CompanionModule[] = [
  {
    id: "emotion",
    name: "情绪陪伴",
    summary: "根据互动状态给出轻量反馈，保持稳定的情绪节奏。",
    upgradePath: "后续可接入更多场景化反馈机制。"
  },
  {
    id: "memory",
    name: "记忆回路",
    summary: "记录互动片段与幸运色轨迹，形成连续的陪伴体验。",
    upgradePath: "后续可扩展为长期记忆与回放能力。"
  },
  {
    id: "interaction",
    name: "互动中枢",
    summary: "统一文字、语音与场景切换入口，降低使用门槛。",
    upgradePath: "后续可衔接更完整的角色任务链路。"
  },
  {
    id: "device",
    name: "设备联动",
    summary: "预留与硬件同步协议，便于未来升级实体形态。",
    upgradePath: "后续可平滑过渡到硬件主控台。"
  }
];

const SHOWCASE_ITEM: ProductShowcaseItem = {
  name: "小羊卷官方主视觉",
  mobileImageUrl: "https://www.colorful-lamb-rolls.cloud/images/products/official/sheep-roll-official.jpg"
};

function moduleSummary(module: CompanionModule, connected: boolean): string {
  if (module.id !== "device") return module.summary;
  return connected ? "设备链路正常，等待下一次同步。" : "设备未连接，当前保持纯软件陪伴模式。";
}

export function CompanionHubScreen() {
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [emotionLevel, setEmotionLevel] = useState(72);
  const [activeModuleId, setActiveModuleId] = useState<CompanionModuleId>("emotion");

  const activeModule = useMemo(
    () => MODULES.find((item) => item.id === activeModuleId) ?? MODULES[0],
    [activeModuleId]
  );

  return (
    <View style={styles.root}>
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>{WORLD_PROFILE.heroName}</Text>
        <Text style={styles.heroSubtitle}>{WORLD_PROFILE.heroTitle}</Text>
        <Text style={styles.heroStory}>{WORLD_PROFILE.originStory}</Text>
      </View>

      <View style={styles.moduleRow}>
        {MODULES.map((item) => (
          <Pressable
            key={item.id}
            style={[styles.moduleChip, activeModuleId === item.id && styles.moduleChipActive]}
            onPress={() => setActiveModuleId(item.id)}
          >
            <Text style={[styles.moduleChipText, activeModuleId === item.id && styles.moduleChipTextActive]}>
              {item.name}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>{activeModule.name}</Text>
        <Text style={styles.statusSummary}>{moduleSummary(activeModule, deviceConnected)}</Text>
        <Text style={styles.statusHint}>{activeModule.upgradePath}</Text>
      </View>

      <View style={styles.metricGrid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>情绪值</Text>
          <Text style={styles.metricValue}>{emotionLevel}</Text>
          <View style={styles.actionRow}>
            <Pressable style={styles.actionBtn} onPress={() => setEmotionLevel((v) => Math.min(100, v + 6))}>
              <Text style={styles.actionBtnText}>+ 安抚</Text>
            </Pressable>
            <Pressable style={styles.actionBtn} onPress={() => setEmotionLevel((v) => Math.max(0, v - 6))}>
              <Text style={styles.actionBtnText}>- 疲惫</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>记忆回路</Text>
          <Text style={styles.metricBody}>今天记录了 3 条温柔片段，幸运色为「云蓝」。</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>互动中枢</Text>
          <Text style={styles.metricBody}>已完成 4 次低打扰互动，可继续文字或语音陪伴。</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>设备联动</Text>
          <Text style={styles.metricBody}>
            {deviceConnected ? "已连接硬件占位链路。" : "未连接硬件，保持 Web/App Demo 模式。"}
          </Text>
          <Pressable style={styles.toggleBtn} onPress={() => setDeviceConnected((v) => !v)}>
            <Text style={styles.toggleBtnText}>{deviceConnected ? "断开设备" : "连接设备占位"}</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.imageCard}>
        <Image source={{ uri: SHOWCASE_ITEM.mobileImageUrl }} style={styles.productImage} />
        <Text style={styles.imageCaption}>主素材：{SHOWCASE_ITEM.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: 10
  },
  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1F2A44"
  },
  heroSubtitle: {
    marginTop: 2,
    color: "#5E6F8D",
    fontWeight: "600"
  },
  heroStory: {
    marginTop: 8,
    color: "#42516C",
    lineHeight: 20
  },
  moduleRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6
  },
  moduleChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#C8D5EC",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  moduleChipActive: {
    backgroundColor: "#1F2A44",
    borderColor: "#1F2A44"
  },
  moduleChipText: {
    color: "#3A4A68"
  },
  moduleChipTextActive: {
    color: "#FFFFFF"
  },
  statusCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2A44"
  },
  statusSummary: {
    marginTop: 6,
    color: "#40506D",
    lineHeight: 20
  },
  statusHint: {
    marginTop: 5,
    color: "#677892"
  },
  metricGrid: {
    gap: 8
  },
  metricCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12
  },
  metricLabel: {
    color: "#5D6F8F",
    fontSize: 13
  },
  metricValue: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: "800",
    color: "#1F2A44"
  },
  metricBody: {
    marginTop: 6,
    color: "#3E4E6B",
    lineHeight: 19
  },
  actionRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8
  },
  actionBtn: {
    borderRadius: 8,
    backgroundColor: "#1F2A44",
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  actionBtnText: {
    color: "#FFFFFF",
    fontWeight: "700"
  },
  toggleBtn: {
    marginTop: 8,
    alignSelf: "flex-start",
    borderRadius: 8,
    backgroundColor: "#25365A",
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  toggleBtnText: {
    color: "#FFFFFF",
    fontWeight: "700"
  },
  imageCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 10
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 10
  },
  imageCaption: {
    marginTop: 6,
    color: "#5C6D8A"
  }
});
