// Every image rendered for the website. The id encodes the output path:
// "<project-slug>--<file>" → public/assets/projects/<project-slug>/<file>.webp
import React from "react";
import { Cover } from "./covers";
import { SH, SW } from "./kit";
import { hd, HdCode, HdDashboard, HdNewTicket, HdSchema, HdTicket, HdTickets } from "./helpdesk";
import { pc, PcCheck, PcCode, PcParaphrase, PcResult } from "./checker";
import { mm, MmCode, MmCompose, MmDesign, MmInbox, MmSchedule } from "./miromail";

export type ImageDef = { id: string; width: number; height: number; component: React.FC };

const HD = "it-helpdesk-ticketing-system";
const PC = "ai-plagiarism-checker";
const MM = "miromail";

const shot = (slug: string, file: string, component: React.FC): ImageDef => ({ id: `${slug}--${file}`, width: SW, height: SH, component });

type CoverProps = Omit<React.ComponentProps<typeof Cover>, "w" | "h">;
const cover = (slug: string, file: string, w: number, h: number, props: CoverProps): ImageDef => {
  const Comp: React.FC = () => <Cover {...props} w={w} h={h} />;
  return { id: `${slug}--${file}`, width: w, height: h, component: Comp };
};
const thumb = (slug: string, props: CoverProps) => cover(slug, "thumbnail", 1200, 750, props);
const poster = (slug: string, file: string, props: CoverProps) => cover(slug, file, 1280, 720, props);

const hdUrl = "helpdesk.sampleschool.test";
const pcUrl = "checker.example.edu";
const mmUrl = "app.miromail.example";

export const images: ImageDef[] = [
  shot(HD, "screenshot-1", HdDashboard),
  shot(HD, "screenshot-2", HdTickets),
  shot(HD, "screenshot-3", HdTicket),
  shot(HD, "screenshot-4", HdNewTicket),
  shot(HD, "screenshot-5", HdSchema),
  shot(HD, "screenshot-6", HdCode),
  thumb(HD, { brand: hd, main: HdDashboard, second: HdTicket, url: hdUrl }),
  poster(HD, "poster", { brand: hd, main: HdTickets, second: HdNewTicket, url: hdUrl }),
  poster(HD, "poster-2", { brand: hd, main: HdDashboard, second: HdCode, secondDark: true, url: hdUrl, secondUrl: "assign.php" }),

  shot(PC, "screenshot-1", PcCheck),
  shot(PC, "screenshot-2", PcResult),
  shot(PC, "screenshot-3", PcParaphrase),
  shot(PC, "screenshot-4", PcCode),
  thumb(PC, { brand: pc, main: PcResult, second: PcParaphrase, url: pcUrl }),
  poster(PC, "poster", { brand: pc, main: PcCheck, second: PcResult, url: pcUrl }),

  shot(MM, "screenshot-1", MmCompose),
  shot(MM, "screenshot-2", MmDesign),
  shot(MM, "screenshot-3", MmSchedule),
  shot(MM, "screenshot-4", MmInbox),
  shot(MM, "screenshot-5", MmCode),
  thumb(MM, { brand: mm, main: MmDesign, second: MmCompose, url: mmUrl }),
  poster(MM, "poster", { brand: mm, main: MmCompose, second: MmSchedule, url: mmUrl }),
];
