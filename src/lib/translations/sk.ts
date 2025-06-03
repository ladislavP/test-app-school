// Slovak translations for the school management application
export const sk = {
  // Common
  common: {
    loading: 'Načítava...',
    error: 'Chyba',
    success: 'Úspech',
    cancel: 'Zrušiť',
    save: 'Uložiť',
    delete: 'Vymazať',
    edit: 'Upraviť',
    add: 'Pridať',
    search: 'Hľadať',
    back: 'Späť',
    next: 'Ďalej',
    previous: 'Predchádzajúce',
    close: 'Zavrieť',
    confirm: 'Potvrdiť',
    yes: 'Áno',
    no: 'Nie',
    ok: 'OK',
    retry: 'Skúsiť znovu',
    refresh: 'Obnoviť',
    logout: 'Odhlásiť sa'
  },

  // Authentication
  auth: {
    login: 'Prihlásenie',
    username: 'Používateľské meno',
    password: 'Heslo',
    loginButton: 'Prihlásiť sa',
    loginError: 'Neplatné používateľské meno alebo heslo',
    loginSuccess: 'Úspešne prihlásený',
    rememberMe: 'Zapamätať si ma',
    forgotPassword: 'Zabudli ste heslo?',
    noAccount: 'Nemáte účet?',
    contactAdmin: 'Kontaktujte administrátora',
    welcomeBack: 'Vitajte späť!',
    loginSubtitle: 'Prihláste sa do svojho účtu pre pokračovanie'
  },

  // Navigation
  nav: {
    dashboard: 'Dashboard',
    schools: 'Školy',
    devices: 'Zariadenia',
    settings: 'Nastavenia',
    profile: 'Profil',
    help: 'Pomoc'
  },

  // Schools
  schools: {
    title: 'Správa škôl',
    subtitle: 'Spravujte školy a ich zariadenia',
    searchPlaceholder: 'Hľadať školy...',
    noSchools: 'Žiadne školy nenájdené',
    loadingSchools: 'Načítavajú sa školy...',
    schoolDetails: 'Detaily školy',
    totalSchools: 'Celkový počet škôl',
    activeSchools: 'Aktívne školy',
    totalDevices: 'Celkový počet zariadení',
    healthyDevices: 'Zdravé zariadenia',
    viewDetails: 'Zobraziť detaily',
    scanQR: 'Skenovať QR kód',
    addDevice: 'Pridať zariadenie',
    deviceManagement: 'Správa zariadení',
    schoolInfo: 'Informácie o škole',
    contactInfo: 'Kontaktné informácie',
    statistics: 'Štatistiky',
    recentActivity: 'Nedávna aktivita'
  },

  // Devices
  devices: {
    title: 'Zariadenia',
    totalDevices: 'Celkový počet zariadení',
    healthyDevices: 'Zdravé zariadenia',
    warningDevices: 'Zariadenia s upozornením',
    criticalDevices: 'Kritické zariadenia',
    deviceId: 'ID zariadenia',
    deviceName: 'Názov zariadenia',
    status: 'Stav',
    lastSeen: 'Naposledy videné',
    location: 'Umiestnenie',
    type: 'Typ',
    model: 'Model',
    serialNumber: 'Sériové číslo',
    ipAddress: 'IP adresa',
    macAddress: 'MAC adresa',
    firmware: 'Firmware',
    uptime: 'Doba prevádzky',
    temperature: 'Teplota',
    cpuUsage: 'Využitie CPU',
    memoryUsage: 'Využitie pamäte',
    diskUsage: 'Využitie disku',
    networkStatus: 'Stav siete',
    powerStatus: 'Stav napájania',
    batteryLevel: 'Úroveň batérie'
  },

  // Status
  status: {
    healthy: 'Zdravé',
    warning: 'Upozornenie',
    critical: 'Kritické',
    offline: 'Offline',
    online: 'Online',
    unknown: 'Neznámy',
    active: 'Aktívne',
    inactive: 'Neaktívne',
    connected: 'Pripojené',
    disconnected: 'Odpojené',
    maintenance: 'Údržba',
    error: 'Chyba'
  },

  // QR Scanner
  qr: {
    title: 'QR skener',
    subtitle: 'Naskenujte QR kód zariadenia',
    scanTitle: 'Skenovať QR kód zariadenia',
    scanSubtitle: 'Umiestnite QR kód do rámca kamery pre registráciu nového zariadenia',
    processing: 'Spracováva sa...',
    processingMessage: 'Prosím čakajte, kým spracujeme váš QR kód',
    success: 'Úspech!',
    successMessage: 'QR kód bol úspešne spracovaný',
    error: 'Chyba',
    cameraError: 'Nastala chyba kamery. Skúste znovu alebo zadajte kód manuálne.',
    invalidCode: 'Neplatný QR kód',
    permissionDenied: 'Prístup ku kamere bol zamietnutý. Povoľte prístup ku kamere v nastaveniach prehliadača.',
    manualInput: 'Manuálne zadanie',
    enterCodeManually: 'Zadajte kód zariadenia manuálne',
    codeInputPlaceholder: 'Zadajte kód zariadenia...',
    submitCode: 'Odoslať kód',
    switchToCamera: 'Prepnúť na kameru',
    switchToManual: 'Prepnúť na manuálne zadanie',
    redirecting: 'Presmerovávame na detaily školy...',
    instructions: 'Ako skenovať',
    instruction1: 'Držte zariadenie stabilne a nasmerujte kameru na QR kód',
    instruction2: 'Uistite sa, že QR kód je dobre osvetlený a jasne viditeľný',
    instruction3: 'Skenovanie sa vykoná automaticky po detekcii',
    instruction4: 'Ak skenovanie zlyhá, môžete zadať kód manuálne',
    enableCamera: 'Povoliť kameru',
    cameraPermissionRequired: 'Pre skenovanie QR kódov je potrebný prístup ku kamere'
  },

  // Errors
  errors: {
    networkError: 'Chyba siete. Skúste znovu.',
    authRequired: 'Vyžaduje sa autentifikácia',
    notFound: 'Nenájdené',
    serverError: 'Chyba servera',
    unknownError: 'Nastala neočakávaná chyba',
    loadingFailed: 'Načítanie zlyhalo',
    saveFailed: 'Uloženie zlyhalo',
    deleteFailed: 'Vymazanie zlyhalo',
    connectionLost: 'Spojenie bolo prerušené',
    timeout: 'Časový limit vypršal',
    invalidInput: 'Neplatný vstup',
    permissionDenied: 'Prístup zamietnutý',
    fileNotFound: 'Súbor nenájdený',
    invalidFormat: 'Neplatný formát'
  },

  // Time
  time: {
    now: 'Teraz',
    today: 'Dnes',
    yesterday: 'Včera',
    tomorrow: 'Zajtra',
    thisWeek: 'Tento týždeň',
    lastWeek: 'Minulý týždeň',
    thisMonth: 'Tento mesiac',
    lastMonth: 'Minulý mesiac',
    thisYear: 'Tento rok',
    lastYear: 'Minulý rok',
    minutesAgo: 'pred {count} minútami',
    hoursAgo: 'pred {count} hodinami',
    daysAgo: 'pred {count} dňami',
    weeksAgo: 'pred {count} týždňami',
    monthsAgo: 'pred {count} mesiacmi',
    yearsAgo: 'pred {count} rokmi'
  },

  // Pagination
  pagination: {
    loadingMore: 'Načítavajú sa ďalšie...',
    noMoreItems: 'Žiadne ďalšie položky na načítanie',
    showingResults: 'Zobrazuje sa {start}-{end} z {total} výsledkov',
    itemsPerPage: 'Položiek na stránku',
    page: 'Stránka',
    of: 'z',
    first: 'Prvá',
    last: 'Posledná'
  },

  // Forms
  forms: {
    required: 'Toto pole je povinné',
    invalidEmail: 'Neplatná emailová adresa',
    invalidPhone: 'Neplatné telefónne číslo',
    invalidUrl: 'Neplatná URL adresa',
    minLength: 'Minimálna dĺžka je {min} znakov',
    maxLength: 'Maximálna dĺžka je {max} znakov',
    passwordMismatch: 'Heslá sa nezhodujú',
    weakPassword: 'Heslo je príliš slabé',
    invalidDate: 'Neplatný dátum',
    futureDate: 'Dátum musí byť v budúcnosti',
    pastDate: 'Dátum musí byť v minulosti'
  },

  // Actions
  actions: {
    view: 'Zobraziť',
    edit: 'Upraviť',
    delete: 'Vymazať',
    create: 'Vytvoriť',
    update: 'Aktualizovať',
    duplicate: 'Duplikovať',
    export: 'Exportovať',
    import: 'Importovať',
    print: 'Tlačiť',
    share: 'Zdieľať',
    download: 'Stiahnuť',
    upload: 'Nahrať',
    copy: 'Kopírovať',
    paste: 'Vložiť',
    cut: 'Vystrihnúť',
    undo: 'Späť',
    redo: 'Znovu',
    select: 'Vybrať',
    selectAll: 'Vybrať všetko',
    deselectAll: 'Zrušiť výber všetkých',
    filter: 'Filtrovať',
    sort: 'Zoradiť',
    group: 'Zoskupiť',
    expand: 'Rozbaliť',
    collapse: 'Zbaliť'
  }
};

export type TranslationKey = keyof typeof sk;
export type NestedTranslationKey<T> = T extends object ? {
  [K in keyof T]: T[K] extends object ? `${string & K}.${NestedTranslationKey<T[K]>}` : string & K
}[keyof T] : never;

export default sk;

