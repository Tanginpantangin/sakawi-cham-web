import { SiteLanguage } from "./i18n";

export const playStoreUrl = "https://play.google.com/store/apps/details?id=com.sakawi.cham&hl=vi";
export const appIconUrl = `${process.env.PUBLIC_URL}/sakawi-app-icon.png`;
export const qrCodeUrl = `${process.env.PUBLIC_URL}/google-play-qr.svg`;

export const siteCopy = {
  vi: {
    nav: {
      home: "Trang chủ",
      privacy: "Quyền riêng tư",
      support: "Hỗ trợ",
      releases: "Phát hành",
      download: "Google Play",
      navLabel: "Điều hướng chính",
      languageLabel: "Chọn ngôn ngữ",
      menuLabel: "Mở điều hướng"
    },
    seo: {
      homeTitle: "Sakawi | Ứng dụng lịch Cham",
      privacyTitle: "Chính sách quyền riêng tư | Sakawi",
      supportTitle: "Hỗ trợ | Sakawi",
      releasesTitle: "Ghi chú phát hành | Sakawi",
      description: "Sakawi là ứng dụng lịch Cham kết hợp Saka và Jawi, hỗ trợ lịch Saka, lịch Awal, sự kiện, tài liệu và đếm ngược."
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
      docsLink: "Tài liệu",
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
    privacy: {
      title: "Chính sách quyền riêng tư",
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
      title: "Ghi chú phát hành",
      lede: "Lịch sử phát hành công khai của Sakawi.",
      currentNote: "Phiên bản 1.4.0 đang được chuẩn bị nhưng chưa được trình bày là bản phát hành công khai.",
      entries: [
        {
          version: "1.3.0",
          title: "Nền tảng phân tích và độ ổn định",
          bullets: [
            "Bổ sung nền tảng đo lường sử dụng bằng Firebase Analytics.",
            "Bổ sung nền tảng báo cáo lỗi bằng Firebase Crashlytics.",
            "Cải thiện theo dõi độ ổn định và chẩn đoán kỹ thuật."
          ]
        }
      ]
    }
  },
  en: {
    nav: {
      home: "Home",
      privacy: "Privacy",
      support: "Support",
      releases: "Releases",
      download: "Google Play",
      navLabel: "Primary navigation",
      languageLabel: "Choose language",
      menuLabel: "Open navigation"
    },
    seo: {
      homeTitle: "Sakawi | Cham calendar app",
      privacyTitle: "Privacy Policy | Sakawi",
      supportTitle: "Support | Sakawi",
      releasesTitle: "Release Notes | Sakawi",
      description: "Sakawi is a Cham calendar app combining Saka and Jawi, with Saka calendar, Awal calendar, events, documents, and countdowns."
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
      docsLink: "Documents",
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
    privacy: {
      title: "Privacy Policy",
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
      title: "Sakawi Support",
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
      title: "Release Notes",
      lede: "Public Sakawi release history.",
      currentNote: "Version 1.4.0 is being prepared but is not presented here as a public release.",
      entries: [
        {
          version: "1.3.0",
          title: "Analytics and stability foundation",
          bullets: [
            "Added Firebase Analytics instrumentation foundation.",
            "Added Firebase Crashlytics crash reporting foundation.",
            "Improved stability tracking and technical diagnostics."
          ]
        }
      ]
    }
  }
} as const;

export const getSiteCopy = (language: SiteLanguage) => siteCopy[language];
