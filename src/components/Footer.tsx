import Link from "next/link";

const WHATSAPP_URL =
  "https://wa.me/919769761766?text=Hi%20Dt.%20Ashwini%2C%20I%20am%20an%20NRI%20and%20would%20like%20to%20apply%20for%20a%20Clinical%20Assessment%20Call%20regarding%20my%20parents%27%20health.";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-midnight-950">
      <div className="container-wide px-4 py-16 md:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600">
                <span className="font-heading text-sm font-black text-midnight-950">AG</span>
              </div>
              <div>
                <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-400">
                  Dietitian
                </p>
                <p className="font-display text-base font-semibold text-white">
                  Ashwini Gawad
                </p>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              Clinical nutrition, realistic Indian meal plans and long-term
              lifestyle guidance for diabetes, heart health, PCOS and
              geriatric care.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-2 text-sm font-heading font-semibold text-gold-300 transition-all hover:bg-gold-500/20"
            >
              Book Clinical Call
            </a>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Navigate
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {[
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/how-it-works", label: "How It Works" },
                { href: "/success-stories", label: "Results" },
                { href: "/clinical-insights", label: "Clinical Insights" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-gold-300 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Specialisations
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Diabetes &amp; cardiac nutrition</li>
              <li>PCOS &amp; weight management</li>
              <li>Geriatric &amp; family meal planning</li>
              <li>Post-surgery diet counselling</li>
              <li>NRI concierge parental protocol</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Contact
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Mumbai, Maharashtra</li>
              <li>
                <a href="tel:+919769761766" className="hover:text-gold-300 transition-colors">
                  +91-976-976-1766
                </a>
              </li>
              <li>
                <a href="mailto:ashwini.gawad@gmail.com" className="hover:text-gold-300 transition-colors">
                  ashwini.gawad@gmail.com
                </a>
              </li>
              <li className="text-slate-500">
                Charitable Trust Hospital OPD, Borivali (E)
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/5 pt-8 text-xs text-slate-600 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Dietitian Ashwini Gawad. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
