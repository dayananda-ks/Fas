export interface Probability { label: string; value: number }
export interface PredictionResult {
  label: string;
  confidence: number;
  status: string;
  probabilities: Probability[];
}
