import { ObjectValues } from "src/components/helpers";

const bagFlags = {
    bag: "funda",
    noBag: "no_funda",
    unknown_: "unknown",
} as const;
export type BagFlag = typeof bagFlags;
export interface TopNPrediction {
    topN: PredictedItem[] | null;
    enoughConfidence: boolean;
    bagType: ObjectValues<BagFlag>;
    bagTypeConfidence: number;
}

export interface PredictedItem {
    desc: string;
    skuId: string;
    confidence: number;
}

export function mapApiJsonToPredictedItem(apiArray: any[]) {
    const items: PredictedItem[] = apiArray.map((item) => {
        return {
            desc: item.desc,
            skuId: item.sku_id,
            confidence: item.confidence,
        };
    });

    return items;
}

export const isBagFlag = (value: any) =>
    Object.values(bagFlags).includes(value);
