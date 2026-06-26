export interface DiagnosisReport {
  cropName: string;
  condition: string;
  confidence: number;
  severity: "None" | "Low" | "Medium" | "High" | string;
  summary: string;
  symptoms: string[];
  treatments: {
    organic: string[];
    chemical: string[];
  };
  preventions: string[];
  isSimulated?: boolean;
}

export interface TrainingParameters {
  epochs: number;
  learningRate: number;
  batchSize: number;
  rotationRange: number;
  zoomRange: number;
  shearRange: number;
  horizontalFlip: boolean;
  rescale: number;
}

export interface TrainingEpochStats {
  epoch: number;
  loss: number;
  accuracy: number;
  valLoss: number;
  valAccuracy: number;
}

export interface DiseaseWikiEntry {
  name: string;
  crop: string;
  description: string;
  symptoms: string[];
  organicTreatments: string[];
  chemicalTreatments: string[];
  preventions: string[];
}
