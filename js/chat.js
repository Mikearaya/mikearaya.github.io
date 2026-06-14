(function () {
  'use strict';

  var qa = [
    { k: ['hi', 'hello', 'hey', 'greet', 'howdy'], a: "Hey there! I'm Mikael's portfolio assistant. Ask me about his skills, projects, experience, or how to get in touch!", s: ['What does Mikael do?', 'What are his skills?', 'How can I hire him?'] },
    { k: ['who', 'about', 'introduce', 'mikael', 'mikeal', 'yourself'], a: "Mikael Araya is a freelance full-stack software engineer based in Addis Ababa, Ethiopia with 8+ years of experience. He's ranked #42 top committer in Ethiopia, a core contributor to Unchained Engine and Product Owner of its Admin UI. He's mentored 160+ students at Springboard.", s: ['What is Unchained Engine?', 'Tell me about his projects', 'What are his skills?'] },
    { k: ['skill', 'tech', 'stack', 'technolog', 'language', 'framework', 'proficien'], a: "Mikael's stack spans the full spectrum: React, Next.js, Angular, TypeScript, Tailwind CSS, Zustand, Radix UI on the frontend; Node.js, Fastify, GraphQL Yoga, MongoDB, PostgreSQL, Redis, Keycloak on the backend; Stripe, PayPal, Datatrans for payments; Cypress, Playwright, Vitest, Jest for testing; Docker, Jenkins, OpenTelemetry, Sentry for DevOps; plus Claude Agent SDK, MCP servers, Solidity/Ethereum, React Native, and ERP integrations (Navision, Selectline, Solr).", s: ['Tell me about his projects', 'Does he do blockchain?', 'What about AI tools?'] },
    { k: ['frontend', 'front-end', 'front end', 'react', 'next', 'angular', 'tailwind', 'zustand', 'radix'], a: "On the frontend, Mikael specializes in React, Next.js (App Router), Angular, and TypeScript. He uses Tailwind CSS, Zustand, Radix UI, Headless UI, Tiptap editor, and Lucide icons. He builds production storefronts with Apollo Client, GraphQL codegen, i18n (next-intl/react-intl), react-hook-form, and comprehensive Playwright/Cypress E2E testing.", s: ['What about backend?', 'Tell me about his projects'] },
    { k: ['backend', 'back-end', 'back end', 'node', 'server', 'api', 'fastify', 'redis', 'keycloak'], a: "Mikael's backend stack includes Node.js (ESM), GraphQL Yoga with Envelop plugins, MongoDB, PostgreSQL, Redis, Fastify, Drizzle ORM, and ASP.NET Core/C#. He handles auth with Keycloak/OAuth2, ERP connectors (Navision, Selectline, Crossbase PIM), payments (Stripe, PayPal, Datatrans), image processing (Sharp), PDF generation (React PDF), and full OpenTelemetry + Sentry + Pyroscope observability.", s: ['What about frontend?', 'Tell me about Unchained Engine'] },
    { k: ['unchained', 'engine', 'open source', 'oss'], a: "Unchained Engine is a high-performance headless Node.js e-commerce framework with 199+ stars on GitHub and 30+ packages. Mikael is a core contributor with 6,400+ commits and the Product Owner of the Admin UI — a Next.js control panel used by all Unchained clients.", s: ['What projects use Unchained?', 'What is the Admin UI?', 'View on GitHub'] },
    { k: ['admin', 'ui', 'control panel', 'dashboard', 'product owner'], a: "Mikael is the Product Owner of the Unchained Admin UI — a Next.js control panel featuring real-time analytics, inventory management with stock alerts, automated order workflows, bulk product editing with multi-language support, and a Cypress E2E test suite with 20+ spec files.", s: ['What is Unchained Engine?', 'Tell me about his projects'] },
    { k: ['project', 'portfolio', 'work', 'built', 'client'], a: "Key projects include: Publicare (medical e-commerce), Gastro Zurich (2,500+ members), Lorem GmbH (20,000+ articles), NFT Marketplace (55 stars), Theater im Hof (ticketing), Weng Contemporary (art), 1-2-eat (mobile), COVID Telegram Bot, Rent Manager, Safeway App (migrant support), and enterprise ERP modules.", s: ['Tell me about Publicare', 'Tell me about Gastro Zurich', 'What about the Safeway App?'] },
    { k: ['publicare', 'medical'], a: "Publicare is Switzerland's largest medical aids supplier. Mikael built their multi-service e-commerce platform with Next.js, GraphQL, Keycloak SSO, AI product classification, Microsoft Navision & Crossbase PIM integration, and Playwright E2E tests. Handles 1,000+ requests/minute.", s: ['Tell me about other projects', 'What are his skills?'] },
    { k: ['gastro', 'zurich', 'zürich'], a: "Gastro Zurich is Zurich's largest gastronomy association with 2,500+ members. Mikael built their member self-service portal with Next.js, Apollo, event ticketing with QR codes, Google Maps integration, CRM sync, and Playwright E2E testing.", s: ['Tell me about other projects', 'What about Publicare?'] },
    { k: ['lorem', 'paper'], a: "Lorem GmbH is a Swiss technical paper sales specialist. Mikael built their B2B portal with Next.js, Apollo, bundle pricing with surcharges, Selectline ERP connector, and Solr-powered search across 20,000+ articles.", s: ['Tell me about other projects'] },
    { k: ['nft', 'marketplace', 'web3'], a: "Mikael built an on-demand NFT minting platform for artists and galleries with 55 GitHub stars. It features just-in-time minting on purchase, powered by Unchained Engine, Next.js, and Alchemy-based smart contract monitoring.", s: ['Does he do blockchain?', 'Tell me about other projects'] },
    { k: ['theater', 'ticket', 'event'], a: "Theater im Hof is a white-label ticket shop Mikael built with Apple & Google Wallet integration, QR-code validation, label printer connection, and entry control — with 0% transaction fees.", s: ['Tell me about other projects'] },
    { k: ['blockchain', 'ethereum', 'solidity', 'smart contract', 'dapp', 'web3', 'crypto'], a: "Mikael is a certified Ethereum blockchain developer (ConsenSys Academy). He's built NFT marketplaces, an Event Ticketing DApp (19 stars), and has experience with Solidity, Web3, and Hyperledger Fabric.", s: ['Tell me about the NFT Marketplace', 'What are his other skills?'] },
    { k: ['covid', 'telegram', 'bot', 'ruby'], a: "Mikael built a COVID-19 Telegram Bot in Ruby that delivers real-time pandemic statistics by country via simple chat commands. Built during the 2020 pandemic to provide quick access to case counts, recoveries, and death stats.", s: ['Tell me about other projects', 'What are his skills?'] },
    { k: ['rent', 'rental', 'property', 'tenant', 'lease'], a: "Mikael built a Rent Manager application — a property rental management system for tracking tenants, lease agreements, payments, and property portfolios. Built with Angular and TypeScript.", s: ['Tell me about other projects', 'What about ERP?'] },
    { k: ['safeway', 'migrant', 'hybrid', 'humanitarian', 'social impact'], a: "Mikael built the Safeway Hybrid App — a mobile application providing essential information to Ethiopian migrants in the Middle East, including safety guidelines, legal rights, embassy contacts, and emergency support. It has 4 stars on GitHub.", s: ['Tell me about other projects', 'What are his skills?'] },
    { k: ['erp', 'enterprise', 'accounting', 'inventory', 'crm', 'bionic'], a: "At Bionic System Solutions, Mikael designed modular ERP solutions including Inventory Management, CRM, Production Management (MRP), Procurement, and Accounting — using Angular, ASP.NET Core, C#, and MySQL. His Accounting module has 10 stars on GitHub.", s: ['What are his skills?', 'Tell me about his experience'] },
    { k: ['experience', 'career', 'job', 'history', 'worked'], a: "Mikael's career: Unchained Commerce (2019–present, core contributor & product owner), Springboard (2020–present, 160+ students mentored), Bionic System Solutions (2019–present, freelance ERP), AppDiv (2017–2019, enterprise apps), and Idopz Trading (2016–2017, web dev).", s: ['Tell me about Unchained', 'What about mentoring?', 'What are his skills?'] },
    { k: ['mentor', 'springboard', 'teach', 'student', 'coach', 'tutor'], a: "Since 2020, Mikael has mentored 160+ students through Springboard's Software Engineering bootcamp. He provides 1-on-1 guidance on full-stack development, code reviews, project architecture, and career development.", s: ['What does Mikael do?', 'How can I hire him?'] },
    { k: ['education', 'degree', 'university', 'school', 'study', 'certif'], a: "Mikael holds a Bachelor's in Computer Science from Unity University (GPA 3.4) and a Blockchain Developer Certificate from ConsenSys Academy (2019).", s: ['What are his skills?', 'Tell me about his experience'] },
    { k: ['contact', 'email', 'phone', 'reach', 'touch', 'hire', 'freelan', 'available', 'work with', 'telegram'], a: "You can reach Mikael at mikaelaraya12@gmail.com or on Telegram @starboy_12. He's based in Addis Ababa, Ethiopia and available for freelance projects. Use the contact form on this page or connect on LinkedIn!", s: ['What services does he offer?', 'Where is he located?'] },
    { k: ['location', 'where', 'based', 'country', 'city', 'timezone', 'remote'], a: "Mikael is based in Addis Ababa, Ethiopia (UTC+3). He works remotely with clients across Europe and worldwide — most of his projects are with Swiss companies.", s: ['How can I contact him?', 'What services does he offer?'] },
    { k: ['service', 'offer', 'what do you do', 'can you', 'provide'], a: "Mikael offers: E-Commerce Development (Unchained Engine, custom storefronts), Full-Stack Development (React, Next.js, Node.js), Enterprise Solutions (ERP modules), Blockchain/DApp Development, Technical Consulting, and Software Engineering Mentorship.", s: ['How can I hire him?', 'Tell me about his projects'] },
    { k: ['ai', 'agent', 'claude', 'mcp', 'llm', 'artificial intelligence', 'machine learning'], a: "Mikael builds AI-powered tools: autonomous agents using Claude Agent SDK for enterprise workflows, an MCP server for Unchained Engine that exposes e-commerce operations to AI assistants, a Solr MCP server for intelligent search, and AI pipelines for automated product classification. He also integrated AI tooling into the Unchained Admin UI.", s: ['What are his skills?', 'Tell me about his projects'] },
    { k: ['github', 'repo', 'repository', 'contribution', 'commit', 'code', 'rank', 'top', 'ethiopia'], a: "Mikael has 93 GitHub repositories, 6,400+ commits on Unchained Engine, is ranked #42 top committer in Ethiopia, an Arctic Code Vault Contributor, Pull Shark x3, and GitHub Developer Program Member. Check out github.com/Mikearaya!", s: ['What is Unchained Engine?', 'Tell me about his projects'] },
    { k: ['cv', 'resume', 'download', 'pdf'], a: "You can download Mikael's CV from the About section of this page — look for the 'Download CV' button, or visit the link in the hero section!", s: ['What are his skills?', 'How can I contact him?'] },
    { k: ['rate', 'price', 'cost', 'budget', 'charge', 'fee', 'how much'], a: "For pricing and project quotes, it's best to reach out directly. Use the contact form on this page or email mikaelaraya12@gmail.com with your project details!", s: ['What services does he offer?', 'How can I contact him?'] },
    { k: ['appDiv', 'appdiv', 'government'], a: "At AppDiv System Development (2017–2019), Mikael built a COC Student Registration system for the Ethiopian government, a full Accounting ERP module, and a hybrid mobile app for Ethiopian migrants using React Native.", s: ['Tell me about his experience', 'What are his skills?'] },
    { k: ['test', 'cypress', 'playwright', 'e2e', 'vitest', 'jest', 'quality'], a: "Mikael writes comprehensive test suites: Cypress E2E tests (20+ spec files for Admin UI), Playwright for storefronts (Publicare, Gastro Zurich), Vitest for unit tests, and Testing Library for component tests.", s: ['What are his skills?', 'Tell me about Admin UI'] },
    { k: ['docker', 'devops', 'ci', 'cd', 'jenkins', 'deploy', 'infrastructure'], a: "Mikael handles CI/CD with Jenkins pipelines, Docker-based deployments, and OpenTelemetry observability. He manages infrastructure for multiple Swiss e-commerce platforms with automated build, test, and deploy workflows.", s: ['What are his skills?', 'Tell me about his experience'] },
    { k: ['graphql', 'apollo', 'api'], a: "Mikael is deeply experienced with GraphQL — building APIs with GraphQL Yoga, Envelop plugins, persisted operations, response caching, and consuming them with Apollo Client. He's built GraphQL codegen pipelines and type-safe client integrations.", s: ['What about backend?', 'What about frontend?'] },
    { k: ['mobile', 'react native', 'app', 'android', 'ios'], a: "Mikael has built mobile apps with React Native, including a hybrid app for Ethiopian migrants and native Android tablet kiosk apps for the 1-2-eat food ordering platform.", s: ['Tell me about his projects', 'What are his skills?'] },
    { k: ['thank', 'thanks', 'bye', 'goodbye', 'see you'], a: "You're welcome! Feel free to reach out to Mikael anytime via the contact form or at mikaelaraya12@gmail.com. Have a great day!", s: [] },
    { k: ['fun', 'hobby', 'interest', 'free time', 'outside work'], a: "Outside of work, Mikael is passionate about open source, mentoring the next generation of engineers, and exploring emerging technologies like AI agents and blockchain.", s: ['What does Mikael do?', 'How can I contact him?'] }
  ];

  var fallbacks = [
    "I'm not sure about that, but you can ask Mikael directly! Try the contact form or email mikaelaraya12@gmail.com.",
    "That's a great question! I'd recommend reaching out to Mikael directly for specifics — use the contact form below.",
    "I don't have info on that, but here are some things I can help with: skills, projects, experience, services, or contact info!"
  ];

  function findAnswer(input) {
    var lower = input.toLowerCase().replace(/[^a-z0-9\s]/g, '');
    var words = lower.split(/\s+/);
    var best = null;
    var bestScore = 0;

    for (var i = 0; i < qa.length; i++) {
      var score = 0;
      for (var j = 0; j < qa[i].k.length; j++) {
        var keyword = qa[i].k[j];
        if (lower.indexOf(keyword) !== -1) {
          score += keyword.length;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        best = qa[i];
      }
    }

    if (best && bestScore >= 2) {
      return best;
    }
    return { a: fallbacks[Math.floor(Math.random() * fallbacks.length)], s: ['What does Mikael do?', 'What are his skills?', 'How can I hire him?'] };
  }

  function createWidget() {
    var widget = document.createElement('div');
    widget.id = 'chatWidget';
    widget.className = 'chat-widget';
    widget.innerHTML =
      '<button class="chat-widget__fab" id="chatFab" aria-label="Open chat">' +
        '<svg class="chat-widget__icon-chat" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>' +
        '<svg class="chat-widget__icon-close" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>' +
      '</button>' +
      '<div class="chat-widget__window" id="chatWindow">' +
        '<div class="chat-widget__header">' +
          '<div class="chat-widget__avatar">MA</div>' +
          '<div>' +
            '<div class="chat-widget__name">Mikael\'s Assistant</div>' +
            '<div class="chat-widget__status">Online</div>' +
          '</div>' +
        '</div>' +
        '<div class="chat-widget__messages" id="chatMessages"></div>' +
        '<div class="chat-widget__suggestions" id="chatSuggestions"></div>' +
        '<div class="chat-widget__input">' +
          '<input type="text" id="chatInput" placeholder="Ask me anything..." autocomplete="off" />' +
          '<button id="chatSend" aria-label="Send message">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(widget);

    var fab = document.getElementById('chatFab');
    var win = document.getElementById('chatWindow');
    var msgs = document.getElementById('chatMessages');
    var input = document.getElementById('chatInput');
    var sendBtn = document.getElementById('chatSend');
    var suggestionsEl = document.getElementById('chatSuggestions');
    var isOpen = false;

    fab.addEventListener('click', function () {
      isOpen = !isOpen;
      widget.classList.toggle('open', isOpen);
      if (isOpen) {
        if (msgs.children.length === 0) {
          addBot("Hi! I'm Mikael's portfolio assistant. Ask me about his skills, projects, experience, or anything else!", ['What does Mikael do?', 'What are his skills?', 'How can I hire him?']);
        }
        input.focus();
      }
    });

    function addUser(text) {
      var div = document.createElement('div');
      div.className = 'chat-msg chat-msg--user';
      div.innerHTML = '<div class="chat-msg__bubble">' + escapeHtml(text) + '</div>';
      msgs.appendChild(div);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function addBot(text, suggestions) {
      var typing = document.createElement('div');
      typing.className = 'chat-msg chat-msg--bot';
      typing.innerHTML = '<div class="chat-msg__bubble chat-msg__typing"><span></span><span></span><span></span></div>';
      msgs.appendChild(typing);
      msgs.scrollTop = msgs.scrollHeight;

      setTimeout(function () {
        typing.innerHTML = '<div class="chat-msg__bubble">' + escapeHtml(text) + '</div>';
        msgs.scrollTop = msgs.scrollHeight;
        showSuggestions(suggestions || []);
      }, 600 + Math.random() * 400);
    }

    function showSuggestions(items) {
      suggestionsEl.innerHTML = '';
      for (var i = 0; i < items.length; i++) {
        var btn = document.createElement('button');
        btn.className = 'chat-widget__suggestion';
        btn.textContent = items[i];
        btn.addEventListener('click', (function (text) {
          return function () { handleSend(text); };
        })(items[i]));
        suggestionsEl.appendChild(btn);
      }
    }

    function handleSend(text) {
      if (!text || !text.trim()) return;
      addUser(text.trim());
      input.value = '';
      suggestionsEl.innerHTML = '';
      var result = findAnswer(text.trim());
      addBot(result.a, result.s);
    }

    sendBtn.addEventListener('click', function () {
      handleSend(input.value);
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSend(input.value);
      }
    });

    function escapeHtml(str) {
      var div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget);
  } else {
    createWidget();
  }
})();
