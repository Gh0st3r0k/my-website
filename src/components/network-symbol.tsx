type Props = { kind: "switch" | "router" };
const arrowPath = "M-24-6H6V-14L28 0 6 14V6H-24Z";

/** Place all arrows on one plane, then project that plane onto the device top. */
export function NetworkSymbol({ kind }: Props) {
  const arrows =
    kind === "router"
      ? [
          { x: -63, y: 0, rotation: 0 },
          { x: 63, y: 0, rotation: 180 },
          { x: 0, y: -63, rotation: -90 },
          { x: 0, y: 63, rotation: 90 },
        ]
      : [
          { x: -28, y: -28, rotation: 180 },
          { x: 28, y: -28, rotation: 0 },
          { x: -28, y: 28, rotation: 180 },
          { x: 28, y: 28, rotation: 0 },
        ];
  return (
    <g className="network-symbol" strokeLinejoin="round">
      {kind === "router" ? (
        <>
          <path
            className="network-side"
            d="M90 88V145C90 177 144 203 210 203S330 177 330 145V88Z"
          />
          <ellipse className="network-top" cx="210" cy="88" rx="120" ry="57" />
        </>
      ) : (
        <>
          <path className="network-left" d="M80 91 210 155V207L80 143Z" />
          <path className="network-side" d="M210 155 340 91V143L210 207Z" />
          <path className="network-top" d="M80 91 210 27 340 91 210 155Z" />
        </>
      )}
      <g
        className="network-arrows"
        transform={
          kind === "router"
            ? "translate(210 88) scale(1 .475) rotate(30)"
            : "matrix(1 .4923076923 -1 .4923076923 210 91)"
        }
      >
        {arrows.map((arrow, index) => (
          <path
            key={index}
            d={arrowPath}
            transform={`translate(${arrow.x} ${arrow.y}) rotate(${arrow.rotation})`}
          />
        ))}
      </g>
    </g>
  );
}
