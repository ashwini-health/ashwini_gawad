import React from "react";

const WHATSAPP_URL =
  "https://wa.me/919769761766?text=Hi%20Dt.%20Ashwini%2C%20I%20am%20an%20NRI%20and%20would%20like%20to%20apply%20for%20a%20Clinical%20Assessment%20Call%20regarding%20my%20parents%27%20health.";

export default function ContactPage() {
  return (
    <div className="bg-midnight-950 px-4 py-20 md:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12">
          <p className="mb-3 text-xs font-heading font-semibold uppercase tracking-[0.3em] text-gold-400">
            Contact
          </p>
          <h1 className="mb-4 font-display text-3xl font-semibold text-white md:text-4xl">
            Let&apos;s connect
          </h1>
          <p className="max-w-3xl text-base text-slate-400">
            Choose whichever option is easiest for you or your family to start
            the conversation.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="glass-card-elevated space-y-6 p-8">
            <h2 className="font-heading text-base font-semibold text-white">Direct contact</h2>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-gold-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </span>
                <div>
                  <p className="text-slate-500">Phone</p>
                  <a href="tel:+919769761766" className="font-semibold text-gold-300 hover:text-gold-200 transition-colors">
                    +91-976-976-1766
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-teal-400">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  </svg>
                </span>
                <div>
                  <p className="text-slate-500">WhatsApp</p>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-300 hover:text-teal-200 transition-colors">
                    Message now
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                <div>
                  <p className="text-slate-500">Email</p>
                  <a href="mailto:ashwini.gawad@gmail.com" className="font-semibold text-slate-300 hover:text-slate-100 transition-colors">
                    ashwini.gawad@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </span>
                <div>
                  <p className="text-slate-500">Location</p>
                  <p className="text-slate-300">Charitable Trust Hospital OPD, Borivali (E), Mumbai</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="glass-card space-y-4 p-8">
            <h2 className="font-heading text-base font-semibold text-white">When you reach out</h2>
            <p className="text-sm text-slate-400">Share briefly:</p>
            <ul className="space-y-2 text-sm text-slate-300">
              {[
                "Your name and age",
                "Your parents' city",
                "Main health concern (1–2 lines)",
                "Preference: in-person or online consult",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-500 pt-2">
              You will usually receive a response within 24&ndash;48 hours on working
              days with available slots and next steps.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 py-3.5 font-heading font-semibold text-midnight-950 transition-all hover:shadow-lg"
            >
              Start on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
