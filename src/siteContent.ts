import { EventType } from "./enums/enum";
import { SiteLanguage } from "./i18n";

export const playStoreUrl = "https://play.google.com/store/apps/details?id=com.sakawi.cham";
export const appStoreUrl = "https://apps.apple.com/vn/app/sakawi-cham-calendar/id6799479303";
export const appIconUrl = `${process.env.PUBLIC_URL}/sakawi-app-icon.png`;
export const googlePlayQrCodeUrl = `${process.env.PUBLIC_URL}/google-play-qr.svg`;
export const appStoreQrCodeUrl = `${process.env.PUBLIC_URL}/apple-app-store-qr.svg`;
export const qrCodeUrl = googlePlayQrCodeUrl;
export const supportEmail = "sakawi.app@gmail.com";

export const getStoreBadgeUrls = (language: SiteLanguage) => ({
  appStore: `${process.env.PUBLIC_URL}/app-store-badge-${language === "vi" ? "vi" : "en"}.svg`,
  googlePlay: `${process.env.PUBLIC_URL}/google-play-badge-${language === "vi" ? "vi" : "en"}.png`
});

export const getFeatureShowcaseImageUrl = (language: SiteLanguage, key: string) =>
  `${process.env.PUBLIC_URL}/showcase/${language}/${key}.svg`;

export type TranslationTree = Record<string, unknown>;

interface SiteTranslation {
  shared: {
    productName: string;
    appStore: string;
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
    chamKeyboardPrivacyTitle: string;
    chamKeyboardPrivacyDescription: string;
    supportTitle: string;
    supportDescription: string;
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
    downloadAppStore: string;
    downloadGooglePlay: string;
    downloadPanelTitle: string;
    downloadPanelText: string;
    appStoreCardTitle: string;
    googlePlayCardTitle: string;
    appStoreBadgeAlt: string;
    googlePlayBadgeAlt: string;
    appStoreQrAlt: string;
    googlePlayQrAlt: string;
    appStoreQrDescription: string;
    googlePlayQrDescription: string;
    appStoreDescription: string;
    googlePlayDescription: string;
    qrCaption: string;
    iosNote: string;
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
    showcaseCards: readonly {
      key: string;
      title: string;
      description: string;
      imageAlt: string;
    }[];
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
    gregorianMonthYear: string;
    chamDate: string;
    awalDate: string;
    weekday: string;
    events: string;
    noEvents: string;
    emptyDayEvents: string;
    previousMonth: string;
    nextMonth: string;
    today: string;
    viewDetails: string;
    systemCham: string;
    systemAwal: string;
    systemGregorian: string;
    showLatinNumbers: string;
    legendTitle: string;
    legendCham: string;
    legendAwal: string;
    legendGregorian: string;
    legendEvent: string;
    legendToday: string;
    legendNotes: readonly string[];
    detailSubtitle: string;
    day: string;
    month: string;
    year: string;
    moreEvents: string;
    regionalWarning: string;
    countdownTitle: string;
    countdownToday: string;
    countdownFuture: string;
    countdownPast: string;
    countdownEmpty: string;
    regionContext: string;
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
    noUpcomingEvents: string;
    noYearUpcomingEvents: string;
    noPastEvents: string;
    regionLabel: string;
    regionNote: string;
    ninhThuan: string;
    binhThuan: string;
    nextImportant: string;
    nextImportantDescription: string;
    upcomingDescription: string;
    yearTitle: string;
    yearUpcoming: string;
    yearUpcomingDescription: string;
    past: string;
    pastDescription: string;
    previous: string;
    currentYear: string;
    next: string;
    previousYear: string;
    nextYear: string;
    yearNavigationLabel: string;
    countdownToday: string;
    countdownTomorrow: string;
    countdownFuture: string;
    countdownPast: string;
    names: Partial<Record<EventType, string>>;
    descriptions: Partial<Record<EventType, string>>;
  };
  privacy: {
    title: string;
    lede: string;
    updated: string;
    sections: readonly {
      title: string;
      body: string;
      contactEmail?: boolean;
    }[];
  };
  chamKeyboardPrivacy: {
    title: string;
    productLabel: string;
    packageLabel: string;
    lede: string;
    updated: string;
    sections: readonly {
      title: string;
      body: string;
      items?: readonly string[];
      contactEmail?: boolean;
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
  documents: {
    title: string;
    subtitle: string;
    indexIntro: string;
    openDocument: string;
    contentsLabel: string;
    sharedHeading: string;
    differencesHeading: string;
    topicLabel: string;
    awalLabel: string;
    chamLabel: string;
    ruleGroupsHeading: string;
    factsHeading: string;
    phaseHeading: string;
    monthRuleHeading: string;
    fullMonthTitle: string;
    shortMonthTitle: string;
    yearExampleHeading: string;
    yearFormulaHeading: string;
    sourceHeading: string;
    previousDocument: string;
    nextDocument: string;
    documentNavigationLabel: string;
    notFoundTitle: string;
    notFoundText: string;
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
      appStore: "App Store",
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
      download: "Tải ứng dụng",
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
      chamKeyboardPrivacyTitle: "Chính sách riêng tư | Cham Keyboard",
      chamKeyboardPrivacyDescription: "Chính sách riêng tư của Cham Keyboard cho Android, bao gồm cách bàn phím xử lý văn bản, ngữ cảnh con trỏ và tùy chọn cục bộ trên thiết bị.",
      supportTitle: "Hỗ trợ | Sakawi",
      supportDescription: "Hỗ trợ kỹ thuật Sakawi cho cài đặt, cập nhật, quyền riêng tư và xử lý sự cố.",
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
      description: "Sakawi là ứng dụng giúp tra cứu lịch Chăm, lịch Awal, lịch Dương và các ngày sự kiện liên quan."
    },
    home: {
      eyebrow: "Ứng dụng lịch Cham",
      title: "Sakawi",
      lede: "Sakawi giúp tra cứu lịch Chăm, lịch Awal, lịch Dương và các ngày sự kiện liên quan trong một ứng dụng gọn nhẹ.",
      formulaTitle: "Sakawi = Saka + Jawi",
      formulaIntro: "Sakawi là sự kết hợp của hai hệ thống lịch:",
      saka: "Saka - lịch Chăm theo hệ Saka.",
      jawi: "Jawi - lịch Awal được cộng đồng Chăm Bani sử dụng.",
      download: "Tải ứng dụng",
      downloadAppStore: "Tải trên App Store",
      downloadGooglePlay: "Tải trên Google Play",
      downloadPanelTitle: "Tải Sakawi",
      downloadPanelText: "Chọn cửa hàng chính thức hoặc quét mã QR.",
      appStoreCardTitle: "iPhone",
      googlePlayCardTitle: "Android",
      appStoreBadgeAlt: "Tải Sakawi trên App Store",
      googlePlayBadgeAlt: "Tải Sakawi trên Google Play",
      appStoreQrAlt: "Mã QR tải Sakawi từ App Store.",
      googlePlayQrAlt: "Mã QR tải Sakawi từ Google Play.",
      appStoreQrDescription: "Quét mã QR để tải Sakawi từ App Store.",
      googlePlayQrDescription: "Quét mã QR để tải Sakawi từ Google Play.",
      appStoreDescription: "Dành cho iPhone và thiết bị Apple tương thích.",
      googlePlayDescription: "Dành cho điện thoại và máy tính bảng Android.",
      qrCaption: "Quét mã QR để mở Google Play.",
      iosNote: "Sakawi hiện có trên App Store.",
      featuresTitle: "Tính năng nổi bật",
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
      ],
      showcaseCards: [
        {
          key: "calendar",
          title: "Lịch Chăm trong tầm tay",
          description: "Theo dõi Lịch Chăm, Lịch Awal và Dương lịch trong cùng một ứng dụng.",
          imageAlt: "Ảnh giới thiệu tính năng Lịch Chăm trong tầm tay của Sakawi."
        },
        {
          key: "upcoming-events",
          title: "Không bỏ lỡ ngày quan trọng",
          description: "Theo dõi các sự kiện sắp diễn ra cùng số ngày còn lại.",
          imageAlt: "Ảnh giới thiệu tính năng theo dõi sự kiện sắp diễn ra của Sakawi."
        },
        {
          key: "year-events",
          title: "Sự kiện cả năm",
          description: "Tra cứu nhanh toàn bộ các sự kiện trong năm.",
          imageAlt: "Ảnh giới thiệu tính năng sự kiện cả năm của Sakawi."
        },
        {
          key: "documents",
          title: "Kiến thức về Sakawi",
          description: "Tìm hiểu về Lịch Chăm, lịch Awal và các quy tắc của lịch.",
          imageAlt: "Ảnh giới thiệu tính năng tài liệu và kiến thức về Sakawi."
        }
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
      gregorianMonthYear: "Tháng và năm Dương lịch",
      chamDate: "Lịch Cham",
      awalDate: "Lịch Awal",
      weekday: "Thứ",
      events: "Sự kiện",
      noEvents: "Không có sự kiện",
      emptyDayEvents: "Không có sự kiện trong ngày này",
      previousMonth: "Tháng trước",
      nextMonth: "Tháng sau",
      today: "Hôm nay",
      viewDetails: "Xem chi tiết",
      systemCham: "Lịch Cham",
      systemAwal: "Lịch Awal",
      systemGregorian: "Dương lịch",
      showLatinNumbers: "Hiển thị ngày bằng số Latin",
      legendTitle: "Chú thích",
      legendCham: "Lịch Cham",
      legendAwal: "Lịch Awal",
      legendGregorian: "Dương lịch",
      legendEvent: "Sự kiện",
      legendToday: "Hôm nay",
      legendNotes: [
        "꩑ꩃ / ꩑ꩌ [bingun/klem]: ngày trước/sau trăng rằm của lịch Cham và lịch Awal.",
        "Các tháng thiếu 29 ngày của lịch Cham dùng quy tắc hiển thị hiện có của ứng dụng Sakawi."
      ],
      detailSubtitle: "Thông tin ngày được chọn",
      day: "Ngày",
      month: "Tháng",
      year: "Năm",
      moreEvents: "+{count} nữa",
      regionalWarning: "Khi đổi khu vực, ngày Dương lịch đang chọn được giữ nguyên và thông tin Sakawi được tính lại theo khu vực mới.",
      countdownTitle: "Sự kiện quan trọng sắp tới",
      countdownToday: "Diễn ra hôm nay",
      countdownFuture: "Còn {count} ngày",
      countdownPast: "Đã qua {count} ngày",
      countdownEmpty: "Không có sự kiện quan trọng sắp tới trong dữ liệu hiện tại.",
      regionContext: "Thông tin ngày này đang dùng khu vực {region}."
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
      noUpcomingEvents: "Không có sự kiện quan trọng sắp diễn ra.",
      noYearUpcomingEvents: "Không có sự kiện sắp diễn ra trong năm này.",
      noPastEvents: "Chưa có sự kiện đã qua trong năm này.",
      regionLabel: "Khu vực lịch",
      regionNote: "Sự kiện được tính theo cùng khu vực đang dùng trong Lịch tháng.",
      ninhThuan: "Sakawi Ninh Thuận",
      binhThuan: "Sakawi Bình Thuận",
      nextImportant: "Sự kiện quan trọng gần nhất",
      nextImportantDescription: "Sự kiện sắp tới gần nhất cho khu vực {region}.",
      upcomingDescription: "Danh sách các sự kiện chính sắp tới theo thứ tự ngày trong ứng dụng Sakawi.",
      yearTitle: "Sự kiện năm {year}",
      yearUpcoming: "Sự kiện sắp diễn ra trong năm",
      yearUpcomingDescription: "Các sự kiện từ hôm nay đến hết năm Sakawi đang chọn.",
      past: "Sự kiện đã qua",
      pastDescription: "Các sự kiện đã qua trong cùng năm Sakawi, vẫn giữ thứ tự ngày theo ứng dụng.",
      previous: "Trước",
      currentYear: "Năm nay",
      next: "Sau",
      previousYear: "Năm trước",
      nextYear: "Năm sau",
      yearNavigationLabel: "Điều hướng năm sự kiện",
      countdownToday: "Diễn ra hôm nay",
      countdownTomorrow: "Diễn ra ngày mai",
      countdownFuture: "Còn {count} ngày",
      countdownPast: "Đã qua {count} ngày",
      names: {
        AkaokThun: "Năm mới Chăm lịch",
        RijaNagar: "Rija Nagar",
        KatePaleiHamuTanran: "Katê Palei Hamu Tanran",
        KateAngaokBimong: "Katê",
        CaMbur: "Ca-mbur",
        Lakhah: "Lakhah",
        AwalNewYear: "Năm mới Awal",
        TamaRicaowRamawan: "Ramawan",
        TalaihAekRamawan: "Talaih Aek Ramawan",
        MukTrun: "Muk Trun",
        OngTrun: "Ong Trun",
        IkakWaha: "Ikak Waha",
        TalaihWaha: "Talaih Waha",
        YuerYang: "Yuer Yang",
        VietnameseLunarNewYear: "Tết Nguyên Đán"
      },
      descriptions: {
        AkaokThun: "Ngày đầu năm Chăm lịch.",
        RijaNagar: "Ngày lễ/việc Chăm theo vùng.",
        KatePaleiHamuTanran: "Ngày Katê.",
        KateAngaokBimong: "Lễ hội lớn của người Chăm.",
        CaMbur: "Ngày lễ/việc Chăm.",
        Lakhah: "Ngày lễ/việc Chăm.",
        AwalNewYear: "Ngày đầu năm Awal.",
        TamaRicaowRamawan: "Bắt đầu Ramawan.",
        TalaihAekRamawan: "Ngày liên quan đến Ramawan.",
        MukTrun: "Ngày liên quan đến Ramawan.",
        OngTrun: "Ngày liên quan đến Ramawan.",
        IkakWaha: "Ngày lễ/việc Awal.",
        TalaihWaha: "Ngày lễ/việc Awal.",
        YuerYang: "Ngày lễ/việc Chăm.",
        VietnameseLunarNewYear: "Tết theo âm lịch Việt Nam."
      }
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
        },
        {
          title: "Liên hệ",
          body: "Nếu có câu hỏi về ứng dụng Sakawi hoặc website Sakawi, vui lòng liên hệ Sakawi qua",
          contactEmail: true
        }
      ]
    },
    chamKeyboardPrivacy: {
      title: "Chính sách riêng tư",
      productLabel: "Sản phẩm: Cham Keyboard",
      packageLabel: "Gói Android: com.chamkeyboard",
      lede: "Chính sách này áp dụng cho Cham Keyboard, một ứng dụng bàn phím/phương thức nhập Android riêng biệt với Sakawi - Cham Calendar.",
      updated: "Cập nhật lần cuối: 4 tháng 9 năm 2026",
      sections: [
        {
          title: "Thông tin chúng tôi thu thập",
          body: "Cham Keyboard không yêu cầu tài khoản và không thu thập tên, số điện thoại, địa chỉ, danh bạ, vị trí, ảnh, nội dung lịch thiết bị hoặc thông tin thanh toán. Ứng dụng chỉ lưu các tùy chọn bàn phím cục bộ được mô tả trong chính sách này."
        },
        {
          title: "Văn bản bạn nhập",
          body: "Cham Keyboard không lưu trữ lâu dài văn bản bạn nhập, không gửi văn bản bạn nhập đến máy chủ và không bán hoặc chia sẻ nội dung đã nhập hay dữ liệu cá nhân."
        },
        {
          title: "Ghép chữ Cham cục bộ",
          body: "Để hỗ trợ ghép chữ Cham, bàn phím đôi khi cần đọc một lượng nhỏ văn bản ngay trước con trỏ. Khi cần cho việc ghép chữ, phiên bản hiện tại đọc tối đa 8 điểm mã Unicode trước con trỏ. Ngữ cảnh này chỉ được xử lý cục bộ trên thiết bị, không được lưu lại và không được truyền đi."
        },
        {
          title: "Cài đặt cục bộ",
          body: "Cham Keyboard chỉ lưu các tùy chọn bàn phím trên thiết bị để ghi nhớ cách bạn muốn sử dụng bàn phím.",
          items: [
            "Giao diện",
            "Phản hồi rung",
            "Kích thước bàn phím"
          ]
        },
        {
          title: "Internet và truyền dữ liệu",
          body: "Cham Keyboard không yêu cầu quyền INTERNET trên Android. Ứng dụng không truyền văn bản bạn nhập, ngữ cảnh con trỏ hoặc tùy chọn bàn phím đến máy chủ."
        },
        {
          title: "Phân tích và quảng cáo",
          body: "Cham Keyboard không sử dụng SDK phân tích, SDK quảng cáo hoặc SDK theo dõi. Ứng dụng không sử dụng dữ liệu cho quảng cáo hoặc cá nhân hóa quảng cáo."
        },
        {
          title: "Chia sẻ dữ liệu",
          body: "Cham Keyboard không bán hoặc chia sẻ văn bản đã nhập, ngữ cảnh con trỏ, tùy chọn bàn phím hoặc dữ liệu cá nhân với bên thứ ba."
        },
        {
          title: "Quyền riêng tư của trẻ em",
          body: "Cham Keyboard không được thiết kế để thu thập thông tin cá nhân từ trẻ em. Nếu bạn cho rằng trẻ em đã cung cấp thông tin cá nhân qua ứng dụng, vui lòng liên hệ để chúng tôi xem xét."
        },
        {
          title: "Thay đổi chính sách này",
          body: "Chúng tôi có thể cập nhật chính sách này khi Cham Keyboard thay đổi. Khi cập nhật, ngày Cập nhật lần cuối trên trang này sẽ được thay đổi."
        },
        {
          title: "Liên hệ",
          body: "Nếu có câu hỏi về Cham Keyboard hoặc chính sách riêng tư này, vui lòng liên hệ qua",
          contactEmail: true
        }
      ]
    },
    support: {
      title: "Hỗ trợ Sakawi",
      lede: "Trang này dành cho hỗ trợ kỹ thuật: cài đặt, cập nhật, quyền riêng tư và xử lý sự cố.",
      contactLabel: "Email hỗ trợ đã xác minh",
      installTitle: "Cài đặt",
      installBody: "Cài Sakawi từ App Store hoặc Google Play bằng liên kết chính thức. Nếu cửa hàng không mở đúng trang, hãy kiểm tra kết nối mạng và thử lại.",
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
    documents: {
      title: "Tài liệu về Sakawi",
      subtitle: "Kiến thức căn bản về Lịch Cham",
      indexIntro: "Tra cứu các chủ đề nền tảng giống bộ Tài liệu trong ứng dụng Sakawi.",
      openDocument: "Mở tài liệu",
      contentsLabel: "Mục lục tài liệu",
      sharedHeading: "Phần chung",
      differencesHeading: "Khác biệt chính",
      topicLabel: "Chủ đề",
      awalLabel: "Sakawi Awal",
      chamLabel: "Sakawi Cham",
      ruleGroupsHeading: "Nhóm quy tắc",
      factsHeading: "Thông tin căn bản",
      phaseHeading: "Bingun và klem",
      monthRuleHeading: "Cách đếm ngày trong tháng",
      fullMonthTitle: "Tháng đủ · 30 ngày",
      shortMonthTitle: "Tháng thiếu · 29 ngày",
      yearExampleHeading: "Ví dụ tên năm",
      yearFormulaHeading: "Công thức ghép",
      sourceHeading: "Lưu ý",
      previousDocument: "Tài liệu trước",
      nextDocument: "Tài liệu sau",
      documentNavigationLabel: "Điều hướng tài liệu",
      notFoundTitle: "Không tìm thấy tài liệu",
      notFoundText: "Tài liệu này không tồn tại hoặc đã được chuyển."
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
      appStore: "App Store",
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
      download: "Download App",
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
      chamKeyboardPrivacyTitle: "Privacy Policy | Cham Keyboard",
      chamKeyboardPrivacyDescription: "Cham Keyboard privacy policy for Android, including how the keyboard handles typed text, cursor context, and local device preferences.",
      supportTitle: "Support | Sakawi",
      supportDescription: "Technical help for Sakawi installation, updates, privacy settings, and troubleshooting.",
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
      description: "Sakawi is a Cham calendar app for looking up Saka, Awal, and related event days."
    },
    home: {
      eyebrow: "Cham calendar app",
      title: "Sakawi",
      lede: "Sakawi helps you look up the Cham calendar, Awal calendar, event days, and related documents in a lightweight app.",
      formulaTitle: "Sakawi = Saka + Jawi",
      formulaIntro: "Sakawi is a combination of two calendar systems:",
      saka: "Saka - the Cham calendar based on the Saka system.",
      jawi: "Jawi - the Awal calendar used by the Cham Bani community.",
      download: "Download App",
      downloadAppStore: "Download on the App Store",
      downloadGooglePlay: "Get it on Google Play",
      downloadPanelTitle: "Download Sakawi",
      downloadPanelText: "Choose the official store or scan the QR code.",
      appStoreCardTitle: "iPhone",
      googlePlayCardTitle: "Android",
      appStoreBadgeAlt: "Download Sakawi on the App Store",
      googlePlayBadgeAlt: "Get Sakawi on Google Play",
      appStoreQrAlt: "QR code to download Sakawi from the App Store.",
      googlePlayQrAlt: "QR code to download Sakawi from Google Play.",
      appStoreQrDescription: "Scan the QR code to download Sakawi from the App Store.",
      googlePlayQrDescription: "Scan the QR code to download Sakawi from Google Play.",
      appStoreDescription: "For iPhone and compatible Apple devices.",
      googlePlayDescription: "For Android phones and tablets.",
      qrCaption: "Scan the QR code to open Google Play.",
      iosNote: "Sakawi is available on the App Store.",
      featuresTitle: "Feature Showcase",
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
      ],
      showcaseCards: [
        {
          key: "calendar",
          title: "Cham Calendar at your fingertips",
          description: "View Cham Calendar, Awal Calendar and Gregorian Calendar together.",
          imageAlt: "Feature showcase image for Sakawi Cham Calendar at your fingertips."
        },
        {
          key: "upcoming-events",
          title: "Never miss important events",
          description: "Track upcoming events with live countdowns.",
          imageAlt: "Feature showcase image for Sakawi upcoming event countdowns."
        },
        {
          key: "year-events",
          title: "Events throughout the year",
          description: "Browse all important events for the year.",
          imageAlt: "Feature showcase image for Sakawi year events."
        },
        {
          key: "documents",
          title: "Learn about Sakawi",
          description: "Explore Cham Calendar, Awal Calendar and calendar rules.",
          imageAlt: "Feature showcase image for Sakawi documents."
        }
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
      gregorianMonthYear: "Gregorian month and year",
      chamDate: "Cham Calendar",
      awalDate: "Awal Calendar",
      weekday: "Weekday",
      events: "Events",
      noEvents: "No events",
      emptyDayEvents: "No events on this date",
      previousMonth: "Previous month",
      nextMonth: "Next month",
      today: "Today",
      viewDetails: "View details",
      systemCham: "Cham Calendar",
      systemAwal: "Awal Calendar",
      systemGregorian: "Gregorian Calendar",
      showLatinNumbers: "Show dates with Latin numerals",
      legendTitle: "Legend",
      legendCham: "Cham Calendar",
      legendAwal: "Awal Calendar",
      legendGregorian: "Gregorian Calendar",
      legendEvent: "Event",
      legendToday: "Today",
      legendNotes: [
        "꩑ꩃ / ꩑ꩌ [bingun/klem]: days before/after the full moon in the Cham and Awal calendars.",
        "Short 29-day Cham months use the existing Sakawi app display rule."
      ],
      detailSubtitle: "Selected date information",
      day: "Day",
      month: "Month",
      year: "Year",
      moreEvents: "+{count} more",
      regionalWarning: "When you change region, the selected Gregorian date is preserved and Sakawi details are recalculated for the new region.",
      countdownTitle: "Next important event",
      countdownToday: "Happening today",
      countdownFuture: "{count} day(s) remaining",
      countdownPast: "{count} day(s) ago",
      countdownEmpty: "No upcoming important events are available in the current data.",
      regionContext: "This date uses the {region} calendar region."
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
      noUpcomingEvents: "No upcoming important events found.",
      noYearUpcomingEvents: "No upcoming events found for this year.",
      noPastEvents: "No past events found for this year.",
      regionLabel: "Calendar region",
      regionNote: "Events use the same persisted calendar region as the Monthly Calendar.",
      ninhThuan: "Sakawi Ninh Thuận",
      binhThuan: "Sakawi Bình Thuận",
      nextImportant: "Next important event",
      nextImportantDescription: "The nearest upcoming important event for {region}.",
      upcomingDescription: "Main upcoming events in the same date order used by the Sakawi app.",
      yearTitle: "Events in {year}",
      yearUpcoming: "Upcoming events this year",
      yearUpcomingDescription: "Events from today through the end of the selected Sakawi year.",
      past: "Past events",
      pastDescription: "Past events in the same Sakawi year, kept in the app's chronological order.",
      previous: "Previous",
      currentYear: "Current year",
      next: "Next",
      previousYear: "Previous year",
      nextYear: "Next year",
      yearNavigationLabel: "Event year navigation",
      countdownToday: "Happening today",
      countdownTomorrow: "Happening tomorrow",
      countdownFuture: "{count} day(s) remaining",
      countdownPast: "{count} day(s) ago",
      names: {
        AkaokThun: "Cham New Year",
        RijaNagar: "Rija Nagar",
        KatePaleiHamuTanran: "Katê Palei Hamu Tanran",
        KateAngaokBimong: "Katê",
        CaMbur: "Ca-mbur",
        Lakhah: "Lakhah",
        AwalNewYear: "Awal New Year",
        TamaRicaowRamawan: "Ramawan",
        TalaihAekRamawan: "Talaih Aek Ramawan",
        MukTrun: "Muk Trun",
        OngTrun: "Ong Trun",
        IkakWaha: "Ikak Waha",
        TalaihWaha: "Talaih Waha",
        YuerYang: "Yuer Yang",
        VietnameseLunarNewYear: "Vietnamese Lunar New Year"
      },
      descriptions: {
        AkaokThun: "First day of the Cham calendar year.",
        RijaNagar: "Regional Cham observance.",
        KatePaleiHamuTanran: "Katê observance.",
        KateAngaokBimong: "Major Cham festival.",
        CaMbur: "Cham observance.",
        Lakhah: "Cham observance.",
        AwalNewYear: "First day of the Awal calendar year.",
        TamaRicaowRamawan: "Beginning of Ramawan.",
        TalaihAekRamawan: "Ramawan-related observance.",
        MukTrun: "Ramawan-related observance.",
        OngTrun: "Ramawan-related observance.",
        IkakWaha: "Awal observance.",
        TalaihWaha: "Awal observance.",
        YuerYang: "Cham observance.",
        VietnameseLunarNewYear: "Vietnamese lunar calendar new year."
      }
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
        },
        {
          title: "Contact",
          body: "For questions about the Sakawi application or the Sakawi website, contact Sakawi at",
          contactEmail: true
        }
      ]
    },
    chamKeyboardPrivacy: {
      title: "Privacy Policy",
      productLabel: "Product: Cham Keyboard",
      packageLabel: "Android package: com.chamkeyboard",
      lede: "This policy applies to Cham Keyboard, an Android input method/keyboard app that is separate from Sakawi - Cham Calendar.",
      updated: "Last updated: September 4, 2026",
      sections: [
        {
          title: "Information We Collect",
          body: "Cham Keyboard does not require an account and does not collect your name, phone number, address, contacts, location, photos, device calendar contents, or payment information. The app stores only the local keyboard preferences described in this policy."
        },
        {
          title: "Text You Type",
          body: "Cham Keyboard does not persist or store the text you type, does not transmit typed text to a server, and does not sell or share typed content or personal data."
        },
        {
          title: "Local Cham Composition",
          body: "To support Cham-script composition, the keyboard may read a small amount of text immediately before the cursor. When needed for composition, the current implementation reads at most 8 Unicode code points before the cursor. This context is processed locally on your device, is not persisted, and is not transmitted."
        },
        {
          title: "Local Settings",
          body: "Cham Keyboard stores only local keyboard preferences on your device so the keyboard can remember how you want it to work.",
          items: [
            "Theme",
            "Haptic feedback",
            "Keyboard size"
          ]
        },
        {
          title: "Internet and Data Transmission",
          body: "Cham Keyboard does not request the Android INTERNET permission. The app does not transmit typed text, cursor context, or keyboard preferences to a server."
        },
        {
          title: "Analytics and Advertising",
          body: "Cham Keyboard does not use analytics SDKs, advertising SDKs, or tracking SDKs. The app does not use data for ads or ad personalization."
        },
        {
          title: "Data Sharing",
          body: "Cham Keyboard does not sell or share typed text, cursor context, keyboard preferences, or personal data with third parties."
        },
        {
          title: "Children's Privacy",
          body: "Cham Keyboard is not designed to collect personal information from children. If you believe a child has provided personal information through the app, please contact us so we can review it."
        },
        {
          title: "Changes to This Privacy Policy",
          body: "We may update this policy when Cham Keyboard changes. When we do, the Last updated date on this page will change."
        },
        {
          title: "Contact",
          body: "For questions about Cham Keyboard or this privacy policy, contact us at",
          contactEmail: true
        }
      ]
    },
    support: {
      title: "Support",
      lede: "This page is for technical assistance with installation, updates, privacy settings, and troubleshooting.",
      contactLabel: "Verified support email",
      installTitle: "Installation",
      installBody: "Install Sakawi from the App Store or Google Play using the official links. If a store does not open the page, check your network connection and try again.",
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
    documents: {
      title: "Sakawi Documents",
      subtitle: "Basic Cham Calendar knowledge",
      indexIntro: "Browse the same foundational reference topics available in the Sakawi mobile app.",
      openDocument: "Open document",
      contentsLabel: "Document contents",
      sharedHeading: "Shared patterns",
      differencesHeading: "Key differences",
      topicLabel: "Topic",
      awalLabel: "Sakawi Awal",
      chamLabel: "Sakawi Cham",
      ruleGroupsHeading: "Rule groups",
      factsHeading: "Basic facts",
      phaseHeading: "Bingun and klem",
      monthRuleHeading: "Counting days in a month",
      fullMonthTitle: "Full month · 30 days",
      shortMonthTitle: "Short month · 29 days",
      yearExampleHeading: "Year-name example",
      yearFormulaHeading: "Pairing formula",
      sourceHeading: "Note",
      previousDocument: "Previous document",
      nextDocument: "Next document",
      documentNavigationLabel: "Document navigation",
      notFoundTitle: "Document not found",
      notFoundText: "This document does not exist or has moved."
    },
    notFound: {
      title: "Page not found",
      lede: "The page you are looking for does not exist or has moved.",
      homeLink: "Go home"
    }
  }
};

export const getSiteCopy = (language: SiteLanguage) => siteCopy[language];
