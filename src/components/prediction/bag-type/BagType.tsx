import { ObjectValues } from "src/components/helpers";
import { BagFlag } from "src/modules";

interface Props {
    bagType: ObjectValues<BagFlag>;
    bagTypeConfidence: number;
}
function BagType({ bagType, bagTypeConfidence }: Props) {
    switch (bagType) {
        case "funda":
            return (
                <p>
                    El producto está en funda:{" "}
                    {bagTypeConfidence
                        ? (Math.round(bagTypeConfidence * 1000) / 1000).toFixed(
                              3
                          )
                        : 0.0}
                </p>
            );
        case "no_funda":
            return (
                <p>
                    El producto no está en funda:{" "}
                    {bagTypeConfidence
                        ? (Math.round(bagTypeConfidence * 1000) / 1000).toFixed(
                              3
                          )
                        : 0.0}
                </p>
            );
        case "unknown":
            return <p></p>;
    }
}

export default BagType;
