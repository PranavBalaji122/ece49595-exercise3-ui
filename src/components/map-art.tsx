/** An original schematic, deliberately not a live map or a navigation aid. */
export function MapArt() {
  return (
    <svg viewBox="0 0 800 800" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
      <defs><pattern id="blocks" width="92" height="86" patternUnits="userSpaceOnUse" patternTransform="rotate(-12)"><rect width="92" height="86" fill="#eeeee5" /><rect x="8" y="8" width="76" height="70" rx="6" fill="#e4e5d9" /><path d="M30 8v70M56 8v70M8 38h76" stroke="#edeee5" strokeWidth="4" /></pattern></defs>
      <rect width="800" height="800" fill="url(#blocks)" />
      <path d="M0 0h266l-5 189-90 75L0 234ZM420 0h207l-53 154-146 13ZM35 441l165-48 117 167-93 111L0 626ZM520 218l140-35 73 178-188 20Z" fill="#d4dfc5" />
      <path d="M0 760 179 643l156 43 29 114M481 645l67-66 95 5 41 116-84 69-102-12Z" fill="#d0ddc1" />
      <path d="M816 70C667 202 747 256 680 354S632 459 632 523 524 672 556 800" fill="none" stroke="#c0dce0" strokeWidth="62" />
      <path d="M816 70C667 202 747 256 680 354S632 459 632 523 524 672 556 800" fill="none" stroke="#d6e8e9" strokeWidth="2" strokeDasharray="5 8" />
      <g fill="none" stroke="#d6d9cd" strokeWidth="22"><path d="M-30 329 823 165M107-10 304 824M425-10 445 241 514 815M-20 619 790 459M-20 438 828 320" /></g>
      <g fill="none" stroke="#fafbf4" strokeWidth="16"><path d="M-30 329 823 165M107-10 304 824M425-10 445 241 514 815M-20 619 790 459M-20 438 828 320" /></g>
      <g fill="none" stroke="#fafbf4" strokeWidth="9"><path d="m18 150 617-117M42 510l493-105M328 5l-36 213 54 345M30 741l463-139M559 64l-51 144 69 233M48 354l46 256M655 658l147-43M727 386l30 296" /></g>
      <path d="M432 773 301 658 329 516 457 397" stroke="#b3c9a2" strokeWidth="4" strokeDasharray="6 6" fill="none" />
      <g fill="#d5d9cb" stroke="#cbd0c2" strokeWidth="1">
        <rect x="238" y="266" width="53" height="30" rx="3" transform="rotate(-12 238 266)" /><rect x="309" y="287" width="60" height="38" rx="3" transform="rotate(-12 309 287)" />
        <rect x="272" y="363" width="48" height="26" rx="2" transform="rotate(-12 272 363)" /><rect x="375" y="350" width="47" height="54" rx="2" transform="rotate(-12 375 350)" />
        <rect x="275" y="459" width="57" height="47" rx="2" transform="rotate(-12 275 459)" /><rect x="364" y="450" width="48" height="60" rx="2" transform="rotate(-12 364 450)" />
        <rect x="311" y="535" width="60" height="28" rx="2" transform="rotate(-12 311 535)" />
      </g>
      <g transform="rotate(-12 204 167)"><rect x="182" y="118" width="90" height="67" rx="30" fill="#c8d1b7" stroke="#b6c5a8" strokeWidth="7" /><rect x="201" y="130" width="52" height="43" rx="4" fill="#bacba5" /><path d="M227 130v43" stroke="#e8eedf" strokeWidth="2" /></g>
      <g fill="#bdcba9" stroke="#edf2e6" strokeWidth="1.4"><rect x="80" y="485" width="61" height="88" rx="2" /><rect x="153" y="485" width="61" height="88" rx="2" /><path d="M80 529h61M153 529h61" /><circle cx="110" cy="529" r="10" fill="none" /><circle cx="183" cy="529" r="10" fill="none" /></g>
      <g fill="#b7c7a4" opacity=".65">{[[40,80],[62,101],[72,70],[95,98],[553,249],[574,268],[599,248],[560,306],[600,313],[82,620],[63,653],[90,676],[496,695],[519,725],[535,680],[452,86],[477,63]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="9" />)}</g>
      <g fontFamily="Arial,sans-serif" fill="#818b77" fontSize="12" letterSpacing="1.2" textAnchor="middle">
        <text x="347" y="429" fontSize="17" letterSpacing="3" fill="#737e67">PURDUE</text><text x="347" y="450" fontSize="12" letterSpacing="3">UNIVERSITY</text>
        <text x="255" y="217" fontSize="10">ROSS-ADE STADIUM</text><text x="579" y="305" fontSize="11">HAPPY HOLLOW</text><text x="579" y="322" fontSize="10">PARK</text>
        <text x="582" y="575" fontSize="15" letterSpacing="2">WEST LAFAYETTE</text><text x="721" y="725" fontSize="13" letterSpacing="2">LAFAYETTE</text>
        <text x="145" y="601" fontSize="10">INTRAMURAL FIELDS</text><text x="497" y="118" fontSize="10">CUMBERLAND PARK</text>
        <text x="395" y="248" transform="rotate(-12 395 248)" fontSize="10">W STADIUM AVE</text><text x="397" y="535" transform="rotate(-12 397 535)" fontSize="10">W STATE ST</text>
        <text x="480" y="351" transform="rotate(80 480 351)" fontSize="10">N NORTHWESTERN AVE</text><text x="218" y="457" transform="rotate(76 218 457)" fontSize="10">MARTIN JISCHKE DR</text>
        <text x="666" y="470" transform="rotate(-67 666 470)" fill="#658e98" fontSize="11">WABASH RIVER</text>
      </g>
      <circle cx="402" cy="501" r="28" fill="#7191ae" opacity=".12" /><circle cx="402" cy="501" r="8" fill="#648bab" stroke="white" strokeWidth="3" />
    </svg>
  );
}
