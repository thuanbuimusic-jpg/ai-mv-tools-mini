let latestOutput = "";
let visibleOutput = "";
let latestRows = [];
let latestLanguage = "vi";

const outputPlaceholders = {
  vi: "Kết quả sẽ xuất hiện ở đây...",
  en: "Your generated plan will appear here..."
};

const messages = {
  vi: {
    titleFallback: "Bài hát chưa đặt tên",
    artistFallback: "Nghệ sĩ chưa xác định",
    needsLyrics: "Bạn cần dán lyrics trước.",
    needsGenerate: "Bạn cần generate trước.",
    noCleanLyrics: "Không có dòng lyrics hợp lệ để preview.",
    copied: "Đã copy output.",
    copyFailed: "Không copy được. Hãy bôi đen và copy thủ công."
  },
  en: {
    titleFallback: "Untitled Song",
    artistFallback: "Unknown Artist",
    needsLyrics: "Please paste lyrics first.",
    needsGenerate: "Please generate a plan first.",
    noCleanLyrics: "No valid lyric lines found for preview.",
    copied: "Output copied.",
    copyFailed: "Copy failed. Please select the output and copy manually."
  }
};

const demoSong = {
  title: "Qua Mùa Giông Bão",
  artist: "ThuanBui Music ft. Quyên Bùi",
  mood: "healing rainy ballad",
  style: "cinematic realistic Asian music video still",
  lyrics: [
    "Mưa rơi qua mái hiên xưa",
    "Gọi về một miền ký ức",
    "Ta ngồi nghe lòng rất khẽ",
    "Những đau buồn cũng ngủ yên",
    "Sau cơn giông trời lại sáng",
    "Bàn tay lau giọt mưa mềm",
    "Có những ngày tưởng đã mất",
    "Lại hóa thành lời bình yên",
    "Ký ức trôi qua ô cửa",
    "Để tim mình học cách lành"
  ].join("\n")
};

const copy = {
  vi: {
    planTitle: "KẾ HOẠCH AI MV",
    profile: "Hồ sơ bài hát",
    title: "Tên bài hát",
    artist: "Nghệ sĩ",
    mood: "Mood",
    style: "Style hình ảnh",
    aspectRatio: "Aspect ratio",
    shotlist: "Danh sách cảnh",
    scene: "Cảnh",
    lyric: "Lyrics",
    shotType: "Góc máy",
    visualIdea: "Ý tưởng hình ảnh",
    imagePrompts: "Prompt ảnh",
    imagePrompt: "Prompt ảnh",
    videoPrompts: "Prompt video",
    videoPrompt: "Prompt video",
    thumbnailPrompt: "Thumbnail Prompt",
    youtubeCaption: "YouTube Caption",
    facebookCaption: "Facebook Caption",
    checklist: "Production Checklist",
    visualIdeaText: mood => `Một cảnh ${mood} giàu chất thơ, lấy cảm hứng từ lyrics, tập trung vào cảm xúc, bầu không khí và chi tiết biểu tượng.`,
    imagePromptText: ({ shotType, scene, mood, style, aspectRatio }) =>
      `${shotType} cho một cảnh MV AI. Cảm hứng lyrics: "${scene}". Mood: ${mood}. Style hình ảnh: ${style}. Bố cục cảm xúc, điện ảnh, ánh sáng mềm, không khí chi tiết, chất lượng cao, ${aspectRatio}.`,
    videoPromptText: ({ motion, mood, aspectRatio }) =>
      `Tạo chuyển động cho cảnh này với ${motion}. Giữ nhân vật và bối cảnh nhất quán. Duy trì mood ${mood}. Chuyển động điện ảnh mượt, ánh sáng tự nhiên, không đổi camera đột ngột, thời lượng 5 giây, ${aspectRatio}.`,
    thumbnailText: ({ songTitle, artistName, mood, style, aspectRatio }) =>
      `Tạo thumbnail hoặc cover frame giàu khả năng thu hút cho MV AI chính thức "${songTitle}" của ${artistName}. Mood: ${mood}. Style: ${style}. Dùng một chủ thể chính giàu cảm xúc, tương phản rõ, chữ tiêu đề dễ đọc, thiết kế premium music video, ${aspectRatio}. Thêm text: "${songTitle}" và "${artistName}".`,
    youtubeText: ({ songTitle, artistName, mood, titleTag, artistTag }) =>
      `🎵 ${songTitle} - ${artistName}\n\nMột MV mang màu sắc ${mood}, kể lại những cảm xúc sâu lắng qua hình ảnh, giai điệu và từng câu hát.\n\nNếu bạn thấy mình trong bài hát này, hãy để lại một bình luận và chia sẻ cho người cần nghe nó hôm nay.\n\n#${titleTag} #${artistTag} #AIMusicVideo`,
    facebookText: ({ songTitle, artistName, mood }) =>
      `Có những bài hát không chỉ để nghe, mà để chạm vào một phần ký ức rất sâu trong lòng.\n\n"${songTitle}" - ${artistName} là một hành trình cảm xúc theo tinh thần ${mood}.\n\nMong rằng bài hát này sẽ ở lại với bạn trong một khoảnh khắc thật dịu dàng.`,
    checklistItems: [
      "Final lyrics checked",
      "Main character/reference chosen",
      "Image prompts generated",
      "Video prompts generated",
      "Thumbnail created",
      "Captions prepared",
      "YouTube title optimized",
      "Export final MV"
    ],
    csvHeaders: ["Cảnh", "Lyrics", "Góc máy", "Ý tưởng hình ảnh", "Prompt ảnh", "Prompt video", "Aspect ratio"]
  },
  en: {
    planTitle: "AI MV PLAN",
    profile: "Song Profile",
    title: "Title",
    artist: "Artist",
    mood: "Mood",
    style: "Visual Style",
    aspectRatio: "Aspect Ratio",
    shotlist: "Shotlist",
    scene: "Scene",
    lyric: "Lyric",
    shotType: "Shot type",
    visualIdea: "Visual idea",
    imagePrompts: "Image Prompts",
    imagePrompt: "Image Prompt",
    videoPrompts: "Video Prompts",
    videoPrompt: "Video Prompt",
    thumbnailPrompt: "Thumbnail Prompt",
    youtubeCaption: "YouTube Caption",
    facebookCaption: "Facebook Caption",
    checklist: "Production Checklist",
    visualIdeaText: mood => `A poetic ${mood} scene inspired by the lyric, focused on emotion, atmosphere, and symbolic details.`,
    imagePromptText: ({ shotType, scene, mood, style, aspectRatio }) =>
      `${shotType} for an AI music video scene. Lyric inspiration: "${scene}". Mood: ${mood}. Visual style: ${style}. Emotional, cinematic, poetic composition, soft lighting, detailed atmosphere, high quality, ${aspectRatio}.`,
    videoPromptText: ({ motion, mood, aspectRatio }) =>
      `Animate this scene with ${motion}. Keep the subject consistent. Preserve the ${mood} mood. Smooth cinematic motion, natural lighting, no sudden camera movement, 5 seconds, ${aspectRatio}.`,
    thumbnailText: ({ songTitle, artistName, mood, style, aspectRatio }) =>
      `Create a high-click cinematic thumbnail or cover frame for the official AI music video "${songTitle}" by ${artistName}. Mood: ${mood}. Style: ${style}. Use one emotionally powerful main subject, strong contrast, readable title text, premium music video design, ${aspectRatio}. Add text: "${songTitle}" and "${artistName}".`,
    youtubeText: ({ songTitle, artistName, mood, titleTag, artistTag }) =>
      `🎵 ${songTitle} - ${artistName}\n\nAn AI music video shaped by a ${mood} mood, translating the song's emotion into cinematic images, movement, and atmosphere.\n\nIf this song speaks to you, leave a comment and share it with someone who needs to hear it today.\n\n#${titleTag} #${artistTag} #AIMusicVideo`,
    facebookText: ({ songTitle, artistName, mood }) =>
      `Some songs are not only heard. They stay with us and bring back a quiet part of memory.\n\n"${songTitle}" - ${artistName} is an emotional journey in a ${mood} direction.\n\nMay this song stay with you for one gentle moment.`,
    checklistItems: [
      "Final lyrics checked",
      "Main character/reference chosen",
      "Image prompts generated",
      "Video prompts generated",
      "Thumbnail created",
      "Captions prepared",
      "YouTube title optimized",
      "Export final MV"
    ],
    csvHeaders: ["Scene", "Lyric", "Shot type", "Visual idea", "Image prompt", "Video prompt", "Aspect ratio"]
  }
};

function cleanSrtAndLyrics(rawText) {
  const srtIndexPattern = /^\d+$/;
  const srtTimestampPattern = /^\d{2}:\d{2}:\d{2}[,.]\d{3}\s*-->\s*\d{2}:\d{2}:\d{2}[,.]\d{3}(?:\s+.*)?$/;

  return rawText
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .filter(line => !srtIndexPattern.test(line))
    .filter(line => !srtTimestampPattern.test(line));
}

function countDetectedLines(rawText) {
  return rawText
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0).length;
}

function chunkLines(lines, size = 2) {
  const chunks = [];
  for (let i = 0; i < lines.length; i += size) {
    chunks.push(lines.slice(i, i + size).join(" / "));
  }
  return chunks;
}

function generateShotType(index, language = "en") {
  const shotTypes = {
    vi: [
      "Toàn cảnh",
      "Trung cảnh",
      "Cận cảnh",
      "Góc qua vai",
      "Cận cảnh chi tiết",
      "Tracking shot chậm",
      "Khung hình tĩnh giàu chất thơ",
      "Cảnh bóng silhouette"
    ],
    en: [
      "Wide shot",
      "Medium shot",
      "Close-up",
      "Over-the-shoulder shot",
      "Macro detail shot",
      "Slow tracking shot",
      "Static poetic frame",
      "Silhouette shot"
    ]
  };

  const list = shotTypes[language] || shotTypes.en;
  return list[index % list.length];
}

function generateMotion(index, language = "en") {
  const motions = {
    vi: [
      "push-in chậm, nhịp thở nhẹ, ánh sáng chớp rất tinh tế",
      "tracking chậm, rèm cửa chuyển động mềm",
      "khung hình tĩnh, giọt mưa trượt trên kính",
      "handheld nhẹ, texture phim hoài niệm",
      "pan chậm, lá cây đung đưa trong gió",
      "zoom-in mềm, ánh sáng ấm lan nhẹ",
      "chuyển động tối giản, giữ một khoảng lặng cảm xúc",
      "dolly lùi chậm, không khí cô đơn"
    ],
    en: [
      "slow push-in, gentle breathing, subtle light flicker",
      "slow tracking movement, curtains moving softly",
      "static frame, rain droplets moving on glass",
      "gentle handheld motion, nostalgic film texture",
      "slow pan, leaves swaying in the wind",
      "soft zoom-in, warm light blooming",
      "minimal movement, emotional pause",
      "slow dolly backward, lonely atmosphere"
    ]
  };

  const list = motions[language] || motions.en;
  return list[index % list.length];
}

function getSelectedLanguage() {
  return document.getElementById("outputLanguage").value || "vi";
}

function getLocalizedSelectValue(selectId, language) {
  const select = document.getElementById(selectId);
  const selected = select.options[select.selectedIndex];
  return selected.dataset[language] || selected.value;
}

function setSelectValue(selectId, value) {
  const select = document.getElementById(selectId);
  const optionIndex = Array.from(select.options).findIndex(option => option.value === value);

  select.value = value;

  if (optionIndex >= 0) {
    select.selectedIndex = optionIndex;
  }
}

function toHashtag(text) {
  const tag = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "");

  return tag || "AIMV";
}

function createSlug(text) {
  const slug = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "ai-mv-plan";
}

function buildRows(scenes, mood, style, aspectRatio, language) {
  const t = copy[language];

  return scenes.map((scene, index) => {
    const sceneNumber = String(index + 1).padStart(2, "0");
    const shotType = generateShotType(index, language);
    const motion = generateMotion(index, language);
    const visualIdea = t.visualIdeaText(mood);
    const imagePrompt = t.imagePromptText({ shotType, scene, mood, style, aspectRatio });
    const videoPrompt = t.videoPromptText({ motion, mood, aspectRatio });

    return {
      sceneNumber,
      lyric: scene,
      shotType,
      visualIdea,
      imagePrompt,
      videoPrompt,
      aspectRatio
    };
  });
}

function updateLyricsStats() {
  const stats = document.getElementById("lyricsStats");

  if (!stats) {
    return;
  }

  const lyricsRaw = document.getElementById("lyrics").value;
  const detectedLines = countDetectedLines(lyricsRaw);
  const cleanLines = cleanSrtAndLyrics(lyricsRaw).length;

  stats.textContent = `Detected lines: ${detectedLines} | Clean lyric lines: ${cleanLines}`;
}

function previewCleanLyrics() {
  const language = getSelectedLanguage();
  const lyricsRaw = document.getElementById("lyrics").value.trim();
  const lines = cleanSrtAndLyrics(lyricsRaw);

  updateLyricsStats();

  if (!lyricsRaw) {
    alert(messages[language].needsLyrics);
    return;
  }

  if (!lines.length) {
    alert(messages[language].noCleanLyrics);
    return;
  }

  visibleOutput = `Clean Lyrics Preview\n\n${lines.join("\n")}`;
  latestLanguage = language;
  document.getElementById("output").textContent = visibleOutput;
}

function loadDemoSong() {
  document.getElementById("songTitle").value = demoSong.title;
  document.getElementById("artistName").value = demoSong.artist;
  setSelectValue("mood", demoSong.mood);
  setSelectValue("style", demoSong.style);
  document.getElementById("lyrics").value = demoSong.lyrics;

  updateLyricsStats();
  generateMVPlan();
}

function generateMVPlan() {
  const language = getSelectedLanguage();
  const t = copy[language];
  const message = messages[language];
  const songTitle = document.getElementById("songTitle").value.trim() || message.titleFallback;
  const artistName = document.getElementById("artistName").value.trim() || message.artistFallback;
  const mood = getLocalizedSelectValue("mood", language);
  const style = getLocalizedSelectValue("style", language);
  const aspectRatio = document.getElementById("aspectRatio").value;
  const lyricsRaw = document.getElementById("lyrics").value.trim();

  if (!lyricsRaw) {
    alert(message.needsLyrics);
    return;
  }

  const lines = cleanSrtAndLyrics(lyricsRaw);

  if (!lines.length) {
    alert(message.noCleanLyrics);
    return;
  }

  const scenes = chunkLines(lines, 2);
  const rows = buildRows(scenes, mood, style, aspectRatio, language);
  const titleTag = toHashtag(songTitle);
  const artistTag = toHashtag(artistName);

  let output = "";

  output += `# ${t.planTitle}\n\n`;
  output += `## ${t.profile}\n`;
  output += `- ${t.title}: ${songTitle}\n`;
  output += `- ${t.artist}: ${artistName}\n`;
  output += `- ${t.mood}: ${mood}\n`;
  output += `- ${t.style}: ${style}\n`;
  output += `- ${t.aspectRatio}: ${aspectRatio}\n\n`;

  output += `---\n\n`;
  output += `## 1. ${t.shotlist}\n\n`;

  rows.forEach(row => {
    output += `### ${t.scene} ${row.sceneNumber}\n`;
    output += `- ${t.lyric}: "${row.lyric}"\n`;
    output += `- ${t.shotType}: ${row.shotType}\n`;
    output += `- ${t.visualIdea}: ${row.visualIdea}\n\n`;
  });

  output += `---\n\n`;
  output += `## 2. ${t.imagePrompts}\n\n`;

  rows.forEach(row => {
    output += `### ${t.imagePrompt} ${row.sceneNumber}\n`;
    output += `${row.imagePrompt}\n\n`;
  });

  output += `---\n\n`;
  output += `## 3. ${t.videoPrompts}\n\n`;

  rows.forEach(row => {
    output += `### ${t.videoPrompt} ${row.sceneNumber}\n`;
    output += `${row.videoPrompt}\n\n`;
  });

  output += `---\n\n`;
  output += `## 4. ${t.thumbnailPrompt}\n\n`;
  output += `${t.thumbnailText({ songTitle, artistName, mood, style, aspectRatio })}\n\n`;

  output += `---\n\n`;
  output += `## 5. ${t.youtubeCaption}\n\n`;
  output += `${t.youtubeText({ songTitle, artistName, mood, titleTag, artistTag })}\n\n`;

  output += `---\n\n`;
  output += `## 6. ${t.facebookCaption}\n\n`;
  output += `${t.facebookText({ songTitle, artistName, mood })}\n\n`;

  output += `---\n\n`;
  output += `## 7. ${t.checklist}\n\n`;
  t.checklistItems.forEach(item => {
    output += `- [ ] ${item}\n`;
  });

  latestOutput = output;
  visibleOutput = output;
  latestRows = rows;
  latestLanguage = language;
  document.getElementById("output").textContent = output;
  updateLyricsStats();
}

function downloadFile(content, fileName, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();

  URL.revokeObjectURL(url);
}

function downloadMarkdown() {
  if (!latestOutput) {
    alert(messages[getSelectedLanguage()].needsGenerate);
    return;
  }

  const songTitle = document.getElementById("songTitle").value.trim();
  const fileName = `${createSlug(songTitle)}-ai-mv-plan.md`;

  downloadFile(latestOutput, fileName, "text/markdown;charset=utf-8");
}

function escapeCSV(value) {
  const stringValue = String(value ?? "");
  return `"${stringValue.replace(/"/g, '""')}"`;
}

function downloadCSV() {
  if (!latestRows.length) {
    alert(messages[getSelectedLanguage()].needsGenerate);
    return;
  }

  const t = copy[latestLanguage];
  const header = t.csvHeaders.map(escapeCSV).join(",");
  const rows = latestRows.map(row => [
    row.sceneNumber,
    row.lyric,
    row.shotType,
    row.visualIdea,
    row.imagePrompt,
    row.videoPrompt,
    row.aspectRatio
  ].map(escapeCSV).join(","));
  const csv = `\uFEFF${[header, ...rows].join("\n")}`;
  const songTitle = document.getElementById("songTitle").value.trim();
  const fileName = `${createSlug(songTitle)}-shotlist.csv`;

  downloadFile(csv, fileName, "text/csv;charset=utf-8");
}

function copyOutput() {
  const outputToCopy = visibleOutput || latestOutput;

  if (!outputToCopy) {
    alert(messages[getSelectedLanguage()].needsGenerate);
    return;
  }

  const message = messages[latestLanguage];
  navigator.clipboard.writeText(outputToCopy)
    .then(() => alert(message.copied))
    .catch(() => alert(message.copyFailed));
}

function clearForm() {
  document.getElementById("songTitle").value = "";
  document.getElementById("artistName").value = "";
  document.getElementById("mood").selectedIndex = 0;
  document.getElementById("style").selectedIndex = 0;
  document.getElementById("aspectRatio").selectedIndex = 0;
  document.getElementById("outputLanguage").selectedIndex = 0;
  document.getElementById("lyrics").value = "";
  document.getElementById("output").textContent = outputPlaceholders.vi;

  latestOutput = "";
  visibleOutput = "";
  latestRows = [];
  latestLanguage = "vi";
  updateLyricsStats();
}

updateLyricsStats();
