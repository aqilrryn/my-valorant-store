export interface Chroma {
  uuid: string;
  displayName: string;
  displayIcon: string;
  fullRender: string;
  swatch: string;
  assetPath: string;
}

export interface Level {
  uuid: string;
  displayName: string;
  levelItem: string;
  displayIcon: string;
  assetPath: string;
}

export interface Skin {
  uuid: string;
  cost?: number;
  displayName: string;
  themeUuid?: string;
  contentTierUuid?: string;
  displayIcon?: string;
  assetPath?: string;
  chromas?: Chroma[];
  levels?: Level[];
}
