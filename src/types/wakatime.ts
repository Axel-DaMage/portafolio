export interface WakaTimeLanguage {
  name: string;
  percent: number;
}

export interface WakaTimeEditor {
  name: string;
  percent: number;
}

export interface WakaTimeStats {
  totalHours7d: string;
  dailyAverage: string;
  languages: WakaTimeLanguage[];
  editors: WakaTimeEditor[];
}
