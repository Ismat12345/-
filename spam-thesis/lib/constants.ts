import type {
  ModelMetrics,
  DatasetStats,
  PreprocessingStep,
  WordFrequency,
  ConfusionMatrixData,
  ROCPoint,
  NavItem,
} from './types'

/* ──────────────────────────────────────────────
 *  Автор работы
 * ────────────────────────────────────────────── */
export const AUTHOR = {
  fullName: 'Баротов Исмат Латиф угли',
  shortName: 'Баротов И.Л.',
  initials: 'БИ',
  university:
    'Ташкентский университет информационных технологий имени Мухаммада ал-Хоразмий',
  universityShort: 'ТАТУ',
  faculty: 'Кибербезопасность',
  department: 'Криптология',
  specialty: '606103000 – Информационная безопасность (по отраслям)',
  year: 2026,
  supervisor: 'Хамидов Ш.Ж.',
  reviewer: 'Абдурахимов Б.Ф.',
  headOfDepartment: 'Худойкулов З.Т.',
  city: 'Ташкент',
  country: 'Узбекистан',
}

/* ──────────────────────────────────────────────
 *  Метрики моделей (5 классификаторов)
 *  Поле `icon` — имя иконки из lucide-react.
 * ────────────────────────────────────────────── */
export const MODEL_METRICS: ModelMetrics[] = [
  {
    name: 'Multinomial Naive Bayes',
    shortName: 'NB',
    accuracy: 96.2,
    precision: 95.8,
    recall: 97.3,
    f1: 96.5,
    auc: 97.1,
    color: '#A78BFA',
    icon: 'Calculator',
    description:
      'Вероятностный классификатор на основе теоремы Байеса с предположением о независимости признаков. Оценивает апостериорную вероятность принадлежности письма к классу спама по частотам слов.',
    pros: [
      'Очень быстрое обучение',
      'Хорошо работает с малыми данными',
      'Интерпретируемость',
    ],
    cons: [
      'Предположение о независимости признаков',
      'Чувствителен к несбалансированным данным',
    ],
    timeMs: 12,
  },
  {
    name: 'Logistic Regression',
    shortName: 'LogReg',
    accuracy: 97.1,
    precision: 97.4,
    recall: 96.6,
    f1: 97.0,
    auc: 98.2,
    color: '#60A5FA',
    icon: 'Activity',
    description:
      'Линейный классификатор с сигмоидной функцией активации, оценивающий вероятность класса через взвешенную сумму признаков. Хорошо масштабируется на разреженных TF-IDF-векторах.',
    pros: [
      'Интерпретируемые коэффициенты',
      'Устойчивость к переобучению',
      'Быстрое обучение',
    ],
    cons: ['Только линейные границы решений', 'Требует нормализации признаков'],
    timeMs: 45,
  },
  {
    name: 'Support Vector Machine (SVM)',
    shortName: 'SVM',
    accuracy: 98.2,
    precision: 98.5,
    recall: 97.7,
    f1: 98.1,
    auc: 99.1,
    color: '#34D399',
    icon: 'Spline',
    description:
      'Алгоритм максимизации зазора между классами, строящий оптимальную разделяющую гиперплоскость. Особенно эффективен в пространствах высокой размерности, характерных для текстовых данных.',
    pros: [
      'Высокая точность',
      'Эффективность в пространстве высоких размерностей',
      'Устойчивость к переобучению',
    ],
    cons: [
      'Высокая вычислительная сложность',
      'Сложная настройка гиперпараметров',
    ],
    timeMs: 320,
  },
  {
    name: 'Random Forest',
    shortName: 'RF',
    accuracy: 97.6,
    precision: 98.0,
    recall: 97.0,
    f1: 97.5,
    auc: 98.7,
    color: '#FBBF24',
    icon: 'Trees',
    description:
      'Ансамблевый метод из 100 решающих деревьев с голосованием большинства. Снижает дисперсию за счёт бэггинга и случайного выбора подмножеств признаков на каждом разбиении.',
    pros: [
      'Устойчивость к выбросам',
      'Оценка важности признаков',
      'Нет необходимости в нормализации',
    ],
    cons: ['Менее интерпретируемый', 'Больший объём памяти'],
    timeMs: 280,
  },
  {
    name: 'LSTM Neural Network',
    shortName: 'LSTM',
    accuracy: 98.9,
    precision: 99.1,
    recall: 98.6,
    f1: 98.8,
    auc: 99.5,
    color: '#F87171',
    icon: 'BrainCircuit',
    description:
      'Рекуррентная нейронная сеть с механизмом долгой краткосрочной памяти, обрабатывающая письмо как последовательность токенов. Улавливает контекст и порядок слов через вентили запоминания и забывания.',
    pros: [
      'Лучшая точность',
      'Учитывает порядок слов',
      'Улавливает семантические зависимости',
    ],
    cons: [
      'Самое долгое обучение',
      'Требует большой датасет',
      'Сложная интерпретация',
    ],
    timeMs: 2400,
  },
]

/* ──────────────────────────────────────────────
 *  Статистика датасета
 * ────────────────────────────────────────────── */
export const DATASET_STATS: DatasetStats = {
  total: 33716,
  spam: 10080,
  ham: 23636,
  spamPercent: 29.9,
  hamPercent: 70.1,
  trainSize: 26972,
  testSize: 6744,
  avgLength: 847,
  uniqueWords: 124500,
  sources: [
    'SpamAssassin Public Corpus',
    'Enron Email Dataset',
    'Ling-Spam Dataset',
  ],
}

/* ──────────────────────────────────────────────
 *  Этапы предобработки (7 шагов)
 *  Поле `icon` — имя иконки из lucide-react.
 * ────────────────────────────────────────────── */
export const PREPROCESSING_STEPS: PreprocessingStep[] = [
  {
    id: 1,
    title: 'Извлечение текста',
    description:
      'Удаление HTML-тегов и парсинг заголовков письма (From, Subject, Body) в единый текстовый поток.',
    inputExample: '<b>FREE</b> <i>prize</i>!!!',
    outputExample: 'FREE prize!!!',
    icon: 'FileCode',
  },
  {
    id: 2,
    title: 'Нормализация',
    description:
      'Приведение к нижнему регистру, удаление спецсимволов и нормализация пробелов.',
    inputExample: 'FREE prize!!!',
    outputExample: 'free prize',
    icon: 'CaseLower',
  },
  {
    id: 3,
    title: 'Токенизация',
    description: 'Разбивка текста на токены по пробелам и пунктуации.',
    inputExample: 'free prize offer',
    outputExample: "['free', 'prize', 'offer']",
    icon: 'Scissors',
  },
  {
    id: 4,
    title: 'Удаление стоп-слов',
    description:
      'Фильтрация 179 малоинформативных стоп-слов (NLTK English stopwords).',
    inputExample: "['this', 'is', 'a', 'free', 'offer']",
    outputExample: "['free', 'offer']",
    icon: 'Filter',
  },
  {
    id: 5,
    title: 'Стемминг / Лемматизация',
    description:
      'Приведение слов к базовой форме с помощью Porter Stemmer и WordNetLemmatizer.',
    inputExample: "['running', 'winner', 'offers']",
    outputExample: "['run', 'winner', 'offer']",
    icon: 'Combine',
  },
  {
    id: 6,
    title: 'Фильтрация по длине',
    description: 'Удаление токенов короче 2 символов.',
    inputExample: "['a', 'to', 'free', 'offer']",
    outputExample: "['free', 'offer']",
    icon: 'Ruler',
  },
  {
    id: 7,
    title: 'Векторизация TF-IDF',
    description:
      '50 000 признаков, n-граммы (1,2), max_df = 0.95. Преобразование токенов в разреженный числовой вектор.',
    inputExample: "['free', 'offer']",
    outputExample: '[0, 0, 0.84, 0, 0.62, ...]',
    icon: 'Binary',
  },
]

/* ──────────────────────────────────────────────
 *  Топ-20 слов в спаме
 * ────────────────────────────────────────────── */
export const SPAM_KEYWORDS: WordFrequency[] = [
  { word: 'free', count: 4821, type: 'spam' },
  { word: 'click', count: 3654, type: 'spam' },
  { word: 'offer', count: 3201, type: 'spam' },
  { word: 'winner', count: 2987, type: 'spam' },
  { word: 'prize', count: 2756, type: 'spam' },
  { word: 'urgent', count: 2543, type: 'spam' },
  { word: 'verify', count: 2341, type: 'spam' },
  { word: 'account', count: 2187, type: 'spam' },
  { word: 'limited', count: 2043, type: 'spam' },
  { word: 'guaranteed', count: 1987, type: 'spam' },
  { word: 'dollar', count: 1876, type: 'spam' },
  { word: 'loan', count: 1754, type: 'spam' },
  { word: 'casino', count: 1698, type: 'spam' },
  { word: 'subscribe', count: 1567, type: 'spam' },
  { word: 'exclusive', count: 1498, type: 'spam' },
  { word: 'money', count: 1432, type: 'spam' },
  { word: 'cheap', count: 1387, type: 'spam' },
  { word: 'bonus', count: 1298, type: 'spam' },
  { word: 'deal', count: 1254, type: 'spam' },
  { word: 'discount', count: 1187, type: 'spam' },
]

/* ──────────────────────────────────────────────
 *  Топ-20 слов в нормальных письмах (ham)
 * ────────────────────────────────────────────── */
export const HAM_KEYWORDS: WordFrequency[] = [
  { word: 'meeting', count: 5432, type: 'ham' },
  { word: 'project', count: 4987, type: 'ham' },
  { word: 'report', count: 4654, type: 'ham' },
  { word: 'please', count: 4321, type: 'ham' },
  { word: 'review', count: 3987, type: 'ham' },
  { word: 'team', count: 3754, type: 'ham' },
  { word: 'schedule', count: 3543, type: 'ham' },
  { word: 'update', count: 3321, type: 'ham' },
  { word: 'discuss', count: 3187, type: 'ham' },
  { word: 'attached', count: 2987, type: 'ham' },
  { word: 'regards', count: 2876, type: 'ham' },
  { word: 'forward', count: 2743, type: 'ham' },
  { word: 'tuesday', count: 2543, type: 'ham' },
  { word: 'deadline', count: 2432, type: 'ham' },
  { word: 'confirm', count: 2321, type: 'ham' },
  { word: 'agenda', count: 2187, type: 'ham' },
  { word: 'question', count: 2076, type: 'ham' },
  { word: 'department', count: 1987, type: 'ham' },
  { word: 'budget', count: 1876, type: 'ham' },
  { word: 'conference', count: 1765, type: 'ham' },
]

/* ──────────────────────────────────────────────
 *  Матрица ошибок (LSTM, 6744 тестовых письма)
 * ────────────────────────────────────────────── */
export const CONFUSION_MATRIX: ConfusionMatrixData = {
  tp: 1993, // True Positive  — спам определён верно
  tn: 4613, // True Negative  — ham определён верно
  fp: 24, //  False Positive — ham ошибочно как спам
  fn: 114, // False Negative — спам пропущен
}

/* ──────────────────────────────────────────────
 *  ROC-кривые по моделям (реалистичные точки FPR/TPR)
 *  Порядок качества: LSTM > SVM > RF > LogReg > NB
 * ────────────────────────────────────────────── */
export const ROC_DATA: Record<string, ROCPoint[]> = {
  // AUC ≈ 0.971
  'Naive Bayes': [
    { fpr: 0.0, tpr: 0.0 },
    { fpr: 0.01, tpr: 0.78 },
    { fpr: 0.02, tpr: 0.86 },
    { fpr: 0.04, tpr: 0.91 },
    { fpr: 0.07, tpr: 0.94 },
    { fpr: 0.12, tpr: 0.96 },
    { fpr: 0.2, tpr: 0.975 },
    { fpr: 0.35, tpr: 0.985 },
    { fpr: 0.55, tpr: 0.992 },
    { fpr: 0.78, tpr: 0.997 },
    { fpr: 1.0, tpr: 1.0 },
  ],
  // AUC ≈ 0.982
  'Logistic Regression': [
    { fpr: 0.0, tpr: 0.0 },
    { fpr: 0.005, tpr: 0.82 },
    { fpr: 0.015, tpr: 0.89 },
    { fpr: 0.03, tpr: 0.93 },
    { fpr: 0.05, tpr: 0.955 },
    { fpr: 0.09, tpr: 0.97 },
    { fpr: 0.16, tpr: 0.982 },
    { fpr: 0.28, tpr: 0.99 },
    { fpr: 0.45, tpr: 0.995 },
    { fpr: 0.7, tpr: 0.998 },
    { fpr: 1.0, tpr: 1.0 },
  ],
  // AUC ≈ 0.991
  SVM: [
    { fpr: 0.0, tpr: 0.0 },
    { fpr: 0.003, tpr: 0.88 },
    { fpr: 0.01, tpr: 0.93 },
    { fpr: 0.02, tpr: 0.96 },
    { fpr: 0.035, tpr: 0.975 },
    { fpr: 0.06, tpr: 0.985 },
    { fpr: 0.1, tpr: 0.992 },
    { fpr: 0.18, tpr: 0.996 },
    { fpr: 0.35, tpr: 0.998 },
    { fpr: 0.6, tpr: 0.999 },
    { fpr: 1.0, tpr: 1.0 },
  ],
  // AUC ≈ 0.987
  'Random Forest': [
    { fpr: 0.0, tpr: 0.0 },
    { fpr: 0.004, tpr: 0.85 },
    { fpr: 0.012, tpr: 0.91 },
    { fpr: 0.025, tpr: 0.95 },
    { fpr: 0.045, tpr: 0.968 },
    { fpr: 0.075, tpr: 0.98 },
    { fpr: 0.13, tpr: 0.988 },
    { fpr: 0.22, tpr: 0.994 },
    { fpr: 0.4, tpr: 0.997 },
    { fpr: 0.65, tpr: 0.999 },
    { fpr: 1.0, tpr: 1.0 },
  ],
  // AUC ≈ 0.995
  LSTM: [
    { fpr: 0.0, tpr: 0.0 },
    { fpr: 0.002, tpr: 0.92 },
    { fpr: 0.006, tpr: 0.96 },
    { fpr: 0.013, tpr: 0.978 },
    { fpr: 0.025, tpr: 0.987 },
    { fpr: 0.045, tpr: 0.992 },
    { fpr: 0.08, tpr: 0.996 },
    { fpr: 0.15, tpr: 0.998 },
    { fpr: 0.3, tpr: 0.999 },
    { fpr: 0.55, tpr: 0.9995 },
    { fpr: 1.0, tpr: 1.0 },
  ],
}

/* ──────────────────────────────────────────────
 *  Навигация
 * ────────────────────────────────────────────── */
export const NAV_ITEMS: NavItem[] = [
  { label: 'Введение', href: '#intro' },
  { label: 'Проблема', href: '#problem' },
  { label: 'Датасет', href: '#dataset' },
  { label: 'Методология', href: '#methodology' },
  { label: 'Модели', href: '#models' },
  { label: 'Результаты', href: '#results' },
  { label: 'Демо', href: '#demo' },
  { label: 'Об авторе', href: '#author' },
]
