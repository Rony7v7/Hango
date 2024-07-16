/* empty css                         */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from './astro/server_Bc31avQS.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from './Layout_CB96KpjB.mjs';

const $$Multiplayer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Multiplayer</h1> ` })}`;
}, "C:/Users/Usuario/Desktop/Rony/Hango/hango_client/src/pages/multiplayer.astro", void 0);

const $$file = "C:/Users/Usuario/Desktop/Rony/Hango/hango_client/src/pages/multiplayer.astro";
const $$url = "/multiplayer";

export { $$Multiplayer as default, $$file as file, $$url as url };
