const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const sourceDir = path.join(root, "public", "showcase", "source");
const outputDirs = {
  vi: path.join(root, "public", "showcase", "vi"),
  en: path.join(root, "public", "showcase", "en")
};

const features = [
  {
    key: "calendar",
    image: "calendar.jpg",
    vi: {
      eyebrow: "Calendar",
      title: "Lịch Chăm trong tầm tay",
      description: "Theo dõi Lịch Chăm, Lịch Awal và Dương lịch trong cùng một ứng dụng."
    },
    en: {
      eyebrow: "Calendar",
      title: "Cham Calendar at your fingertips",
      description: "View Cham Calendar, Awal Calendar and Gregorian Calendar together."
    }
  },
  {
    key: "upcoming-events",
    image: "upcoming-events.jpg",
    vi: {
      eyebrow: "Upcoming Events",
      title: "Không bỏ lỡ ngày quan trọng",
      description: "Theo dõi các sự kiện sắp diễn ra cùng số ngày còn lại."
    },
    en: {
      eyebrow: "Upcoming Events",
      title: "Never miss important events",
      description: "Track upcoming events with live countdowns."
    }
  },
  {
    key: "year-events",
    image: "year-events.jpg",
    vi: {
      eyebrow: "Year Events",
      title: "Sự kiện cả năm",
      description: "Tra cứu nhanh toàn bộ các sự kiện trong năm."
    },
    en: {
      eyebrow: "Year Events",
      title: "Events throughout the year",
      description: "Browse all important events for the year."
    }
  },
  {
    key: "documents",
    image: "documents.jpg",
    vi: {
      eyebrow: "Documents",
      title: "Kiến thức về Sakawi",
      description: "Tìm hiểu về Lịch Chăm, lịch Awal và các quy tắc của lịch."
    },
    en: {
      eyebrow: "Documents",
      title: "Learn about Sakawi",
      description: "Explore Cham Calendar, Awal Calendar and calendar rules."
    }
  }
];

const escapeXml = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const wrapWords = (text, maxChars) => {
  const lines = [];
  let current = "";

  for (const word of text.split(" ")) {
    const candidate = current ? `${current} ${word}` : word;

    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines;
};

const textBlock = (lines, x, y, size, weight, fill, lineHeight) =>
  lines
    .map((line, index) =>
      `<text x="${x}" y="${y + index * lineHeight}" font-family="Segoe UI, Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${escapeXml(line)}</text>`
    )
    .join("\n");

const makeSvg = (feature, language) => {
  const copy = feature[language];
  const sourcePath = path.join(sourceDir, feature.image);
  const screenshot = fs.readFileSync(sourcePath).toString("base64");
  const titleLines = wrapWords(copy.title, language === "vi" ? 24 : 25);
  const descriptionLines = wrapWords(copy.description, language === "vi" ? 38 : 40);
  const titleY = 206;
  const descriptionY = titleY + titleLines.length * 58 + 20;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(copy.title)}</title>
  <desc id="desc">${escapeXml(copy.description)}</desc>
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff8f4"/>
      <stop offset="0.56" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#f2faf6"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f6b081" stop-opacity="0.52"/>
      <stop offset="1" stop-color="#d85a2a" stop-opacity="0.1"/>
    </linearGradient>
    <filter id="phoneShadow" x="-35%" y="-20%" width="170%" height="150%">
      <feDropShadow dx="0" dy="28" stdDeviation="26" flood-color="#7c3a22" flood-opacity="0.22"/>
    </filter>
    <clipPath id="screenClip">
      <rect x="810" y="108" width="330" height="714" rx="40"/>
    </clipPath>
  </defs>
  <rect width="1200" height="900" rx="42" fill="url(#background)"/>
  <path d="M0 634 C210 562 270 728 504 644 C713 569 811 472 1200 536 L1200 900 L0 900 Z" fill="url(#accent)"/>
  <circle cx="96" cy="96" r="26" fill="#d85a2a" opacity="0.16"/>
  <circle cx="1094" cy="119" r="42" fill="#0d7a55" opacity="0.12"/>
  <rect x="72" y="104" width="600" height="692" rx="30" fill="#ffffff" opacity="0.66"/>
  <text x="108" y="162" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="800" fill="#8f3f24" letter-spacing="0">${escapeXml(copy.eyebrow)}</text>
  ${textBlock(titleLines, 108, titleY, 52, 900, "#1f2937", 58)}
  ${textBlock(descriptionLines, 108, descriptionY, 28, 650, "#64748b", 40)}
  <g filter="url(#phoneShadow)">
    <rect x="780" y="66" width="390" height="798" rx="62" fill="#16181c"/>
    <rect x="796" y="82" width="358" height="766" rx="50" fill="#23262d"/>
    <rect x="810" y="108" width="330" height="714" rx="40" fill="#ffffff"/>
    <image href="data:image/jpeg;base64,${screenshot}" x="810" y="108" width="330" height="714" preserveAspectRatio="xMidYMid slice" clip-path="url(#screenClip)"/>
    <rect x="910" y="88" width="130" height="20" rx="10" fill="#16181c"/>
  </g>
</svg>
`;
};

for (const dir of Object.values(outputDirs)) {
  fs.mkdirSync(dir, { recursive: true });
}

for (const feature of features) {
  for (const language of Object.keys(outputDirs)) {
    fs.writeFileSync(
      path.join(outputDirs[language], `${feature.key}.svg`),
      makeSvg(feature, language),
      "utf8"
    );
  }
}
