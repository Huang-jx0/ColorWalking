import type { MessageBucket } from "./types";

const MESSAGES: Record<MessageBucket, readonly string[]> = {
  enterMessages: [
    "我来啦，今天也让我在旁边陪你一会儿。",
    "轻轻报到，小羊卷今天继续和你同路。",
    "我已经在这儿了，你可以慢慢开始今天。",
    "先不用着急，我会安静地陪着你。"
  ],
  noticeMessages: [
    "我看到你啦，慢慢来就好。",
    "嗯，我在认真听你今天的心情。",
    "你一靠近，我就有点安心了。",
    "我在这里，和你站在同一边。",
    "你来了呀，今天也辛苦了。"
  ],
  curiousMessages: [
    "我悄悄看了一眼，今天会有点好事吗。",
    "你在动，我也跟着轻轻看一看。",
    "嗯？好像有一份新颜色要出现了。",
    "我在旁边观察，不会打扰你的。"
  ],
  clickMessages: [
    "这一下好温柔，我收到了。",
    "谢谢你摸摸我，心里暖了一点。",
    "被你轻轻碰到，今天也没那么紧了。",
    "我会记住这个小小的温柔。"
  ],
  happyMessages: [
    "抽到了，今天的颜色在对你点头。",
    "这份颜色很适合现在的你。",
    "我替你把这份好运轻轻收好啦。",
    "今天也有一抹亮色，真好。",
    "我们一起把这份颜色带进今天吧。"
  ],
  comfortMessages: [
    "累了就歇一下，我会在这儿等你。",
    "不用一直往前冲，慢一点也很好。",
    "今天已经很努力了，先让心松一口气。",
    "先照顾好自己，再处理别的也来得及。",
    "你不用每一刻都很强。"
  ],
  sleepyMessages: [
    "我有点困啦，想安静地陪着你。",
    "先放轻一点，我们都慢慢呼吸。",
    "夜色慢慢落下来，别忘了对自己温柔些。",
    "我会乖乖待着，你也可以先休息一会儿。"
  ],
  luckyColorMessages: [
    "这份颜色，好像正好落在你今天的节奏上。",
    "今天的幸运色已经在这里，慢慢收下就好。",
    "颜色已就位，我陪你把今天走完。",
    "这抹颜色在提醒你：你值得被认真对待。"
  ],
  repeatVisitMessages: [
    "你又来啦，小羊卷今天也很开心。",
    "每天见到你一点点，我就越来越安心。",
    "谢谢你记得来看看我。",
    "你出现的时候，今天就亮了一点。"
  ],
  farewellMessages: [
    "要走啦？路上也要照顾好自己。",
    "我会在这里等你下次回来。",
    "今天辛苦了，回去记得好好休息。",
    "先到这里也很好，明天再见。"
  ]
};

export function getMessages(bucket: MessageBucket): readonly string[] {
  return MESSAGES[bucket];
}

export function createMessagePicker(recentLimit = 5) {
  const recent: string[] = [];
  return (bucket: MessageBucket): string => {
    const lines = MESSAGES[bucket];
    if (!lines.length) return "";
    const candidates = lines.filter((line) => !recent.includes(line));
    const source = candidates.length ? candidates : lines;
    const picked = source[Math.floor(Math.random() * source.length)] ?? source[0] ?? "";
    if (!picked) return "";
    recent.unshift(picked);
    if (recent.length > recentLimit) recent.length = recentLimit;
    return picked;
  };
}

