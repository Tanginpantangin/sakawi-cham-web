import { SiteLanguage } from "../i18n";
import {
  AhierMonthEnum,
  AwalMonthEnum,
  displayAhierMonthName,
  displayAwalMonthName,
  displayIkasSarakName,
  displayNasakName,
  IkasSarakEnum,
  NasakEnum
} from "../enums/enum";
import { displayIkasSarakLatin } from "../utils/dateFormat";

export type DocumentId =
  | "comparison"
  | "calendar-rules"
  | "foundation"
  | "months"
  | "nasak"
  | "ikas"
  | "year-name";

export type DocumentTone = "accent" | "ahier" | "awal" | "gregory" | "chrome";

export interface TermItem {
  name: string;
  detail: string;
  chamText?: string;
  symbol?: string;
}

export interface ComparisonRowData {
  topic: string;
  awal: string;
  cham: string;
}

export interface RuleGroup {
  title: string;
  tone: DocumentTone;
  items: readonly string[];
}

export type DocumentBlock =
  | { type: "sakawi-definition" }
  | { type: "shared-features" }
  | { type: "comparison-table" }
  | { type: "paragraph"; text: string }
  | { type: "rule-groups" }
  | { type: "facts" }
  | { type: "terms"; title?: string; hint?: string; tone: DocumentTone; terms: readonly TermItem[] }
  | { type: "phases" }
  | { type: "month-rules" }
  | { type: "month-grid"; title: string; tone: DocumentTone; terms: readonly TermItem[] }
  | { type: "year-example" }
  | { type: "year-formula" }
  | { type: "source-note"; text: string };

export interface SakawiDocument {
  id: DocumentId;
  number: string;
  tone: DocumentTone;
  title: string;
  summary: string;
  blocks: readonly DocumentBlock[];
}

const sectionMeta: Record<SiteLanguage, Record<DocumentId, { title: string; summary: string }>> = {
  vi: {
    comparison: {
      title: "Sakawi Cham và Sakawi Awal",
      summary: "Nhìn nhanh phần chung và những khác biệt quan trọng."
    },
    "calendar-rules": {
      title: "Quy tắc tháng và năm",
      summary: "Tóm tắt cách hai lịch đi cùng nhau, số ngày trong tháng và số ngày trong năm."
    },
    foundation: {
      title: "Căn bản về thứ, ngày",
      summary: "Một tuần có mấy ngày, một tháng có bao nhiêu ngày, bingun và klem là gì."
    },
    months: {
      title: "Tên các tháng",
      summary: "Tra cứu tên tháng Cham hoặc Awal và chuẩn bị âm thanh cho từng tên."
    },
    nasak: {
      title: "12 Nasak",
      summary: "Chu kỳ 12 tên năm của Sakawi Cham."
    },
    ikas: {
      title: "8 Ikas Sarak",
      summary: "Chu kỳ 8 tên dùng trong Sakawi Awal và khi gọi tên năm Cham."
    },
    "year-name": {
      title: "Cách ghép tên năm lịch Cham",
      summary: "Chọn năm để xem Nasak và Ikas Sarak cùng chuyển động theo chu kỳ."
    }
  },
  en: {
    comparison: {
      title: "Sakawi Cham and Sakawi Awal",
      summary: "A quick view of shared patterns and important differences."
    },
    "calendar-rules": {
      title: "Month and year rules",
      summary: "A concise guide to how the two calendars move together."
    },
    foundation: {
      title: "Weekday and day basics",
      summary: "Week structure, month length, Bingun, and Klem."
    },
    months: {
      title: "Month names",
      summary: "Reference Cham and Awal month names with audio."
    },
    nasak: {
      title: "12 Nasak",
      summary: "The 12-name year cycle in Sakawi Cham."
    },
    ikas: {
      title: "8 Ikas Sarak",
      summary: "The 8-name cycle used in Sakawi Awal and Cham year names."
    },
    "year-name": {
      title: "Cham year-name pairing",
      summary: "Choose a year to see Nasak and Ikas Sarak move together."
    }
  }
};

export const documentOrder: readonly DocumentId[] = [
  "comparison",
  "calendar-rules",
  "foundation",
  "months",
  "nasak",
  "ikas",
  "year-name"
];

export const sharedFeatures = [
  "Một tháng có 29 hoặc 30 ngày.",
  "Tháng được đọc theo hai nửa bingun và klem.",
  "Đều dùng để xác định ngày lễ và sinh hoạt cộng đồng."
] as const;

export const sakawiDefinition = {
  formula: "Sakawi = Saka + Jawi",
  intro: "Sakawi là sự kết hợp của hai hệ thống lịch:",
  parts: [
    { term: "Saka", detail: "lịch Chăm theo hệ Saka." },
    { term: "Jawi", detail: "lịch Awal được cộng đồng Chăm Bani sử dụng." }
  ]
} as const;

export const foundationFacts = [
  { value: "7 ngày", label: "trong một tuần" },
  { value: "29-30 ngày", label: "trong một tháng" }
] as const;

export const monthRules = [
  {
    type: "full",
    tone: "accent",
    items: [
      "1-15 bingun: ngày 15 là PoRami (ngày rằm).",
      "Sau PoRami: 1-15 klem."
    ]
  },
  {
    type: "short",
    tone: "ahier",
    items: [
      "Sakawi Awal: thường có 1-14 bingun và 1-15 klem.",
      "Sakawi Cham: bỏ 6 bingun, chuyển từ 5 bingun sang 7 bingun."
    ]
  }
] as const;

export const comparisonRows: readonly ComparisonRowData[] = [
  {
    topic: "Loại lịch",
    awal: "Lịch thuần âm, cách tính dựa trên chu kỳ Mặt trăng.",
    cham: "Lịch âm dương hỗn hợp, dựa vào chu kỳ Mặt trăng và các vì sao."
  },
  {
    topic: "Số tháng",
    awal: "12 tháng",
    cham: "12 tháng, có thể thêm tháng nhuận"
  },
  {
    topic: "Chu kỳ năm",
    awal: "8 Ikas Sarak",
    cham: "12 Nasak kết hợp 8 Ikas Sarak"
  },
  {
    topic: "Điều chỉnh",
    awal: "Nhuận theo chu kỳ 8 năm",
    cham: "Điều chỉnh Guen, Guec và nhuận"
  },
  {
    topic: "Vai trò",
    awal: "Mốc lễ nghi của cộng đồng Awal",
    cham: "Lễ nghi, lễ hội và nhịp mùa vụ"
  }
] as const;

export const calendarRuleGroups: readonly RuleGroup[] = [
  {
    title: "Chung",
    tone: "accent",
    items: [
      "\"Awal khik, Cham nduec\": lịch Awal cố định, lịch Cham chạy và điều chỉnh theo.",
      "Khoảng cách hợp lệ giữa hai lịch chỉ là 1 hoặc 2 ngày.",
      "Ngày 1 bingun Sakawi Awal chỉ được trùng với 2 bingun hoặc 3 bingun Sakawi Cham."
    ]
  },
  {
    title: "Sakawi Awal",
    tone: "awal",
    items: [
      "Một năm luôn có 12 tháng.",
      "Chu kỳ cố định 8 năm: 3 năm nhuận - thun Nâh (Hak, Dal, Jim-luic) và 5 năm thường - thun Wak (Liéh, Jim-krâh, Jây, Bak, Waw).",
      "Tháng lẻ - bilan tapak, gồm tháng 1, 3, 5, 7, 9, 11: 30 ngày.",
      "Tháng chẵn - bilan u, gồm tháng 2, 4, 6, 8, 10: 29 ngày.",
      "Riêng tháng 12: năm nhuận có 30 ngày, năm thường có 29 ngày.",
      "Năm Wak có 354 ngày: (6 x 29) + (6 x 30).",
      "Năm Nâh có 355 ngày: (5 x 29) + (7 x 30)."
    ]
  },
  {
    title: "Sakawi Cham",
    tone: "ahier",
    items: [
      "Năm thường có 12 tháng; năm nhuận có 13 tháng.",
      "Tiểu chu kỳ 8 năm: 3 năm nhuận - thun Nâh (Hak, Dal, Jim-luic) và 5 năm thường - thun Wak (Liéh, Jim-krâh, Jây, Bak, Waw).",
      "Các chu kỳ 24 năm, 32 năm và 144 năm cần áp dụng quy luật guen/guec phức tạp để điều chỉnh, hiện còn chưa thống nhất giữa các địa phương.",
      "Tiểu nhuận theo chu kỳ 8 năm: có 2 tháng 12, gọi là Bilan Bhang.",
      "Đại chuẩn theo chu kỳ 32 năm: có 2 tháng 1, gọi là Bilan Birau.",
      "Tháng lẻ - bilan tapak, gồm tháng 1, 3, 5, 7, 9, 11: 30 ngày.",
      "Tháng chẵn - bilan u, gồm tháng 2, 4, 6, 8, 10: 29 ngày.",
      "Tháng 12: năm nhuận có 30 ngày, năm thường có 29 ngày; năm đại nhuận 32 năm giữ 29 ngày.",
      "Tháng 13 chỉ có ở năm nhuận thun kran, có 29 ngày.",
      "Bilan Birau là tháng mới 30 ngày, đặt sau tháng 1 và trước tháng 2 trong năm Hak đại nhuận 32 năm.",
      "Năm Wak có 354 ngày: (6 x 29) + (6 x 30).",
      "Năm nhuận Kran thuộc thun Nâh có 384 ngày: (5 x 29) + (7 x 30) + 29."
    ]
  }
] as const;

export const weekdayTerms: readonly TermItem[] = [
  { name: "Adit", chamText: "ꨀꨕꨪꩅ", detail: "Chủ nhật" },
  { name: "Thom", chamText: "ꨔꨯꩌ", detail: "Thứ hai" },
  { name: "Angar", chamText: "ꨀꨋꩉ", detail: "Thứ ba" },
  { name: "But", chamText: "ꨝꨭꩅ", detail: "Thứ tư" },
  { name: "Jip", chamText: "ꨎꨪꩇ", detail: "Thứ năm" },
  { name: "Suk", chamText: "ꨦꨭꩀ", detail: "Thứ sáu" },
  { name: "Sanacar", chamText: "ꨧꨗꨌꩉ", detail: "Thứ bảy" }
] as const;

export const monthPhaseTerms: readonly TermItem[] = [
  {
    name: "Bingun",
    detail: "Nửa đầu tháng, tính từ đầu tháng đến PoRami (ngày rằm)",
    chamText: "ꩃ"
  },
  {
    name: "Klem",
    detail: "Nửa sau tháng, tính từ sau PoRami (ngày rằm) đến cuối tháng",
    chamText: "ꩌ"
  },
  {
    name: "PoRami",
    detail: "Mốc trăng tròn giữa tháng, thường là ngày 15 bingun",
    chamText: "꩑꩕ꩃ"
  }
] as const;

export const nasakTerms: readonly TermItem[] = [
  { symbol: "🐭", name: "Takuh", detail: "Tý (Chuột)", chamText: displayNasakName(NasakEnum.Takuh).akharThrahName },
  { symbol: "🐃", name: "Kabaw", detail: "Sửu (Trâu)", chamText: displayNasakName(NasakEnum.Kabaw).akharThrahName },
  { symbol: "🐅", name: "Rimaong", detail: "Dần (Hổ)", chamText: displayNasakName(NasakEnum.Rimaong).akharThrahName },
  { symbol: "🐇", name: "Tapay", detail: "Mão (Thỏ)", chamText: displayNasakName(NasakEnum.Tapay).akharThrahName },
  { symbol: "🐉", name: "Inâ Giray", detail: "Thìn (Rồng)", chamText: displayNasakName(NasakEnum.InâGirai).akharThrahName },
  { symbol: "🐍", name: "Ula Anaih", detail: "Tỵ (Rắn)", chamText: displayNasakName(NasakEnum.UlaAnaih).akharThrahName },
  { symbol: "🐎", name: "Asaih", detail: "Ngọ (Ngựa)", chamText: displayNasakName(NasakEnum.Asaih).akharThrahName },
  { symbol: "🐐", name: "Pabaiy", detail: "Mùi (Dê)", chamText: displayNasakName(NasakEnum.Pabaiy).akharThrahName },
  { symbol: "🐒", name: "Kra", detail: "Thân (Khỉ)", chamText: displayNasakName(NasakEnum.Kra).akharThrahName },
  { symbol: "🐓", name: "Mânuk", detail: "Dậu (Gà)", chamText: displayNasakName(NasakEnum.Manuk).akharThrahName },
  { symbol: "🐕", name: "Asau", detail: "Tuất (Chó)", chamText: displayNasakName(NasakEnum.Asau).akharThrahName },
  { symbol: "🐖", name: "Pabuei", detail: "Hợi (Heo)", chamText: displayNasakName(NasakEnum.Pabuei).akharThrahName }
] as const;

export const ikasSarakTerms: readonly TermItem[] = [
  { name: "Liéh", detail: "Vị trí 1 trong chu kỳ", chamText: String(displayIkasSarakName(IkasSarakEnum.Liéh)) },
  { name: "Hak", detail: "Vị trí 2 trong chu kỳ", chamText: String(displayIkasSarakName(IkasSarakEnum.Hak)) },
  { name: "Jim", detail: "Vị trí 3 trong chu kỳ", chamText: String(displayIkasSarakName(IkasSarakEnum.Jim)) },
  { name: "Jây", detail: "Vị trí 4 trong chu kỳ", chamText: String(displayIkasSarakName(IkasSarakEnum.Jây)) },
  { name: "Dal", detail: "Vị trí 5 trong chu kỳ", chamText: String(displayIkasSarakName(IkasSarakEnum.Dal)) },
  { name: "Bak", detail: "Vị trí 6 trong chu kỳ", chamText: String(displayIkasSarakName(IkasSarakEnum.Bak)) },
  { name: "Waw", detail: "Vị trí 7 trong chu kỳ", chamText: String(displayIkasSarakName(IkasSarakEnum.Waw)) },
  { name: "Jim Luic", detail: "Vị trí 8 trong chu kỳ", chamText: String(displayIkasSarakName(IkasSarakEnum.JimLuic)) }
] as const;

const chamMonths = Array.from({ length: 13 }, (_, index) => {
  const name = displayAhierMonthName(index as AhierMonthEnum);
  return {
    name: name.rumiName,
    detail: `Tháng ${index + 1} của Sakawi Cham`,
    chamText: name.akharThrahName
  };
});

const awalMonths = Array.from({ length: 12 }, (_, index) => {
  const name = displayAwalMonthName(index as AwalMonthEnum);
  return {
    name: name.rumiName,
    detail: `Tháng ${index + 1} của Sakawi Awal`,
    chamText: name.akharThrahName
  };
});

export const yearExample = (() => {
  const year = { nasak: NasakEnum.InâGirai, ikasSarak: IkasSarakEnum.Liéh, yearNumber: 1988 };
  const nasak = displayNasakName(year.nasak);
  const ikasCham = displayIkasSarakName(year.ikasSarak);
  const ikasLatin = displayIkasSarakLatin(year.ikasSarak);

  return {
    year,
    nasak,
    ikasCham,
    ikasLatin
  };
})();

const documentBlocks: Record<DocumentId, readonly DocumentBlock[]> = {
  comparison: [
    { type: "sakawi-definition" },
    { type: "shared-features" },
    { type: "comparison-table" }
  ],
  "calendar-rules": [
    {
      type: "paragraph",
      text: "Các quy tắc dưới đây giúp phân biệt nhịp cố định của Sakawi Awal và cách Sakawi Cham được điều chỉnh để đi theo Awal."
    },
    { type: "rule-groups" }
  ],
  foundation: [
    { type: "facts" },
    {
      type: "terms",
      title: "Tên gọi 7 ngày trong tuần",
      hint: "Chạm loa để thử",
      tone: "gregory",
      terms: weekdayTerms
    },
    {
      type: "phases"
    },
    { type: "month-rules" }
  ],
  months: [
    {
      type: "month-grid",
      title: "Cham · 13 tháng",
      tone: "ahier",
      terms: chamMonths
    },
    {
      type: "month-grid",
      title: "Awal · 12 tháng",
      tone: "awal",
      terms: awalMonths
    }
  ],
  nasak: [
    {
      type: "paragraph",
      text: "Nasak là chu kỳ 12 tên. Khi kết hợp với Ikas Sarak, cặp tên năm lặp lại sau 24 năm."
    },
    {
      type: "terms",
      tone: "ahier",
      terms: nasakTerms
    }
  ],
  ikas: [
    {
      type: "paragraph",
      text: "Ikas Sarak có 8 vị trí. Trong tên năm Cham, một Nasak được ghép với một Ikas Sarak; trong Awal, chu kỳ này còn xác định năm thường và năm nhuận."
    },
    {
      type: "terms",
      tone: "awal",
      terms: ikasSarakTerms
    }
  ],
  "year-name": [
    {
      type: "paragraph",
      text: "Tên năm lịch Cham được ghép theo thứ tự Nasak + Ikas Sarak. Mỗi năm cả hai cùng tiến một vị trí, vì vậy cặp tên đầy đủ lặp lại sau 24 năm."
    },
    { type: "year-example" },
    { type: "year-formula" },
    {
      type: "paragraph",
      text: `Thử chuyển 24 năm để thấy cặp ${yearExample.nasak.rumiName} ${yearExample.ikasLatin} xuất hiện trở lại.`
    }
  ]
};

const tones: Record<DocumentId, DocumentTone> = {
  comparison: "accent",
  "calendar-rules": "accent",
  foundation: "gregory",
  months: "ahier",
  nasak: "ahier",
  ikas: "awal",
  "year-name": "chrome"
};

export function getDocuments(language: SiteLanguage): readonly SakawiDocument[] {
  return documentOrder.map((id, index) => ({
    id,
    number: String(index + 1).padStart(2, "0"),
    tone: tones[id],
    title: sectionMeta[language][id].title,
    summary: sectionMeta[language][id].summary,
    blocks: [
      ...documentBlocks[id],
      {
        type: "source-note" as const,
        text: "Nội dung mang tính căn bản. Các quy tắc chuyên sâu cần phải tìm hiểu và nghiên cứu thêm nhiều nguồn tài liệu khác."
      }
    ]
  }));
}

export function getDocumentById(language: SiteLanguage, documentId: string | undefined) {
  return getDocuments(language).find((document) => document.id === documentId);
}

export function getAdjacentDocuments(language: SiteLanguage, documentId: DocumentId) {
  const documents = getDocuments(language);
  const index = documents.findIndex((document) => document.id === documentId);

  return {
    previous: index > 0 ? documents[index - 1] : undefined,
    next: index >= 0 && index < documents.length - 1 ? documents[index + 1] : undefined
  };
}
