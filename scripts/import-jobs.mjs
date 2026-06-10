// One-time import script for Whit's job applications.
// Run in Railway shell: node /app/scripts/import-jobs.mjs <your-email>
import { PrismaClient } from "@prisma/client";

const USER_EMAIL = process.argv[2];
if (!USER_EMAIL) {
  console.error("Usage: node scripts/import-jobs.mjs <email>");
  process.exit(1);
}

const prisma = new PrismaClient();

const JOBS = [
  { company: "Apple", companyValue: "apple", jobTitle: "SWE Intern", jobTitleValue: "swe-intern", appliedDate: "2025-06-01", status: "archived", source: "other", description: "SWE Intern role at Apple.", jobType: "Internship" },
  { company: "Ask Arthur", companyValue: "ask-arthur", jobTitle: "SWE Intern", jobTitleValue: "swe-intern", appliedDate: "2026-04-17", status: "applied", source: "handshake", description: "Work with founders (ex-Stripe + serial founder) on Django models/APIs for menu management, ordering, payments. Menu data ingestion/normalization, agent function behavior, admin dashboard, real-time order ingestion to POS. $1-2K/mo, 20 hrs/week, March-August 2026. Remote or NYC/Toronto.", jobType: "Internship" },
  { company: "Atomic Invest", companyValue: "atomic-invest", jobTitle: "AI Automation Engineer", jobTitleValue: "ai-automation-engineer", appliedDate: "2026-05-22", status: "applied", source: "other", description: "AI Automation Engineer at Atomic Invest.", jobType: "Full-time" },
  { company: "Atomic Invest", companyValue: "atomic-invest", jobTitle: "Software Engineer Backend", jobTitleValue: "software-engineer-backend", appliedDate: "2026-05-22", status: "applied", source: "other", description: "Software Engineer Backend at Atomic Invest.", jobType: "Full-time" },
  { company: "Be All You", companyValue: "be-all-you", jobTitle: "Full Stack Engineer", jobTitleValue: "full-stack-engineer", appliedDate: "2026-05-30", status: "applied", source: "handshake", description: "Full Stack Engineer at Be All You.", jobType: "Full-time" },
  { company: "CareYaya", companyValue: "caretaya", jobTitle: "SWE Intern", jobTitleValue: "swe-internship", appliedDate: "2026-05-16", status: "rejected", source: "handshake", description: "SWE Internship at CareYaya.", jobType: "Internship" },
  { company: "CEO Foundry LLC", companyValue: "ceo-foundry", jobTitle: "Java Developer", jobTitleValue: "java-developer", appliedDate: "2026-05-23", status: "applied", source: "handshake", description: "Java Developer at CEO Foundry LLC.", jobType: "Full-time" },
  { company: "Chase Sanctuary", companyValue: "chase-sanctuary", jobTitle: "Web Designer Intern", jobTitleValue: "web-designer-intern", appliedDate: "2026-04-01", status: "applied", source: "handshake", description: "Web Designer Intern at Chase Sanctuary and Wildlife Conservancy.", jobType: "Internship" },
  { company: "Clean Community Inc", companyValue: "clean-community", jobTitle: "Software Developer Intern", jobTitleValue: "software-developer-intern", appliedDate: "2026-04-17", status: "applied", source: "handshake", description: "Software Developer Intern at Clean Community Inc.", jobType: "Internship" },
  { company: "Cloudflare", companyValue: "cloudflare", jobTitle: "Software Engineer", jobTitleValue: "software-engineer-cloudflare", appliedDate: "2025-11-18", status: "archived", source: "handshake", description: "Software Engineer at Cloudflare.", jobType: "Full-time" },
  { company: "Clozure Inc", companyValue: "clozure", jobTitle: "Junior Dev Intern", jobTitleValue: "junior-dev-intern", appliedDate: "2026-03-18", status: "applied", source: "handshake", description: "Full-time (May 18-Aug 31), remote or Austin TX. Flutter/Firebase mobile+web apps, Python/Odoo automation, UI/UX, code reviews, standups. Equity + small stipend. Reports to Zeke Lara (CTO).", jobType: "Internship" },
  { company: "Colligo: The Collectors App", companyValue: "colligo", jobTitle: "Full Stack Intern", jobTitleValue: "full-stack-intern", appliedDate: "2026-05-05", status: "applied", source: "handshake", description: "Full Stack Intern at Colligo.", jobType: "Internship" },
  { company: "Compose", companyValue: "compose", jobTitle: "Backend Developer", jobTitleValue: "backend-developer", appliedDate: "2025-10-14", status: "archived", source: "handshake", description: "Part-time Backend Developer at Compose.", jobType: "Full-time" },
  { company: "DAAP FP", companyValue: "daap-fp", jobTitle: "Founding SWE", jobTitleValue: "founding-swe", appliedDate: "2026-05-05", status: "applied", source: "handshake", description: "Founding SWE at DAAP FP.", jobType: "Full-time" },
  { company: "eMetric", companyValue: "emetric", jobTitle: "Software Engineer", jobTitleValue: "software-engineer", appliedDate: "2026-05-05", status: "applied", source: "handshake", description: "Hybrid San Antonio. C#/ASP.NET/SQL Server + Node.js backend, Docker/Kubernetes, Azure, GitHub Actions CI/CD, microservices/DDD. High-stakes K-12 assessments platform.", jobType: "Full-time" },
  { company: "Favor", companyValue: "favor", jobTitle: "SWE Intern", jobTitleValue: "swe-intern-favor", appliedDate: "2025-06-01", status: "rejected", source: "other", description: "SWE Intern at Favor.", jobType: "Internship" },
  { company: "Gingr (Togetherwork)", companyValue: "gingr", jobTitle: "AI Engineering Intern", jobTitleValue: "ai-engineering-intern", appliedDate: "2026-01-01", status: "rejected", source: "other", description: "AI Engineering Intern at Gingr.", jobType: "Internship" },
  { company: "GitHub", companyValue: "github", jobTitle: "Software Engineer", jobTitleValue: "software-engineer-github", appliedDate: "2025-06-01", status: "rejected", source: "other", description: "Software Engineer at GitHub.", jobType: "Full-time" },
  { company: "GitHub", companyValue: "github", jobTitle: "SWE Intern", jobTitleValue: "swe-intern-github", appliedDate: "2025-06-01", status: "rejected", source: "other", description: "SWE Intern at GitHub.", jobType: "Internship" },
  { company: "GoAccess", companyValue: "goaccess", jobTitle: "Software Engineer", jobTitleValue: "software-engineer-goaccess", appliedDate: "2026-05-16", status: "applied", source: "handshake", description: "Software Engineer at GoAccess.", jobType: "Full-time" },
  { company: "Google", companyValue: "google", jobTitle: "SWE Intern", jobTitleValue: "swe-intern-google", appliedDate: "2025-06-01", status: "archived", source: "other", description: "SWE Intern at Google.", jobType: "Internship" },
  { company: "Gyfr", companyValue: "gyfr", jobTitle: "SWE Intern", jobTitleValue: "swe-intern-gyfr", appliedDate: "2025-09-01", status: "archived", source: "other", description: "SWE Intern at Gyfr.", jobType: "Internship" },
  { company: "H-E-B", companyValue: "heb", jobTitle: "Data Engineer Intern", jobTitleValue: "data-engineer-intern", appliedDate: "2025-06-01", status: "rejected", source: "other", description: "Data Engineer Intern at H-E-B.", jobType: "Internship" },
  { company: "H-E-B", companyValue: "heb", jobTitle: "Software Engineer I", jobTitleValue: "software-engineer-i-heb-2025a", appliedDate: "2025-06-01", status: "rejected", source: "other", description: "Software Engineer I at H-E-B (June 2025).", jobType: "Full-time" },
  { company: "H-E-B", companyValue: "heb", jobTitle: "Software Engineer I", jobTitleValue: "software-engineer-i-heb-2026", appliedDate: "2026-05-10", status: "rejected", source: "other", description: "Software Engineer I at H-E-B (May 2026).", jobType: "Full-time" },
  { company: "H-E-B", companyValue: "heb", jobTitle: "Software Engineer I (Backend/Java)", jobTitleValue: "software-engineer-i-backend-java", appliedDate: "2026-05-24", status: "rejected", source: "other", description: "Software Engineer I (Backend/Java) at H-E-B.", jobType: "Full-time" },
  { company: "H-E-B", companyValue: "heb", jobTitle: "Software Engineer II - API Gateway", jobTitleValue: "software-engineer-ii-api-gateway", appliedDate: "2025-07-01", status: "rejected", source: "other", description: "Software Engineer II - API Gateway at H-E-B.", jobType: "Full-time" },
  { company: "H-E-B", companyValue: "heb", jobTitle: "Software Engineer II - Java", jobTitleValue: "software-engineer-ii-java", appliedDate: "2025-06-01", status: "rejected", source: "other", description: "Software Engineer II - Java at H-E-B.", jobType: "Full-time" },
  { company: "H-E-B", companyValue: "heb", jobTitle: "Software Engineer II - Tibco", jobTitleValue: "software-engineer-ii-tibco", appliedDate: "2025-06-01", status: "rejected", source: "other", description: "Software Engineer II - Tibco at H-E-B.", jobType: "Full-time" },
  { company: "Hometown Nannies Plus", companyValue: "hometown-nannies-plus", jobTitle: "SWE Intern", jobTitleValue: "swe-intern-hometown", appliedDate: "2026-05-23", status: "applied", source: "handshake", description: "Software Engineering Intern at Hometown Nannies Plus.", jobType: "Internship" },
  { company: "Host Guest", companyValue: "host-guest", jobTitle: "Backend Developer", jobTitleValue: "backend-developer-hostguest", appliedDate: "2025-10-14", status: "archived", source: "handshake", description: "Backend Developer at Host Guest.", jobType: "Full-time" },
  { company: "InflatableOffice", companyValue: "inflatableoffice", jobTitle: "Web Developer", jobTitleValue: "web-developer", appliedDate: "2025-10-11", status: "archived", source: "handshake", description: "Web Developer at InflatableOffice.", jobType: "Full-time" },
  { company: "Intellilake Inc", companyValue: "intellilake", jobTitle: "SWE Intern", jobTitleValue: "swe-intern-intellilake", appliedDate: "2026-05-22", status: "applied", source: "handshake", description: "Software Engineering Intern at Intellilake Inc.", jobType: "Internship" },
  { company: "Kasulik II LLC", companyValue: "kasulik", jobTitle: "Frontend Developer", jobTitleValue: "frontend-developer", appliedDate: "2026-05-24", status: "archived", source: "other", description: "Frontend Developer at Kasulik II LLC.", jobType: "Full-time" },
  { company: "Law Business Research", companyValue: "law-business-research", jobTitle: "Frontend Developer", jobTitleValue: "frontend-dev-lbr", appliedDate: "2025-06-01", status: "archived", source: "other", description: "Frontend Developer at Law Business Research.", jobType: "Full-time" },
  { company: "Lawly", companyValue: "lawly", jobTitle: "Software Engineer", jobTitleValue: "software-engineer-lawly", appliedDate: "2026-05-23", status: "applied", source: "handshake", description: "Software Engineer at Lawly. Stack: Next.js, React, TypeScript, PostgreSQL.", jobType: "Full-time" },
  { company: "Levvate", companyValue: "levvate", jobTitle: "AI Automation Intern", jobTitleValue: "ai-automation-intern", appliedDate: "2026-04-22", status: "archived", source: "other", description: "Automate site assessments via Puppeteer/headless browser + LLM pipeline, build HubSpot-integrated onboarding. Completed live 60-min technical assessment. Email ultimately bounced - dead end.", jobType: "Internship" },
  { company: "maxRTE", companyValue: "maxrte", jobTitle: "Software Developer", jobTitleValue: "software-developer-maxrte", appliedDate: "2025-10-14", status: "archived", source: "handshake", description: "Software Developer at maxRTE.", jobType: "Full-time" },
  { company: "MBDM Group LLC", companyValue: "mbdm-group", jobTitle: "AI Automation Intern", jobTitleValue: "ai-automation-intern-mbdm", appliedDate: "2026-05-05", status: "applied", source: "handshake", description: "AI Automation Intern at MBDM Group LLC.", jobType: "Internship" },
  { company: "My Recommendation", companyValue: "my-recommendation", jobTitle: "App Developer Intern", jobTitleValue: "app-developer-intern", appliedDate: "2026-05-23", status: "applied", source: "handshake", description: "App Developer Intern at My Recommendation.", jobType: "Internship" },
  { company: "NJBSoft LLC", companyValue: "njbsoft", jobTitle: "Implementation Engineer Intern", jobTitleValue: "implementation-engineer-intern", appliedDate: "2026-04-17", status: "applied", source: "handshake", description: "Implementation Engineer Summer Intern at NJBSoft LLC.", jobType: "Internship" },
  { company: "NOVATANG PIONEER TECH", companyValue: "novatang", jobTitle: "Software Dev Engineer", jobTitleValue: "software-dev-engineer", appliedDate: "2026-05-24", status: "archived", source: "other", description: "Software Dev Engineer at NOVATANG PIONEER TECH LLC.", jobType: "Full-time" },
  { company: "Ody", companyValue: "ody", jobTitle: "Fullstack TypeScript Developer Intern", jobTitleValue: "fullstack-typescript-developer-intern", appliedDate: "2026-06-01", status: "applied", source: "handshake", description: "Full-time remote internship June-Aug 2026. Ody builds a business discovery + ops platform for restaurants/salons. Stack: TypeScript, React, Vite, Expo/React Native, Hono, Cloudflare Workers, Neon Postgres, Drizzle ORM.", jobType: "Internship" },
  { company: "PathOn AI", companyValue: "pathon-ai", jobTitle: "Software Engineering Intern", jobTitleValue: "software-engineering-internship", appliedDate: "2025-09-01", status: "rejected", source: "other", description: "Software Engineering Internship at PathOn AI.", jobType: "Internship" },
  { company: "Pear (Pear Care)", companyValue: "pear", jobTitle: "Backend Infrastructure Intern", jobTitleValue: "backend-infra-intern", appliedDate: "2026-05-01", status: "applied", source: "handshake", description: "Full-time 40 hrs/week, $4-6K/month. Build agentic backend/API design (event-driven, multi-agent orchestration, WebSockets), AWS infra (ECS, Lambda, RDS, API Gateway), clinical data pipelines (ICD-10, CPT, NDC).", jobType: "Internship" },
  { company: "Playmaker Baseball", companyValue: "playmaker-baseball", jobTitle: "Part-Time SWE", jobTitleValue: "part-time-swe", appliedDate: "2025-10-14", status: "archived", source: "handshake", description: "Part-Time Software Engineer at Playmaker Baseball.", jobType: "Part-time" },
  { company: "Rebel", companyValue: "rebel", jobTitle: "Founding SWE", jobTitleValue: "founding-swe-rebel", appliedDate: "2026-05-05", status: "applied", source: "handshake", description: "Founding SWE at Rebel.", jobType: "Full-time" },
  { company: "Reliable Residence", companyValue: "reliable-residence", jobTitle: "Junior Full Stack Developer", jobTitleValue: "junior-full-stack", appliedDate: "2026-04-25", status: "archived", source: "handshake", description: "15 hrs/week, own features end-to-end. Stack: React, Next.js, Tailwind, Node.js, Firebase, Vercel. Property listing/booking platform. Role was filled.", jobType: "Full-time" },
  { company: "Repackify", companyValue: "repackify", jobTitle: "Software Developer Intern", jobTitleValue: "software-developer-internship", appliedDate: "2026-05-29", status: "rejected", source: "other", description: "Software Developer Internship at Repackify.", jobType: "Internship" },
  { company: "Revamp Engineering Inc", companyValue: "revamp-engineering", jobTitle: "SWE Integration Intern", jobTitleValue: "swe-integration-intern", appliedDate: "2026-03-18", status: "applied", source: "handshake", description: "SWE Integration Intern at Revamp Engineering Inc.", jobType: "Internship" },
  { company: "Rubbl", companyValue: "rubbl", jobTitle: "SWE Intern", jobTitleValue: "swe-intern-rubbl", appliedDate: "2026-05-21", status: "applied", source: "handshake", description: "Software Engineering Intern at Rubbl.", jobType: "Internship" },
  { company: "ScriptChain", companyValue: "scriptchain", jobTitle: "Backend SWE Intern", jobTitleValue: "backend-swe-intern", appliedDate: "2025-11-01", status: "archived", source: "other", description: "Backend SWE Intern at ScriptChain.", jobType: "Internship" },
  { company: "SHI International", companyValue: "shi-international", jobTitle: "Junior SWE Intern", jobTitleValue: "jr-swe-intern", appliedDate: "2025-06-01", status: "archived", source: "other", description: "Junior SWE Intern at SHI International.", jobType: "Internship" },
  { company: "Signalor", companyValue: "signalor", jobTitle: "Web Scraping Engineer", jobTitleValue: "web-scraping-engineer", appliedDate: "2026-05-05", status: "applied", source: "handshake", description: "Part-time 10 hrs/week, remote, paid. Design/maintain scrapers for Reddit (PRAW), TikTok (Apify), YouTube API + headless browser automations (Playwright). Normalize/ingest to PostgreSQL + BullMQ pipelines.", jobType: "Full-time" },
  { company: "SMARTtag", companyValue: "smarttag", jobTitle: "Software Engineer", jobTitleValue: "software-engineer-smarttag", appliedDate: "2025-10-29", status: "archived", source: "handshake", description: "Software Engineer at SMARTtag.", jobType: "Full-time" },
  { company: "Sponsor a Pet", companyValue: "sponsor-a-pet", jobTitle: "SWE Intern", jobTitleValue: "swe-intern-sponsorapetf", appliedDate: "2025-11-01", status: "archived", source: "other", description: "SWE Intern at Sponsor a Pet.", jobType: "Internship" },
  { company: "SproutsAI", companyValue: "sprouts-ai", jobTitle: "Full Stack Intern", jobTitleValue: "full-stack-intern-sprouts", appliedDate: "2025-11-01", status: "archived", source: "other", description: "Full Stack Intern at SproutsAI.", jobType: "Internship" },
  { company: "St. James Episcopal Day School", companyValue: "st-james-episcopal", jobTitle: "Full Stack SWE", jobTitleValue: "full-stack-swe", appliedDate: "2026-05-29", status: "applied", source: "handshake", description: "Full Stack SWE at St. James Episcopal Day School.", jobType: "Full-time" },
  { company: "Statt Inc", companyValue: "statt-inc", jobTitle: "Software Engineer", jobTitleValue: "software-engineer-statt", appliedDate: "2025-11-07", status: "archived", source: "handshake", description: "Software Engineer at Statt Inc.", jobType: "Full-time" },
  { company: "Style.re", companyValue: "style-re", jobTitle: "SWE Intern Junior", jobTitleValue: "swe-intern-junior", appliedDate: "2026-05-28", status: "applied", source: "handshake", description: "Junior SWE Intern at Style.re.", jobType: "Internship" },
  { company: "TEX KING LLC", companyValue: "tex-king", jobTitle: "Junior Software Engineer", jobTitleValue: "junior-swe", appliedDate: "2026-01-01", status: "rejected", source: "other", description: "Junior Software Engineer at TEX KING LLC.", jobType: "Full-time" },
  { company: "Top Tutors for Us", companyValue: "top-tutors-for-us", jobTitle: "Software Developer", jobTitleValue: "software-developer-ttu", appliedDate: "2026-05-05", status: "applied", source: "handshake", description: "Software Developer at Top Tutors for Us.", jobType: "Full-time" },
  { company: "TRS of Texas", companyValue: "trs-of-texas", jobTitle: "DevOps Engineer Intern", jobTitleValue: "devops-engineer-intern", appliedDate: "2025-11-18", status: "rejected", source: "handshake", description: "DevOps Engineer Intern at TRS of Texas.", jobType: "Internship" },
  { company: "TRS of Texas", companyValue: "trs-of-texas", jobTitle: "Software Engineer", jobTitleValue: "software-engineer-trs", appliedDate: "2025-11-18", status: "rejected", source: "handshake", description: "Software Engineer at TRS of Texas.", jobType: "Full-time" },
  { company: "TX Comptroller", companyValue: "tx-comptroller", jobTitle: "App Dev Intern", jobTitleValue: "app-dev-intern", appliedDate: "2026-03-18", status: "rejected", source: "handshake", description: "Applications Dev Summer Intern at TX Comptroller.", jobType: "Internship" },
  { company: "UFCU", companyValue: "ufcu", jobTitle: "Application Developer Intern", jobTitleValue: "app-developer-intern-ufcu", appliedDate: "2026-04-01", status: "applied", source: "handshake", description: "Application Developer Intern at UFCU.", jobType: "Internship" },
  { company: "Unconventional Code", companyValue: "unconventional-code", jobTitle: "SWE Intern", jobTitleValue: "swe-intern-uc", appliedDate: "2026-04-22", status: "applied", source: "handshake", description: "Analyze web/mobile app network traffic, identify requests, write Python validation code and pytest tests. Proxy tool + AI tools (Claude, Cursor). 10-40 hrs/week, $15-25/hr, 3 months.", jobType: "Internship" },
  { company: "VisioStack Inc", companyValue: "visiostack", jobTitle: "Frontend SWE", jobTitleValue: "frontend-swe", appliedDate: "2025-10-17", status: "archived", source: "handshake", description: "Frontend SWE at VisioStack Inc.", jobType: "Full-time" },
  { company: "Wave Dynamics", companyValue: "wave-dynamics", jobTitle: "Founding SWE", jobTitleValue: "founding-swe-wave", appliedDate: "2025-10-14", status: "rejected", source: "handshake", description: "Founding SWE at Wave Dynamics.", jobType: "Full-time" },
  { company: "Wired Works LLC", companyValue: "wired-works", jobTitle: "Software Engineer", jobTitleValue: "software-engineer-ww", appliedDate: "2026-01-01", status: "archived", source: "other", description: "Software Engineer at Wired Works LLC.", jobType: "Full-time" },
  { company: "Yard Farmin", companyValue: "yard-farmin", jobTitle: "Full Stack Developer", jobTitleValue: "full-stack-dev", appliedDate: "2026-05-01", status: "applied", source: "other", description: "Building two AI features: customer chatbot and AI garden design tool for yardfarmin.com. Non-technical founder. 10-15 hrs/week, paid, flexible. Mobile-first.", jobType: "Full-time" },
];

async function main() {
  const user = await prisma.user.findUnique({ where: { email: USER_EMAIL } });
  if (!user) {
    console.error(`No user found for ${USER_EMAIL}. Sign up in the app first.`);
    process.exit(1);
  }
  console.log(`Importing for user: ${user.name} (${user.id})`);

  // Ensure all job statuses exist
  const STATUS_VALUES = ["draft", "applied", "interview", "offer", "rejected", "expired", "archived"];
  for (const value of STATUS_VALUES) {
    const label = value.charAt(0).toUpperCase() + value.slice(1);
    await prisma.jobStatus.upsert({
      where: { value },
      update: {},
      create: { label, value },
    });
  }

  // Ensure Handshake source exists (not in default JOB_SOURCES)
  await prisma.jobSource.upsert({
    where: { value_createdBy: { value: "handshake", createdBy: user.id } },
    update: {},
    create: { label: "Handshake", value: "handshake", createdBy: user.id },
  });

  // Ensure a Remote location exists
  const remoteLocation = await prisma.location.upsert({
    where: { value_createdBy: { value: "remote", createdBy: user.id } },
    update: {},
    create: { label: "Remote", value: "remote", createdBy: user.id },
  });

  // Cache lookups
  const companyCache = new Map();
  const titleCache = new Map();

  let created = 0;
  let failed = 0;

  for (const job of JOBS) {
    try {
      // Upsert company
      if (!companyCache.has(job.companyValue)) {
        const company = await prisma.company.upsert({
          where: { value_createdBy: { value: job.companyValue, createdBy: user.id } },
          update: {},
          create: { label: job.company, value: job.companyValue, createdBy: user.id },
        });
        companyCache.set(job.companyValue, company.id);
      }

      // Upsert job title
      if (!titleCache.has(job.jobTitleValue)) {
        const title = await prisma.jobTitle.upsert({
          where: { value_createdBy: { value: job.jobTitleValue, createdBy: user.id } },
          update: {},
          create: { label: job.jobTitle, value: job.jobTitleValue, createdBy: user.id },
        });
        titleCache.set(job.jobTitleValue, title.id);
      }

      // Get source
      const source = await prisma.jobSource.findFirst({
        where: { value: job.source, createdBy: user.id },
      });

      // Get status
      const status = await prisma.jobStatus.findFirst({
        where: { value: job.status },
      });

      const appliedDate = new Date(job.appliedDate);

      await prisma.job.create({
        data: {
          userId: user.id,
          description: job.description,
          jobType: job.jobType,
          createdAt: appliedDate,
          applied: true,
          appliedDate,
          statusId: status.id,
          jobTitleId: titleCache.get(job.jobTitleValue),
          companyId: companyCache.get(job.companyValue),
          jobSourceId: source?.id ?? null,
          locationId: remoteLocation.id,
        },
      });

      console.log(`  ✓ ${job.company} — ${job.jobTitle} [${job.status}]`);
      created++;
    } catch (e) {
      console.error(`  ✗ ${job.company} — ${job.jobTitle}: ${e.message}`);
      failed++;
    }
  }

  console.log(`\nDone: ${created} created, ${failed} failed.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
