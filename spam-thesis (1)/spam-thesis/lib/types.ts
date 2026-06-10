export interface ModelMetrics {
  name: string
  shortName: string
  accuracy: number
  precision: number
  recall: number
  f1: number
  auc: number
  color: string
  icon: string
  description: string
  pros: string[]
  cons: string[]
  timeMs: number
}

export interface DatasetStats {
  total: number
  spam: number
  ham: number
  spamPercent: number
  hamPercent: number
  trainSize: number
  testSize: number
  avgLength: number
  uniqueWords: number
  sources: string[]
}

export interface PreprocessingStep {
  id: number
  title: string
  description: string
  inputExample: string
  outputExample: string
  icon: string
}

export interface ConfusionMatrixData {
  tp: number
  tn: number
  fp: number
  fn: number
}

export interface WordFrequency {
  word: string
  count: number
  type: 'spam' | 'ham'
}

export interface NavItem {
  label: string
  href: string
}

export interface ROCPoint {
  fpr: number
  tpr: number
}

export interface DemoResult {
  label: 'spam' | 'ham'
  confidence: number
  spamScore: number
  hamScore: number
  topFeatures: string[]
}
