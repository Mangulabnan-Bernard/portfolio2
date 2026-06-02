import TechIcon from '@/components/ui/TechIcon';

type Skill = { name: string; slug?: string };

// Static classes so Tailwind's scanner generates them (no dynamic strings).
const ROW_ANIM = [
  'animate-[marquee-left_85s_linear_infinite]',
  'animate-[marquee-right_42s_linear_infinite]',
  'animate-[marquee-left_50s_linear_infinite]',
];

const EDGE_FADE = 'linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)';

function Pill({ name, slug }: Skill) {
  return (
    <span className="flex items-center gap-3 pl-2 pr-5 py-2.5 bg-surface border border-border rounded-[999px] shrink-0 transition-colors hover:border-teal-3">
      <TechIcon slug={slug} name={name} size="md" />
      <span className="font-mono text-[15px] tracking-[0.04em] text-text-2 whitespace-nowrap">{name}</span>
    </span>
  );
}

export default function SkillsMarquee({ items, rows = 1 }: { items: Skill[]; rows?: number }) {
  // Round-robin into lanes so each row mixes categories.
  const lanes: Skill[][] = Array.from({ length: rows }, () => []);
  items.forEach((item, i) => lanes[i % rows].push(item));

  return (
    <div
      className="relative overflow-hidden py-1"
      style={{ WebkitMaskImage: EDGE_FADE, maskImage: EDGE_FADE }}
    >
      <div className="flex flex-col gap-4">
        {lanes.map((lane, i) => (
          <div
            key={i}
            className={`flex w-max gap-3.5 ${ROW_ANIM[i % ROW_ANIM.length]} hover:[animation-play-state:paused]`}
          >
            {/* Duplicated once for a seamless loop (animation shifts exactly 50%). */}
            {[...lane, ...lane].map((s, j) => (
              <Pill key={j} name={s.name} slug={s.slug} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
