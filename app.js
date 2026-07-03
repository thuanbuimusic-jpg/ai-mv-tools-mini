let latestOutput = "";

function cleanLyrics(rawLyrics) {
  return rawLyrics
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0);
}

function chunkLines(lines, size = 2) {
  const chunks = [];
  for (let i = 0; i < lines.length; i += size) {
    chunks.push(lines.slice(i, i + size).join(" / "));
  }
  return chunks;
}

function generateShotType(index) {
  const shotTypes = [
    "Wide shot",
    "Medium shot",
    "Close-up",
    "Over-the-shoulder shot",
    "Macro detail shot",
    "Slow tracking shot",
    "Static poetic frame",
    "Silhouette shot"
  ];

  return shotTypes[index % shotTypes.length];
}

function generateMotion(index) {
  const motions = [
    "slow push-in, gentle breathing, subtle light flicker",
    "slow tracking movement, curtains moving softly",
    "static frame, rain droplets moving on glass",
    "gentle handheld motion, nostalgic film texture",
    "slow pan, leaves swaying in the wind",
    "soft zoom-in, warm light blooming",
    "minimal movement, emotional pause",
    "slow dolly backward, lonely atmosphere"
  ];

  return motions[index % motions.length];
}

function generateMVPlan() {
  const songTitle = document.getElementById("songTitle").value.trim() || "Untitled Song";
  const artistName = document.getElementById("artistName").value.trim() || "Unknown Artist";
  const mood = document.getElementById("mood").value;
  const style = document.getElementById("style").value;
  const lyricsRaw = document.getElementById("lyrics").value.trim();

  if (!lyricsRaw) {
    alert("Bạn cần dán lyrics trước.");
    return;
  }

  const lines = cleanLyrics(lyricsRaw);
  const scenes = chunkLines(lines, 2);

  let output = "";

  output += `# AI MV PLAN\n\n`;
  output += `## Song Profile\n`;
  output += `- Title: ${songTitle}\n`;
  output += `- Artist: ${artistName}\n`;
  output += `- Mood: ${mood}\n`;
  output += `- Visual Style: ${style}\n\n`;

  output += `---\n\n`;
  output += `## 1. Shotlist\n\n`;

  scenes.forEach((scene, index) => {
    const sceneNumber = String(index + 1).padStart(2, "0");
    const shotType = generateShotType(index);

    output += `### Scene ${sceneNumber}\n`;
    output += `- Lyric: "${scene}"\n`;
    output += `- Shot type: ${shotType}\n`;
    output += `- Visual idea: A poetic ${mood} scene inspired by the lyric, focused on emotion, atmosphere, and symbolic details.\n\n`;
  });

  output += `---\n\n`;
  output += `## 2. Image Prompts\n\n`;

  scenes.forEach((scene, index) => {
    const sceneNumber = String(index + 1).padStart(2, "0");
    const shotType = generateShotType(index);

    output += `### Image Prompt ${sceneNumber}\n`;
    output += `${shotType} for an AI music video scene. Lyric inspiration: "${scene}". Mood: ${mood}. Visual style: ${style}. Emotional, cinematic, poetic composition, soft lighting, detailed atmosphere, high quality, 16:9.\n\n`;
  });

  output += `---\n\n`;
  output += `## 3. Video Prompts\n\n`;

  scenes.forEach((scene, index) => {
    const sceneNumber = String(index + 1).padStart(2, "0");
    const motion = generateMotion(index);

    output += `### Video Prompt ${sceneNumber}\n`;
    output += `Animate this scene with ${motion}. Keep the subject consistent. Preserve the ${mood} mood. Smooth cinematic motion, natural lighting, no sudden camera movement, 5 seconds.\n\n`;
  });

  output += `---\n\n`;
  output += `## 4. Thumbnail Prompt\n\n`;
  output += `Create a high-click cinematic YouTube thumbnail for the official music video "${songTitle}" by ${artistName}. Mood: ${mood}. Style: ${style}. Use one emotionally powerful main subject, strong contrast, readable title text, premium music video design, 16:9. Add text: "${songTitle}" and "${artistName}".\n\n`;

  output += `---\n\n`;
  output += `## 5. YouTube Caption\n\n`;
  output += `🎵 ${songTitle} - ${artistName}\n\n`;
  output += `Một MV mang màu sắc ${mood}, kể lại những cảm xúc sâu lắng qua hình ảnh, giai điệu và từng câu hát.\n\n`;
  output += `Nếu bạn thấy mình trong bài hát này, hãy để lại một bình luận và chia sẻ cho người cần nghe nó hôm nay.\n\n`;
  output += `#${songTitle.replace(/\s+/g, "")} #${artistName.replace(/\s+/g, "")} #AIMusicVideo\n\n`;

  output += `---\n\n`;
  output += `## 6. Facebook Caption\n\n`;
  output += `Có những bài hát không chỉ để nghe, mà để chạm vào một phần ký ức rất sâu trong lòng.\n\n`;
  output += `"${songTitle}" - ${artistName} là một hành trình cảm xúc theo tinh thần ${mood}.\n\n`;
  output += `Mong rằng bài hát này sẽ ở lại với bạn trong một khoảnh khắc thật dịu dàng.\n\n`;

  output += `---\n\n`;
  output += `## 7. Production Checklist\n\n`;
  output += `- [ ] Final lyrics checked\n`;
  output += `- [ ] Main character/reference chosen\n`;
  output += `- [ ] Image prompts generated\n`;
  output += `- [ ] Video prompts generated\n`;
  output += `- [ ] Thumbnail created\n`;
  output += `- [ ] Captions prepared\n`;
  output += `- [ ] YouTube title optimized\n`;
  output += `- [ ] Export final MV\n`;

  latestOutput = output;
  document.getElementById("output").textContent = output;
}

function downloadMarkdown() {
  if (!latestOutput) {
    alert("Bạn cần generate trước.");
    return;
  }

  const blob = new Blob([latestOutput], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "ai-mv-plan.md";
  a.click();

  URL.revokeObjectURL(url);
}

function copyOutput() {
  if (!latestOutput) {
    alert("Bạn cần generate trước.");
    return;
  }

  navigator.clipboard.writeText(latestOutput)
    .then(() => alert("Đã copy output."))
    .catch(() => alert("Không copy được. Hãy bôi đen và copy thủ công."));
}