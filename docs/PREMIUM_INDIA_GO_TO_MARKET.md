# Premium India Nutrition Pilot — commercial and technical release plan

**Status: proposed pilot, not launched, not a verified revenue stream.**
**Owner:** Ashwini (clinical scope and delivery); Siddhant (technical/marketing operations).
**Date:** 10 November 2026.
**Price instruction:** minimum consumer programme fee ₹1,00,000. This deliberately differs from the earlier ₹1,500 assessment / ₹22,000 twelve-week experiment. Do not silently combine their funnel metrics.

## 1. Evidence and existing website audit
- The public repo has a Next.js 16 site at \`ashwini-health/ashwini_gawad\`; prior deployment reference is \`https://ashwini-gawad.vercel.app\`, not verified live during this work.
- Current homepage aims at NRI children and says Ashwini manages parents' nutrition, coordinates doctors and trains cooks. Current \`/services\` lists a ₹45k–₹65k NRI parental protocol. Neither is the proposed India-first ≥₹1L offering.
- Current \`/book-consultation\` starts with detailed medical intake about **parents**, including medications. That is too much sensitive information to demand of an early-stage India premium prospect.
- Homepage markets \`1000+ clinical cases\`, \`90%+ programme completion\`, \`25+ cities served\`, \`IDA Registered\`, and \`25+ years\`. These need documentary support, precise interpretation or removal before marketing. The résumé says IDA life member, which is not equivalent to statutory registration. Do not use unaudited outcome data or employer logos.
- A repo containing Supabase insertion logic proves that code exists, **not** that production has working database migrations, lead entries, analytics, or actual revenue.
- Existing operating documents list zero verified sales, an earlier low-ticket pilot and self-reported qualifications. Client volumes remain unverified.

## 2. Market evidence and pricing risk
Published offers checked on 10 November 2026 (public prices, not paid-volume evidence):
- Anupama Menon NutriElevate 6 months: ₹1,09,000 plus GST: https://anupamamenon.com/nutridiscover/
- Pragmatic Nutrition 24-week signature engagement: starts ₹1.25 lakh: https://www.pragmaticnutritionist.com/signature-nutrition-program
- Palak Nagpal integrated provider model: ₹99,000 for one month, ₹2,85,000 for three months: https://www.palaknagpal.com/subscribe/
- Shweta Shah Panchal team options have published offers over ₹1 lakh: https://thediettherapy.com/programs/
These establish that such prices are **advertised**, not that any untested new brand has the trust, delivery capacity or sales funnel to achieve them. The ₹5–10 lakh single-person nutrition idea is unproven; multi-person high-touch household advisory is a testable alternative.

## 3. Buyer hypothesis (to validate)
Primary test: high-income Mumbai households and India-based busy executives who want founder-led longer-term food planning, nutrition oversight and practical household implementation rather than a one-time chart. A second test can include family buyers managing everyday meal routines for multiple consenting adults. Do not infer these people have disease conditions or ability to pay without evidence.
Price is one filter, **not** proof of product-market fit.

## 4. Draft offer architecture: NOT CONTRACTED OR FULLY APPROVED
All programme details below are **product-design hypotheses**, not descriptions of services currently available. No advertising until Ashwini confirms clinical suitability, personal capacity, professional authorisation, operational costs, and legal disclosures.

| Intended offer | Price hypothesis | Plausible scope | Stage |
|---|---:|---|---|
| Individual private nutrition advisory | ₹1,00,000 / 6 months | One adult; comprehensive nutrition intake after consent; personalised Indian-food planning; scheduled reviews; bounded check-ins; progress summary; defined response hours | First test; publish price only after review |
| Family household nutrition advisory | ₹5,00,000 / 12 months | Up to four consenting adults; multiple personalised plans; shared household meal framework; scheduled reviews; potential cook training in Mumbai after assessing travel/operational feasibility | Private proposals only; do not promote before capacity proof |
| White-glove household nutrition coordination | ₹10,00,000 / 12 months | Custom family scope with higher contact intensity, meal-implementation coordination, household reporting, possible cook/trainer liaison where lawful and contracted | Research and validation only, not a live offer |

Clinical consultation, medication changes, diagnostics, dietetic acts outside competence, emergency care, third-party physician services and laboratory costs are never silently included. No disease cure or guaranteed outcome claims. Avoid 'unlimited access'. Written contracts must detail included members, sessions, changes, remote/in-person boundaries, response times, travel, subcontractors, cancellation/refunds, taxes, data practices and liability.

## 5. Funnel
1. **Attract** using existing permitted contacts, founder's appropriate professional network, genuine referral relationships, local search and selective educational content.
2. **Pre-qualify** with the \`/private-nutrition\` page: show proposed ₹1L entry level and a short contact-only form. The current page has no CTA to it until reviewed. No sensitive medical details are collected.
3. **Contact** each genuine enquiry during stated business hours; manually review Supabase \`premium_enquiries\` at least twice per working day until notification automation exists.
4. **Fit call**: 15–20 minutes, no diagnosis or medical advice, confirm geography, desired support, number of participants, price expectation and decision-maker. Reject/route outside-scope cases.
5. **Proposal**: personalised written scope, verified practitioner identity, priced inclusions, consent, schedule and cancellation/refund. No low-cost plan is automatically offered as a workaround; founder can decline.
6. **Pay and onboard**: use a verified legal business payment process only after acceptance; confirm actual settlement; issue receipt/invoice; complete separate private clinical intake as appropriate.
7. **Deliver / renew**: track delivery effort, adherence, service quality, complaints, cancellations, renewals and referrals with genuine consent. Do not claim clinical outcomes without appropriate evidence.

## 6. Metrics that matter
Track by date and source:
- Qualified reach / permitted outreach invitations
- Unique landing page visits (requires analytics setup, not provided by current PR)
- Initial enquiry form submissions (server-side \`premium_enquiries\`)
- Valid / duplicate / disqualified enquiry counts
- First response time in business hours
- Fit calls booked and attended
- Written proposals sent and accepted
- Contracts signed, actual cash collected, refunds
- Cost per enquiry, cost per **paying** client, contribution profit and cost of delivery
- Founder time per active customer, satisfaction and referrals
- Source attribution (form stores UTM fields where present)
Do **not** claim visits, conversions or payments from code existence. Do not infer a return on ad spend from enquiries alone.

### Illustrative maths, not forecasts
At ₹1 lakh, 1 customer = ₹1 lakh gross contract value, before tax, delivery and acquisition expense.
At ₹5 lakh, 1 customer = ₹5 lakh gross contract value, but may require 5–10 times the labour, support and partners of an individual package.
At ₹10 lakh, 1 customer = ₹10 lakh gross contract value, but operational and liability exposure can dominate headline revenue.
For funnel stress tests use measured \`applications × fit rate × call show rate × proposal acceptance\`. No conversion percentages are assumed as true without experiments.

## 7. Distribution experiments with actual evidence
- Test 1: 20–30 permission-based introductions from relevant existing relationships. Ask for a fit discussion, not a rushed ₹1L checkout. Measure responses, fit calls, proposals and sales.
- Test 2: 5 independent referral conversations with suitable Mumbai clinics, health professionals or family-office-like trusted introducers, without patient-list access, paid referral kickbacks or false institutional endorsements.
- Test 3: 3 evidence-reviewed founder explanations of how intensive nutrition coordination works, each linked to a trackable landing page; measure qualified enquiries not views.
- Test 4: Source-based Google Search Console verification, current sitemap/canonical review, and local profile eligibility assessment (no fake office address). Organic ranking is not guaranteed by indexing.
Only test paid advertising after clear service fit, an operational booking/reply process and enough data to estimate acquisition cost.

## 8. Operational and compliance blockers before any public launch
- Confirm actual legal seller, permission to undertake independent service, credentials, IDA title wording, and supported claims.
- Remove or document homepage claims about outcome statistics, caseload and professional registration; inventory the other pages for unsupported claims.
- Correct conflicts between existing NRI-parent pages and the new India premium offer; either clearly segment customers or retire the unrelated funnel after owner approval.
- Finalise data controller identity, providers, retention/deletion processes and data notice with India-qualified advice. Current \`/privacy\` is a flagged draft.
- Add persistent rate limiting / anti-abuse control in addition to honeypot for open forms; protect credentials and configure RLS in the correct production Supabase.
- Apply migration \`004_premium_enquiries.sql\` and verify server-side Supabase project/environment variables.
- Implement a reliable lead notification and daily review process, test form success/error paths, deduplication, privacy request handling and contact opt-out.
- Instrument consent-aware visits and CTA/call/WhatsApp events, and connect Search Console with verified canonical domain and sitemap.
- Validate exact offer, taxes/GST treatment, refund terms, invoicing and payment mechanism with CA/legal reviewer before taking funds.
- Confirm all claims used in testimonials/case examples are genuine, permissioned and appropriately substantiated.
- **Do not remove \`robots: noindex\` or merge/deploy this draft until all gates pass.**

## 9. 30/60/90 execution roadmap
### Days 0–30: evidence and first proposals
Ashwini: validate one high-touch scope and delivery capacity, supply authentic qualifications, choose actual available fit-call slots, participate in 10–15 buyer conversations, prepare written pilot scope.
Siddhant: finish secure form, product page, CRM notification/backup, analytics, Search Console and attribution, refresh public claims and approved legal copy; do not buy ads yet.
Decision gate: actual fit conversations and credible interest in written ₹1L proposals, not merely positive comments.

### Days 31–60: deliver or revise
If a contract is signed, deliver against recorded service scope and founder-hour budget; assess why applicants bought/declined, revise value proposition and qualification. Run one additional source-of-truth acquisition test. If zero serious proposals, diagnose buyer niche and value before lowering prices.

### Days 61–90: scale only if economics permit
Check acquisition cost vs contract contribution, owner capacity, refunds/complaints and ability to repeat. Only then increase paid outreach or consider the family offer. ₹5L and ₹10L models require written partner/capacity and liability analysis. Do not build a mobile app as an acquisition substitute.

## 10. Website PR contents and acceptance tests
- New \`/private-nutrition\` route with an explicitly **proposed** ₹1,00,000 individual starting fee.
- Minimal consent-based form; no medical data; plain-language fit process.
- Server-side Zod validation; restricted Supabase \`premium_enquiries\` table with referral attribution and status.
- Privacy notice **draft** and noindex/no-follow pre-release.
- Duplicate submission guard and bot honeypot.
- Missing launch requirements: production database migration, policy review, notification, abuse protection, visit/click analytics, live QA and offer contracts.

**Minimum test:** valid entry persists, invalid rejects, email preference requires email, spam honeypot does not store, duplicate phone within 1 hour is not duplicated, no data leak through anonymous reads, env missing produces graceful error, mobile layout and a11y work.
