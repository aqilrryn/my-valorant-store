import { Skin } from "src/skins/types";

export interface AdsStats {
  zoomMultiplier: number;
  fireRate: number;
  runSpeedMultiplier: number;
  burstCount: number;
  firstBulletAccuracy: number;
}

export interface DamageRange {
  rangeStartMeters: number;
  rangeEndMeters: number;
  headDamage: number;
  bodyDamage: number;
  legDamage: number;
}

export interface WeaponStats {
  fireRate: number;
  magazineSize: number;
  runSpeedMultiplier: number;
  equipTimeSeconds: number;
  reloadTimeSeconds: number;
  firstBulletAccuracy: number;
  shotgunPelletCount: number;
  wallPenetration: string;
  feature: string;
  fireMode?: any;
  altFireType: string;
  adsStats: AdsStats;
  altShotgunStats?: any;
  airBurstStats?: any;
  damageRanges: DamageRange[];
}

export interface GridPosition {
  row: number;
  column: number;
}

export interface ShopData {
  cost: number;
  category: string;
  categoryText: string;
  gridPosition: GridPosition;
  image: string;
  newImage: string;
  newImage2: string;
  assetPath: string;
}

export interface Weapon {
  uuid: string;
  displayName: string;
  category: string;
  defaultSkinUuid: string;
  displayIcon: string;
  killStreamIcon: string;
  assetPath: string;
  weaponStats: WeaponStats;
  shopData: ShopData;
  skins: Skin[];
}
