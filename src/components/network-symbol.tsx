type Props = { kind: "switch" | "router" };
/** Conventional topology symbols: switch prism and router cylinder. */
export function NetworkSymbol({ kind }: Props) {
  return (
    <g className="network-symbol" strokeLinejoin="round">
      {kind === "router" ? (
        <>
          <path
            className="network-side"
            d="M90 88V145C90 177 144 203 210 203S330 177 330 145V88Z"
          />
          <ellipse className="network-top" cx="210" cy="88" rx="120" ry="57" />
          <g className="network-arrows">
            <path d="m113 67 59 13-4-10 33 26-46 9 11-10-63-14Z" />
            <path d="m219 69 34-17-13-3 32-7 2 22-10-6-27 23Z" />
            <path d="m309 112-63-14 5 11-36-25 48-10-11 11 64 14Z" />
            <path d="m204 106-37 19 12 4-31 5-3-20 10 5 30-23Z" />
          </g>
        </>
      ) : (
        <>
          <path className="network-left" d="M80 91 210 155V207L80 143Z" />
          <path className="network-side" d="M210 155 340 91V143L210 207Z" />
          <path className="network-top" d="M80 91 210 27 340 91 210 155Z" />
          <g className="network-arrows">
            <path d="m170 56 41 9-9 5 28 14-15 8-29-15-9 5Z" />
            <path d="m248 68-16 8 29 15-10 5 36 5-8-20-8 4Z" />
            <path d="m118 88 39 6-10 5 29 14-16 8-31-15-9 6Z" />
            <path d="m204 109-16 8 29 14-10 5 34 3-7-18-9 4Z" />
          </g>
        </>
      )}
    </g>
  );
}
