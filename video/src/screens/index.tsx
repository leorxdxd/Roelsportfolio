// Every image rendered for the website. The id encodes the output path:
// "<project-slug>--<file>" → public/assets/projects/<project-slug>/<file>.webp
// All screens are illustrations with made-up sample data.
import React from "react";
import { Cover } from "./covers";
import { SH, SW } from "./kit";
import { ap, ApBilling, ApCode, ApDashboard, ApSchema, ApTenant, ApUnits } from "./apartment";
import { emr, EmrChart, EmrCode, EmrConsult, EmrQueue } from "./emr";
import { mp, MpCatalog, MpCode, MpInventory, MpOrders } from "./medicine";
import { hd, HdCode, HdDashboard, HdNewTicket, HdSchema, HdTicket, HdTickets } from "./helpdesk";
import { WsCafeDesktop, WsClinicDesktop, WsMobile, WsRealtyDesktop } from "./websites";
import { au, AuCode, AuFlow, AuRuns, AuWorkflows } from "./automations";

export type ImageDef = { id: string; width: number; height: number; component: React.FC };

const AP = "apartment-management-system";
const EMR = "electronic-medical-records";
const MP = "medicine-portal";
const HD = "it-helpdesk-ticketing-system";
const WS = "business-websites";
const AU = "workflow-automations";

const shot = (slug: string, file: string, component: React.FC): ImageDef => ({ id: `${slug}--${file}`, width: SW, height: SH, component });

type CoverProps = Omit<React.ComponentProps<typeof Cover>, "w" | "h">;
const cover = (slug: string, file: string, w: number, h: number, props: CoverProps): ImageDef => {
  const Comp: React.FC = () => <Cover {...props} w={w} h={h} />;
  return { id: `${slug}--${file}`, width: w, height: h, component: Comp };
};
const thumb = (slug: string, props: CoverProps) => cover(slug, "thumbnail", 1200, 750, props);
const poster = (slug: string, file: string, props: CoverProps) => cover(slug, file, 1280, 720, props);

const apUrl = "rentals.sampleresidences.test";
const emrUrl = "emr.sampleclinic.test";
const mpUrl = "admin.samplepharmacy.test";
const hdUrl = "helpdesk.sampleschool.test";
const auUrl = "automations.sample.test";
const ws = { brand: "Websites", color: "#ea580c", soft: "#fff1e6", dark: "#c2410c", icon: "globe" } as const;

export const images: ImageDef[] = [
  shot(AP, "screenshot-1", ApDashboard),
  shot(AP, "screenshot-2", ApUnits),
  shot(AP, "screenshot-3", ApBilling),
  shot(AP, "screenshot-4", ApTenant),
  shot(AP, "screenshot-5", ApSchema),
  shot(AP, "screenshot-6", ApCode),
  thumb(AP, { brand: ap, main: ApDashboard, second: ApTenant, url: apUrl, secondUrl: "my.sampleresidences.test" }),
  poster(AP, "poster", { brand: ap, main: ApBilling, second: ApCode, secondDark: true, url: apUrl, secondUrl: "generate-bills" }),

  shot(EMR, "screenshot-1", EmrChart),
  shot(EMR, "screenshot-2", EmrQueue),
  shot(EMR, "screenshot-3", EmrConsult),
  shot(EMR, "screenshot-4", EmrCode),
  thumb(EMR, { brand: emr, main: EmrChart, second: EmrConsult, url: emrUrl }),
  poster(EMR, "poster", { brand: emr, main: EmrQueue, second: EmrChart, url: emrUrl }),

  shot(MP, "screenshot-1", MpCatalog),
  shot(MP, "screenshot-2", MpInventory),
  shot(MP, "screenshot-3", MpOrders),
  shot(MP, "screenshot-4", MpCode),
  thumb(MP, { brand: mp, main: MpInventory, second: MpCatalog, url: mpUrl, secondUrl: "samplepharmacy.test" }),
  poster(MP, "poster", { brand: mp, main: MpCatalog, second: MpOrders, url: "samplepharmacy.test", secondUrl: mpUrl }),

  shot(HD, "screenshot-1", HdDashboard),
  shot(HD, "screenshot-2", HdTickets),
  shot(HD, "screenshot-3", HdTicket),
  shot(HD, "screenshot-4", HdNewTicket),
  shot(HD, "screenshot-5", HdSchema),
  shot(HD, "screenshot-6", HdCode),
  thumb(HD, { brand: hd, main: HdDashboard, second: HdTicket, url: hdUrl }),
  poster(HD, "poster", { brand: hd, main: HdTickets, second: HdNewTicket, url: hdUrl }),
  poster(HD, "poster-2", { brand: hd, main: HdDashboard, second: HdCode, secondDark: true, url: hdUrl, secondUrl: "assign.php" }),

  shot(WS, "screenshot-1", WsCafeDesktop),
  shot(WS, "screenshot-2", WsClinicDesktop),
  shot(WS, "screenshot-3", WsRealtyDesktop),
  shot(WS, "screenshot-4", WsMobile),
  thumb(WS, { brand: { name: ws.brand, color: ws.color, soft: ws.soft, dark: ws.dark, icon: ws.icon }, main: WsCafeDesktop, second: WsClinicDesktop, url: "samplecafe.test", secondUrl: "sampledental.test" }),
  poster(WS, "poster", { brand: { name: ws.brand, color: ws.color, soft: ws.soft, dark: ws.dark, icon: ws.icon }, main: WsRealtyDesktop, second: WsCafeDesktop, url: "sampleresidences.test", secondUrl: "samplecafe.test" }),

  shot(AU, "screenshot-1", AuWorkflows),
  shot(AU, "screenshot-2", AuFlow),
  shot(AU, "screenshot-3", AuRuns),
  shot(AU, "screenshot-4", AuCode),
  thumb(AU, { brand: au, main: AuWorkflows, second: AuFlow, url: auUrl }),
  poster(AU, "poster", { brand: au, main: AuFlow, second: AuCode, secondDark: true, url: auUrl, secondUrl: "send-reminders" }),
];
