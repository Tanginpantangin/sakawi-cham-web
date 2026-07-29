import { SiteLanguage } from "./i18n";

export const playStoreUrl = "https://play.google.com/store/apps/details?id=com.sakawi.cham&hl=vi";
export const appIconUrl = `${process.env.PUBLIC_URL}/sakawi-app-icon.png`;
export const qrCodeUrl = `${process.env.PUBLIC_URL}/google-play-qr.svg`;

export type TranslationTree = Record<string, unknown>;

export type DocumentId =
  | "comparison"
  | "calendar-rules"
  | "foundation"
  | "months"
  | "nasak"
  | "ikas"
  | "year-name";

interface DocumentCopy {
  id: DocumentId;
  title: string;
  description: string;
  body: readonly string[];
}

interface ReleaseEntry {
  version: string;
  date: string;
  title: string;
  bullets: readonly string[];
}

interface SiteTranslation {
  shared: {
    productName: string;
    googlePlay: string;
    homeLabel: string;
    appIconAlt: string;
  };
  nav: {
    home: string;
    calendar: string;
    events: string;
    documents: string;
    about: string;
    privacy: string;
    support: string;
    releases: string;
    download: string;
    navLabel: string;
    languageLabel: string;
    menuLabel: string;
  };
  actions: {
    readMore: string;
    backToDocuments: string;
  };
  metadata: {
    homeTitle: string;
    homeDescription: string;
    calendarTitle: string;
    calendarDescription: string;
    eventsTitle: string;
    eventsDescription: string;
    documentsTitle: string;
    documentsDescription: string;
    privacyTitle: string;
    privacyDescription: string;
    supportTitle: string;
    supportDescription: string;
    releasesTitle: string;
    releasesDescription: string;
    notFoundTitle: string;
    notFoundDescription: string;
    ogHomeTitle: string;
    ogHomeDescription: string;
  };
  accessibility: {
    appIconAlt: string;
    heroBrandLabel: string;
    qrAlt: string;
    screenshotsLabel: string;
    breadcrumbLabel: string;
    currentLanguage: string;
  };
  footer: {
    description: string;
    copyright: string;
  };
  home: {
    eyebrow: string;
    title: string;
    lede: string;
    formulaTitle: string;
    formulaIntro: string;
    saka: string;
    jawi: string;
    download: string;
    qrCaption: string;
    iosNote: string;
    screenshotNote: string;
    featuresTitle: string;
    linksTitle: string;
    calendarLink: string;
    eventsLink: string;
    primaryCalendarAction: string;
    primaryEventsAction: string;
    calendarPreviewTitle: string;
    calendarPreviewCta: string;
    upcomingPreviewTitle: string;
    upcomingPreviewCta: string;
    currentMonthLabel: string;
    todayLabel: string;
    chamDateLabel: string;
    awalDateLabel: string;
    noEvents: string;
    features: readonly string[];
  };
  calendar: {
    title: string;
    lede: string;
    upcomingTitle: string;
    regionLabel: string;
    ninhThuan: string;
    binhThuan: string;
    developmentTitle: string;
    developmentBody: string;
    referenceBody: string;
    selectedDateTitle: string;
    gregorianDate: string;
    chamDate: string;
    awalDate: string;
    weekday: string;
    events: string;
    noEvents: string;
    previousMonth: string;
    nextMonth: string;
    today: string;
    viewDetails: string;
  };
  events: {
    title: string;
    lede: string;
    upcoming: string;
    all: string;
    date: string;
    event: string;
    category: string;
    daysRemaining: string;
    openCalendar: string;
    noEvents: string;
    regionLabel: string;
    ninhThuan: string;
    binhThuan: string;
  };
  privacy: {
    title: string;
    lede: string;
    updated: string;
    sections: readonly {
      title: string;
      body: string;
    }[];
  };
  support: {
    title: string;
    lede: string;
    contactLabel: string;
    installTitle: string;
    installBody: string;
    updateTitle: string;
    updateBody: string;
    privacyTitle: string;
    privacyBody: string;
    troubleshootingTitle: string;
    troubleshootingItems: readonly string[];
  };
  releases: {
    title: string;
    lede: string;
    currentNote: string;
    entries: readonly ReleaseEntry[];
  };
  documents: {
    title: string;
    subtitle: string;
    missingBodyTitle: string;
    missingBodyText: string;
    documents: readonly DocumentCopy[];
  };
  notFound: {
    title: string;
    lede: string;
    homeLink: string;
  };
}

export const siteCopy: Record<SiteLanguage, SiteTranslation> = {
  vi: {
    shared: {
      productName: "Sakawi",
      googlePlay: "Google Play",
      homeLabel: "Trang chủ Sakawi",
      appIconAlt: "Biểu tượng ứng dụng Sakawi"
    },
    nav: {
      home: "Trang chủ",
      calendar: "Lịch tháng",
      events: "Sự kiện",
      documents: "Tài liệu",
      about: "Giới thiệu",
      privacy: "Chính sách riêng tư",
      support: "Hỗ trợ",
      releases: "Phiên bản",
      download: "Google Play",
      navLabel: "Điều hướng chính",
      languageLabel: "Chọn ngôn ngữ",
      menuLabel: "Mở điều hướng"
    },
    actions: {
      readMore: "Xem chi tiết",
      backToDocuments: "Quay lại Tài liệu"
    },
    metadata: {
      homeTitle: "Sakawi | Ứng dụng lịch Cham",
      homeDescription: "Sakawi là ứng dụng lịch Cham kết hợp Saka và Jawi, hỗ trợ lịch Saka, lịch Awal, sự kiện, tài liệu và đếm ngược.",
      calendarTitle: "Lịch tháng | Sakawi",
      calendarDescription: "Tra cứu lịch tháng Sakawi với ngày Dương lịch, lịch Cham, lịch Awal, sự kiện và lựa chọn khu vực.",
      eventsTitle: "Sự kiện sắp tới | Sakawi",
      eventsDescription: "Xem các sự kiện Sakawi sắp tới và mở ngày tương ứng trong lịch tháng.",
      documentsTitle: "Tài liệu | Sakawi",
      documentsDescription: "Tài liệu song ngữ về kiến thức căn bản của lịch Cham trong Sakawi.",
      privacyTitle: "Chính sách riêng tư | Sakawi",
      privacyDescription: "Chính sách riêng tư của Sakawi, bao gồm lựa chọn đồng ý cho Firebase Analytics và Firebase Crashlytics.",
      supportTitle: "Hỗ trợ | Sakawi",
      supportDescription: "Hỗ trợ kỹ thuật Sakawi cho cài đặt, cập nhật, quyền riêng tư và xử lý sự cố.",
      releasesTitle: "Phiên bản | Sakawi",
      releasesDescription: "Lịch sử phiên bản công khai của Sakawi.",
      notFoundTitle: "Không tìm thấy trang | Sakawi",
      notFoundDescription: "Trang Sakawi bạn đang tìm không tồn tại.",
      ogHomeTitle: "Sakawi | Ứng dụng lịch Cham",
      ogHomeDescription: "Sakawi = Saka + Jawi. Ứng dụng lịch Cham cho lịch Saka, lịch Awal, sự kiện, tài liệu và đếm ngược."
    },
    accessibility: {
      appIconAlt: "Biểu tượng ứng dụng Sakawi",
      heroBrandLabel: "Thương hiệu ứng dụng Sakawi",
      qrAlt: "Mã QR mở Sakawi trên Google Play",
      screenshotsLabel: "Ảnh chụp ứng dụng",
      breadcrumbLabel: "Đường dẫn trang",
      currentLanguage: "Ngôn ngữ đang chọn"
    },
    footer: {
      description: "Sakawi là ứng dụng lịch Cham giúp tra cứu lịch Saka, lịch Awal và các ngày sự kiện liên quan.",
      copyright: "Bản quyền"
    },
    home: {
      eyebrow: "Ứng dụng lịch Cham",
      title: "Sakawi",
      lede: "Sakawi giúp tra cứu lịch Saka, lịch Awal, các ngày sự kiện và tài liệu liên quan trong một ứng dụng gọn nhẹ.",
      formulaTitle: "Sakawi = Saka + Jawi",
      formulaIntro: "Sakawi là sự kết hợp của hai hệ thống lịch:",
      saka: "Saka - lịch Chăm theo hệ Saka.",
      jawi: "Jawi - lịch Awal được cộng đồng Chăm Bani sử dụng.",
      download: "Tải trên Google Play",
      qrCaption: "Quét mã QR để mở Google Play.",
      iosNote: "Phiên bản iOS có thể được xem xét sau.",
      screenshotNote: "Ảnh chụp ứng dụng sẽ được bổ sung khi có nguồn chính thức trong kho dự án.",
      featuresTitle: "Tính năng chính",
      linksTitle: "Liên kết nhanh",
      calendarLink: "Mở lịch tháng",
      eventsLink: "Xem sự kiện",
      primaryCalendarAction: "Xem Lịch tháng",
      primaryEventsAction: "Xem Sự kiện sắp tới",
      calendarPreviewTitle: "Lịch tháng hiện tại",
      calendarPreviewCta: "Xem lịch tháng đầy đủ",
      upcomingPreviewTitle: "Sự kiện sắp tới",
      upcomingPreviewCta: "Xem tất cả sự kiện",
      currentMonthLabel: "Tháng hiện tại",
      todayLabel: "Hôm nay",
      chamDateLabel: "Lịch Cham",
      awalDateLabel: "Lịch Awal",
      noEvents: "Không có sự kiện",
      features: [
        "Lịch Chăm theo hệ Saka",
        "Lịch Awal",
        "Lịch tháng",
        "Sự kiện",
        "Tài liệu",
        "Đếm ngược",
        "Tiếng Việt",
        "English"
      ]
    },
    calendar: {
      title: "Lịch tháng",
      lede: "Tra cứu lịch tháng Sakawi với ngày Dương lịch, lịch Cham, lịch Awal và các sự kiện liên quan.",
      upcomingTitle: "Sự kiện sắp tới",
      regionLabel: "Khu vực lịch",
      ninhThuan: "Sakawi Ninh Thuận",
      binhThuan: "Sakawi Bình Thuận",
      developmentTitle: "Lưu ý",
      developmentBody: "Ứng dụng đang trong quá trình phát triển nên còn những thiếu sót; rất mong nhận được góp ý để sản phẩm được hoàn thiện hơn.",
      referenceBody: "Ứng dụng này chỉ mang tính chất tham khảo; Sakawi chính thức được Hội đồng Chức sắc phát hành từng năm.",
      selectedDateTitle: "Chi tiết ngày",
      gregorianDate: "Ngày Dương lịch",
      chamDate: "Lịch Cham",
      awalDate: "Lịch Awal",
      weekday: "Thứ",
      events: "Sự kiện",
      noEvents: "Không có sự kiện",
      previousMonth: "Tháng trước",
      nextMonth: "Tháng sau",
      today: "Hôm nay",
      viewDetails: "Xem chi tiết"
    },
    events: {
      title: "Sự kiện",
      lede: "Các sự kiện Sakawi được sắp xếp theo ngày, ưu tiên những ngày sắp tới.",
      upcoming: "Sự kiện sắp tới",
      all: "Tất cả",
      date: "Ngày",
      event: "Sự kiện",
      category: "Loại lịch",
      daysRemaining: "Còn lại",
      openCalendar: "Mở trong Lịch tháng",
      noEvents: "Không có sự kiện",
      regionLabel: "Khu vực lịch",
      ninhThuan: "Sakawi Ninh Thuận",
      binhThuan: "Sakawi Bình Thuận"
    },
    privacy: {
      title: "Chính sách riêng tư",
      lede: "Chính sách này giải thích cách Sakawi xử lý thông tin khi bạn sử dụng ứng dụng Android Sakawi.",
      updated: "Cập nhật lần cuối: 29 tháng 7 năm 2026",
      sections: [
        {
          title: "Thông tin Sakawi không yêu cầu",
          body: "Sakawi không yêu cầu tài khoản, tên, số điện thoại, địa chỉ, danh bạ, ảnh cá nhân, thông tin thanh toán hoặc thông tin đăng nhập để sử dụng các chức năng chính."
        },
        {
          title: "Đồng ý quyền riêng tư",
          body: "Sakawi yêu cầu người dùng đưa ra lựa chọn quyền riêng tư rõ ràng. Trước khi có lựa chọn này, phân tích sử dụng và báo cáo lỗi đều bị tắt. Người dùng có thể từ chối tất cả hoặc thay đổi lựa chọn sau trong phần Cài đặt."
        },
        {
          title: "Firebase Analytics tùy chọn",
          body: "Khi người dùng bật phân tích sử dụng, Sakawi có thể gửi sự kiện sử dụng ẩn danh, lượt xem màn hình và một số thuộc tính tổng hợp như ngôn ngữ hoặc khu vực lịch đến Firebase Analytics. Sakawi không dùng dữ liệu này cho quảng cáo hoặc cá nhân hóa quảng cáo."
        },
        {
          title: "Firebase Crashlytics tùy chọn",
          body: "Khi người dùng bật báo cáo lỗi, Sakawi có thể gửi nhật ký lỗi, stack trace và ngữ cảnh kỹ thuật ít nhạy cảm đến Firebase Crashlytics để chẩn đoán sự cố. Báo cáo bị bỏ qua khi tùy chọn này tắt và không được gửi lại sau khi bật sau đó."
        },
        {
          title: "Lưu trữ cục bộ",
          body: "Sakawi lưu một số tùy chọn trên thiết bị, bao gồm lựa chọn quyền riêng tư, ngôn ngữ, thông báo sự kiện và trạng thái đã xem ghi chú phiên bản. Dữ liệu này giúp ứng dụng ghi nhớ lựa chọn của bạn."
        },
        {
          title: "Dữ liệu Sakawi không cố ý thu thập",
          body: "Sakawi không cố ý thu thập Advertising ID, vị trí, danh bạ, ảnh, video, microphone, camera, dữ liệu sức khỏe, nội dung lịch thiết bị hoặc thông tin thanh toán."
        }
      ]
    },
    support: {
      title: "Hỗ trợ Sakawi",
      lede: "Trang này dành cho hỗ trợ kỹ thuật: cài đặt, cập nhật, quyền riêng tư và xử lý sự cố.",
      contactLabel: "Email hỗ trợ đã xác minh",
      installTitle: "Cài đặt",
      installBody: "Cài Sakawi từ Google Play bằng liên kết chính thức. Nếu Play Store không mở đúng trang, hãy kiểm tra kết nối mạng và thử lại.",
      updateTitle: "Cập nhật",
      updateBody: "Mở Google Play, tìm Sakawi và chọn Cập nhật nếu có phiên bản mới. Một số cập nhật nội dung có thể được áp dụng trong ứng dụng sau khi khởi động lại.",
      privacyTitle: "Cài đặt quyền riêng tư",
      privacyBody: "Bạn có thể bật hoặc tắt phân tích sử dụng và báo cáo lỗi trong phần Cài đặt của ứng dụng. Nếu chưa đưa ra lựa chọn, các tính năng tùy chọn này mặc định tắt.",
      troubleshootingTitle: "Xử lý sự cố",
      troubleshootingItems: [
        "Khởi động lại ứng dụng.",
        "Kiểm tra bản cập nhật trên Google Play.",
        "Kiểm tra quyền thông báo nếu lời nhắc sự kiện không hoạt động.",
        "Gửi phiên bản ứng dụng, phiên bản Android, mẫu thiết bị và mô tả lỗi khi liên hệ hỗ trợ."
      ]
    },
    releases: {
      title: "Phiên bản",
      lede: "Lịch sử phiên bản công khai của Sakawi.",
      currentNote: "Phiên bản 1.4.0 đang được chuẩn bị nhưng chưa được trình bày là bản phát hành công khai.",
      entries: [
        {
          version: "1.3.0",
          date: "29 tháng 7 năm 2026",
          title: "Nền tảng phân tích và độ ổn định",
          bullets: [
            "Bổ sung nền tảng đo lường sử dụng bằng Firebase Analytics.",
            "Bổ sung nền tảng báo cáo lỗi bằng Firebase Crashlytics.",
            "Cải thiện theo dõi độ ổn định và chẩn đoán kỹ thuật."
          ]
        }
      ]
    },
    documents: {
      title: "Tài liệu về Sakawi",
      subtitle: "Kiến thức căn bản về Lịch Cham",
      missingBodyTitle: "Cần bản nội dung đã phê duyệt",
      missingBodyText: "Bản nội dung chi tiết đã được phê duyệt cho website chưa có sẵn trong kho dự án. Trang này chỉ hiển thị tiêu đề và mô tả đã được dịch từ ứng dụng di động.",
      documents: [
        {
          id: "comparison",
          title: "Sakawi Cham và Sakawi Awal",
          description: "Nhìn nhanh phần chung và những khác biệt quan trọng.",
          body: [
            "Sakawi = Saka + Jawi",
            "Sakawi là sự kết hợp của hai hệ thống lịch:",
            "Saka - lịch Chăm theo hệ Saka.",
            "Jawi - lịch Awal được cộng đồng Chăm Bani sử dụng."
          ]
        },
        {
          id: "calendar-rules",
          title: "Quy tắc tháng và năm",
          description: "Tóm tắt cách hai lịch đi cùng nhau, số ngày trong tháng và số ngày trong năm.",
          body: []
        },
        {
          id: "foundation",
          title: "Căn bản về thứ, ngày",
          description: "Một tuần có mấy ngày, một tháng có bao nhiêu ngày, bingun và klem là gì.",
          body: []
        },
        {
          id: "months",
          title: "Tên các tháng",
          description: "Tra cứu tên tháng Cham hoặc Awal và chuẩn bị âm thanh cho từng tên.",
          body: []
        },
        {
          id: "nasak",
          title: "12 Nasak",
          description: "Chu kỳ 12 tên năm của Sakawi Cham.",
          body: []
        },
        {
          id: "ikas",
          title: "8 Ikas Sarak",
          description: "Chu kỳ 8 tên dùng trong Sakawi Awal và khi gọi tên năm Cham.",
          body: []
        },
        {
          id: "year-name",
          title: "Cách ghép tên năm lịch Cham",
          description: "Chọn năm để xem Nasak và Ikas Sarak cùng chuyển động theo chu kỳ.",
          body: []
        }
      ]
    },
    notFound: {
      title: "Không tìm thấy trang",
      lede: "Trang bạn đang tìm không tồn tại hoặc đã được chuyển.",
      homeLink: "Về Trang chủ"
    }
  },
  en: {
    shared: {
      productName: "Sakawi",
      googlePlay: "Google Play",
      homeLabel: "Sakawi home",
      appIconAlt: "Sakawi app icon"
    },
    nav: {
      home: "Home",
      calendar: "Monthly Calendar",
      events: "Events",
      documents: "Documents",
      about: "About",
      privacy: "Privacy",
      support: "Support",
      releases: "Releases",
      download: "Google Play",
      navLabel: "Primary navigation",
      languageLabel: "Choose language",
      menuLabel: "Open navigation"
    },
    actions: {
      readMore: "Read more",
      backToDocuments: "Back to Documents"
    },
    metadata: {
      homeTitle: "Sakawi | Cham calendar app",
      homeDescription: "Sakawi is a Cham calendar app combining Saka and Jawi, with Saka calendar, Awal calendar, events, documents, and countdowns.",
      calendarTitle: "Monthly Calendar | Sakawi",
      calendarDescription: "Look up the Sakawi monthly calendar with Gregorian, Cham, Awal, event, and regional calendar details.",
      eventsTitle: "Upcoming Events | Sakawi",
      eventsDescription: "View upcoming Sakawi events and open their corresponding dates in the monthly calendar.",
      documentsTitle: "Documents | Sakawi",
      documentsDescription: "Bilingual documents for basic Cham Calendar knowledge in Sakawi.",
      privacyTitle: "Privacy | Sakawi",
      privacyDescription: "Sakawi privacy policy, including consent choices for Firebase Analytics and Firebase Crashlytics.",
      supportTitle: "Support | Sakawi",
      supportDescription: "Technical help for Sakawi installation, updates, privacy settings, and troubleshooting.",
      releasesTitle: "Releases | Sakawi",
      releasesDescription: "Public Sakawi release history.",
      notFoundTitle: "Page not found | Sakawi",
      notFoundDescription: "The Sakawi page you are looking for does not exist.",
      ogHomeTitle: "Sakawi | Cham calendar app",
      ogHomeDescription: "Sakawi = Saka + Jawi. A Cham calendar app for Saka, Awal, events, documents, and countdowns."
    },
    accessibility: {
      appIconAlt: "Sakawi app icon",
      heroBrandLabel: "Sakawi app branding",
      qrAlt: "QR code for Sakawi on Google Play",
      screenshotsLabel: "App screenshots",
      breadcrumbLabel: "Breadcrumb",
      currentLanguage: "Current language"
    },
    footer: {
      description: "Sakawi is a Cham calendar app for looking up Saka, Awal, and related event days.",
      copyright: "Copyright"
    },
    home: {
      eyebrow: "Cham calendar app",
      title: "Sakawi",
      lede: "Sakawi helps you look up the Saka calendar, Awal calendar, event days, and related documents in a lightweight app.",
      formulaTitle: "Sakawi = Saka + Jawi",
      formulaIntro: "Sakawi is a combination of two calendar systems:",
      saka: "Saka - the Cham calendar based on the Saka system.",
      jawi: "Jawi - the Awal calendar used by the Cham Bani community.",
      download: "Get it on Google Play",
      qrCaption: "Scan the QR code to open Google Play.",
      iosNote: "iOS may come later.",
      screenshotNote: "App screenshots will be added when official source images are available in the project repository.",
      featuresTitle: "Core features",
      linksTitle: "Quick links",
      calendarLink: "Open monthly calendar",
      eventsLink: "View events",
      primaryCalendarAction: "View Monthly Calendar",
      primaryEventsAction: "View Upcoming Events",
      calendarPreviewTitle: "Current month",
      calendarPreviewCta: "View full monthly calendar",
      upcomingPreviewTitle: "Upcoming Events",
      upcomingPreviewCta: "View all Events",
      currentMonthLabel: "Current month",
      todayLabel: "Today",
      chamDateLabel: "Cham Calendar",
      awalDateLabel: "Awal Calendar",
      noEvents: "No events",
      features: [
        "Cham calendar based on the Saka system",
        "Awal calendar",
        "Monthly calendar",
        "Events",
        "Documents",
        "Countdown",
        "Vietnamese",
        "English"
      ]
    },
    calendar: {
      title: "Monthly Calendar",
      lede: "Look up Sakawi monthly dates with Gregorian, Cham, Awal, and related event information.",
      upcomingTitle: "Upcoming Events",
      regionLabel: "Calendar region",
      ninhThuan: "Sakawi Ninh Thuận",
      binhThuan: "Sakawi Bình Thuận",
      developmentTitle: "Note",
      developmentBody: "The app is still in development, so feedback is welcome as the product improves.",
      referenceBody: "This app is for reference only; official Sakawi calendars are issued yearly by the Council of Dignitaries.",
      selectedDateTitle: "Date details",
      gregorianDate: "Gregorian date",
      chamDate: "Cham Calendar",
      awalDate: "Awal Calendar",
      weekday: "Weekday",
      events: "Events",
      noEvents: "No events",
      previousMonth: "Previous month",
      nextMonth: "Next month",
      today: "Today",
      viewDetails: "View details"
    },
    events: {
      title: "Events",
      lede: "Sakawi events ordered by date, with upcoming dates shown first.",
      upcoming: "Upcoming Events",
      all: "All",
      date: "Date",
      event: "Event",
      category: "Calendar type",
      daysRemaining: "Days remaining",
      openCalendar: "Open in Monthly Calendar",
      noEvents: "No events",
      regionLabel: "Calendar region",
      ninhThuan: "Sakawi Ninh Thuận",
      binhThuan: "Sakawi Bình Thuận"
    },
    privacy: {
      title: "Privacy",
      lede: "This policy explains how Sakawi handles information when you use the Sakawi Android app.",
      updated: "Last updated: July 29, 2026",
      sections: [
        {
          title: "Information Sakawi does not require",
          body: "Sakawi does not require an account, name, phone number, address, contacts, personal photos, payment information, or login information to use the core features."
        },
        {
          title: "Privacy consent",
          body: "Sakawi requires an explicit privacy choice. Until that choice is saved, usage analytics and crash reporting are both disabled. Users may decline all, and they may change either preference later in Settings."
        },
        {
          title: "Optional Firebase Analytics",
          body: "When usage analytics is enabled, Sakawi may send anonymous usage events, screen views, and aggregate properties such as language or calendar region to Firebase Analytics. Sakawi does not use this data for ads or ad personalization."
        },
        {
          title: "Optional Firebase Crashlytics",
          body: "When crash reporting is enabled, Sakawi may send crash logs, stack traces, and low-sensitivity technical context to Firebase Crashlytics to diagnose problems. Reports are dropped while this option is disabled and are not replayed after a later opt-in."
        },
        {
          title: "Local storage",
          body: "Sakawi stores some preferences on your device, including privacy choices, language, event notification settings, and viewed release-note state. This helps the app remember your choices."
        },
        {
          title: "Data Sakawi does not intentionally collect",
          body: "Sakawi does not intentionally collect Advertising ID, location, contacts, photos, videos, microphone data, camera data, health information, device calendar contents, or payment information."
        }
      ]
    },
    support: {
      title: "Support",
      lede: "This page is for technical assistance with installation, updates, privacy settings, and troubleshooting.",
      contactLabel: "Verified support email",
      installTitle: "Installation",
      installBody: "Install Sakawi from Google Play using the official link. If the Play Store does not open the page, check your network connection and try again.",
      updateTitle: "Updates",
      updateBody: "Open Google Play, search for Sakawi, and choose Update when a new version is available. Some content updates may apply inside the app after restart.",
      privacyTitle: "Privacy settings",
      privacyBody: "You can enable or disable usage analytics and crash reporting in the app Settings. If no choice has been made yet, these optional features are off by default.",
      troubleshootingTitle: "Troubleshooting",
      troubleshootingItems: [
        "Restart the app.",
        "Check Google Play for updates.",
        "Check notification permission if event reminders do not work.",
        "Include app version, Android version, device model, and issue description when contacting support."
      ]
    },
    releases: {
      title: "Releases",
      lede: "Public Sakawi release history.",
      currentNote: "Version 1.4.0 is being prepared but is not presented here as a public release.",
      entries: [
        {
          version: "1.3.0",
          date: "July 29, 2026",
          title: "Analytics and stability foundation",
          bullets: [
            "Added Firebase Analytics instrumentation foundation.",
            "Added Firebase Crashlytics crash reporting foundation.",
            "Improved stability tracking and technical diagnostics."
          ]
        }
      ]
    },
    documents: {
      title: "Sakawi Documents",
      subtitle: "Basic Cham Calendar knowledge",
      missingBodyTitle: "Approved body copy needed",
      missingBodyText: "Approved detailed website body copy is not available in the repository yet. This page only shows the mobile-app title and description that already have English translations.",
      documents: [
        {
          id: "comparison",
          title: "Sakawi Cham and Sakawi Awal",
          description: "A quick view of shared patterns and important differences.",
          body: [
            "Sakawi = Saka + Jawi",
            "Sakawi is a combination of two calendar systems:",
            "Saka - the Cham calendar based on the Saka system.",
            "Jawi - the Awal calendar used by the Cham Bani community."
          ]
        },
        {
          id: "calendar-rules",
          title: "Month and year rules",
          description: "A concise guide to how the two calendars move together.",
          body: []
        },
        {
          id: "foundation",
          title: "Weekday and day basics",
          description: "Week structure, month length, Bingun, and Klem.",
          body: []
        },
        {
          id: "months",
          title: "Month names",
          description: "Reference Cham and Awal month names with audio.",
          body: []
        },
        {
          id: "nasak",
          title: "12 Nasak",
          description: "The 12-name year cycle in Sakawi Cham.",
          body: []
        },
        {
          id: "ikas",
          title: "8 Ikas Sarak",
          description: "The 8-name cycle used in Sakawi Awal and Cham year names.",
          body: []
        },
        {
          id: "year-name",
          title: "Cham year-name pairing",
          description: "Choose a year to see Nasak and Ikas Sarak move together.",
          body: []
        }
      ]
    },
    notFound: {
      title: "Page not found",
      lede: "The page you are looking for does not exist or has moved.",
      homeLink: "Go home"
    }
  }
};

export const getSiteCopy = (language: SiteLanguage) => siteCopy[language];

export const getDocumentById = (language: SiteLanguage, documentId: string | undefined) =>
  getSiteCopy(language).documents.documents.find((document) => document.id === documentId);
