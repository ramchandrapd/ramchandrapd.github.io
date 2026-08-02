/* ==========================================================================
   Fieldnotes — script.js
   Everything here is vanilla JavaScript, no build step required.

   Sections:
   1. Article data (the site's sample content — edit this to add your own)
   2. Small helpers
   3. Navigation (mobile menu + active link)
   4. Rendering article cards (home + articles page)
   5. Articles page: search + category filter
   6. Single article page: render content, prev/next
   7. Init — runs the right functions for whichever page is loaded
   ========================================================================== */

/* -----------------------------------------
   1. Article data
   In a real project this might come from a
   CMS or markdown files. Here it's a plain
   array so beginners can see the whole
   picture in one place.
----------------------------------------- */
const ARTICLES = [
  {
    id: 1,
    title: "Writing in Public: Why I Publish Unfinished Thoughts",
    excerpt:
      "Notes on treating a personal site less like a portfolio and more like a notebook other people can read.",
    category: "Writing",
    author: "J. Rivera",
    date: "2026-03-02",
    readTime: 6,
    image: "images/cover-01.svg",
    featured: true,
    content: [
      { type: "p", lead: true, text: "Most advice about publishing tells you to wait until an idea is finished. I've come to think that's backwards. The ideas worth writing about are usually the ones you haven't fully worked out yet — publishing early is what forces the working out to happen." },
      { type: "p", text: "This site exists mostly as a container for that habit. It isn't a portfolio in the traditional sense, and it isn't a diary either. It sits somewhere in between: a place to think out loud, in full sentences, with enough structure that a stranger could follow along." },
      { type: "h2", text: "The cost of waiting" },
      { type: "p", text: "Every piece I've delayed until it felt \"ready\" taught me less than the ones I shipped rough. Waiting doesn't sharpen an idea so much as it lets you avoid finding out whether the idea holds up at all." },
      { type: "blockquote", text: "A half-formed argument, published, gets corrected by reality. A half-formed argument, kept private, just gets forgotten." },
      { type: "p", text: "That correction is the whole point. Publishing is a feedback loop, and feedback loops only work if you close them." },
      { type: "h2", text: "What this looks like in practice" },
      { type: "ul", items: [
        "Short posts more often, rather than long posts rarely",
        "Dated entries, so old thinking is clearly marked as old",
        "No pressure to be comprehensive — a note can just be a note",
      ]},
      { type: "p", text: "None of this is a new idea. Plenty of writers have made the case for working in public. But it's one thing to read the argument and another to build a small, quiet space that makes the habit easy to keep." },
      { type: "code", lang: "text", code: "habit > inspiration\nsmall + often > big + rare" },
      { type: "p", text: "If you're building something similar, the technical part is the easy part. The habit is the hard part. Start there." },
    ],
  },
  {
    id: 2,
    title: "A Beginner's Case for Plain HTML",
    excerpt:
      "Before reaching for a framework, it's worth remembering how far three files and a text editor can take you.",
    category: "Technology",
    author: "J. Rivera",
    date: "2026-02-18",
    readTime: 5,
    image: "images/cover-02.svg",
    featured: false,
    content: [
      { type: "p", lead: true, text: "There's a particular kind of relief in opening a project that's just HTML, CSS, and JavaScript. No install step, no build pipeline, no dependency tree to audit before you can change a heading." },
      { type: "p", text: "That relief isn't nostalgia. It's the direct result of fewer moving parts. A static site made of three plain files will still open correctly in ten years, on whatever browser exists then, with zero maintenance." },
      { type: "h2", text: "When plain HTML is the right call" },
      { type: "p", text: "Not every project should skip frameworks. But a personal site, a documentation page, or a small publishing platform rarely needs client-side routing, a component tree, or a package manager." },
      { type: "ol", items: [
        "The content changes more often than the interactions do",
        "One person, or a small team, maintains it",
        "Load speed and longevity matter more than developer convenience",
      ]},
      { type: "blockquote", text: "The best tool is the one you can still read and fix a year from now without re-learning it." },
      { type: "h2", text: "What you give up" },
      { type: "p", text: "Honestly, not much, at this scale. You lose some conveniences — component reuse becomes copy-paste, state management becomes a few variables — but for a handful of pages, that's a fair trade for something that loads instantly and never breaks on an update." },
      { type: "p", text: "The three-page structure in this project is deliberately small: a home page, a listing page, and a single reusable template for individual articles. That's often all a publishing site needs." },
    ],
  },
  {
    id: 3,
    title: "Designing for Reading, Not Scrolling",
    excerpt:
      "A short argument for line length, whitespace, and restraint as the real tools of a reading-focused layout.",
    category: "Design",
    author: "J. Rivera",
    date: "2026-01-27",
    readTime: 4,
    image: "images/cover-03.svg",
    featured: false,
    content: [
      { type: "p", lead: true, text: "Most web design decisions are, quietly, decisions about attention. A page can be built to hold it or to fragment it, and the difference usually comes down to a handful of unglamorous choices." },
      { type: "h2", text: "Line length first" },
      { type: "p", text: "Text set much wider than about 70 characters becomes tiring to track line to line. It's one of the simplest fixes available, and one of the most commonly ignored." },
      { type: "h2", text: "Whitespace is not empty" },
      { type: "p", text: "Margins and spacing don't just look clean — they give the eye somewhere to rest between ideas. Cramming content edge to edge doesn't add information, it just adds friction." },
      { type: "blockquote", text: "Whitespace is the pause between sentences. Remove it and the reader can't tell where one thought ends and the next begins." },
      { type: "h2", text: "Restraint as a design choice" },
      { type: "p", text: "A reading-focused page usually needs fewer colors, fewer fonts, and fewer competing calls to action than instinct suggests. The goal isn't a blank page — it's a page where nothing competes with the words." },
    ],
  },
  {
    id: 4,
    title: "Slow Mornings and the Shape of a Working Day",
    excerpt:
      "How restructuring the first hour of the day changed the quality of everything that came after it.",
    category: "Life",
    author: "J. Rivera",
    date: "2026-01-09",
    readTime: 7,
    image: "images/cover-04.svg",
    featured: false,
    content: [
      { type: "p", lead: true, text: "For a long time my mornings started with a screen. Email first, then messages, then whatever tab I'd left open the night before. By the time I sat down to do the actual work, I'd already spent my best attention on other people's priorities." },
      { type: "p", text: "The fix wasn't complicated, just inconvenient: delay the screen. Coffee, a walk, sometimes just sitting still for ten minutes before opening anything." },
      { type: "h2", text: "What changed" },
      { type: "ul", items: [
        "Fewer reactive decisions before 9am",
        "A clearer sense of the day's actual priority, chosen instead of inherited",
        "Noticeably less afternoon fatigue",
      ]},
      { type: "p", text: "None of this is a productivity hack in the usual sense. It's closer to protecting a resource — attention — that gets spent whether or not you're deliberate about it." },
      { type: "blockquote", text: "You don't find focus in the middle of the day. You bring it with you from the morning, or you don't have it." },
      { type: "p", text: "I still check the same email eventually. It just isn't the first thing I do anymore, and that turned out to matter more than I expected." },
    ],
  },
  {
    id: 5,
    title: "Notes on Rereading Old Field Journals",
    excerpt:
      "What a decade of scattered notebooks taught me about the difference between recording and understanding.",
    category: "Culture",
    author: "J. Rivera",
    date: "2025-12-14",
    readTime: 6,
    image: "images/cover-05.svg",
    featured: false,
    content: [
      { type: "p", lead: true, text: "I recently went through ten years of notebooks looking for a single quote and ended up reading most of them cover to cover instead. It's a strange experience, meeting your own handwriting from a decade ago." },
      { type: "h2", text: "Recording versus understanding" },
      { type: "p", text: "A lot of the early entries are just records — what happened, who said what, what the weather was. Useful, but flat. The entries that still feel alive are the ones where I stopped to ask what something meant, not just what it was." },
      { type: "blockquote", text: "A record tells you what happened. A note tells you what you thought about what happened. Only one of those ages well." },
      { type: "h2", text: "What I'd tell my younger self" },
      { type: "ol", items: [
        "Write down the question, not just the observation",
        "Date everything — context decays faster than memory admits",
        "Leave yourself room to disagree with today's entry later",
      ]},
      { type: "p", text: "This site is, in a way, a public version of that same habit. Different audience, same instinct: write it down before you're sure what it means." },
    ],
  },
  {
    id: 6,
    title: "The Case for Fewer, Better Tools",
    excerpt:
      "On resisting the urge to add another app to the stack, and what happens when you subtract instead.",
    category: "Technology",
    author: "J. Rivera",
    date: "2025-11-30",
    readTime: 5,
    image: "images/cover-06.svg",
    featured: false,
    content: [
      { type: "p", lead: true, text: "Every tool you add to a workflow has to be maintained, remembered, and eventually replaced. That cost is easy to ignore when you're adopting the tool and very visible six months later when you're untangling it." },
      { type: "h2", text: "Subtraction as a habit" },
      { type: "p", text: "Once a quarter I try to remove one tool from my workflow rather than add one. Not because new tools are bad, but because the default direction is always addition, and something has to push back." },
      { type: "p", text: "Most of the time the tool I remove turns out to have been solving a problem I no longer have, or solving it worse than a plain text file and a habit would." },
      { type: "blockquote", text: "The simplest system you'll actually maintain beats the ideal system you'll abandon in a month." },
      { type: "h2", text: "Where this site fits in" },
      { type: "p", text: "Three HTML files, one stylesheet, one script. No dashboard to log into, nothing to update, nothing that can break because a dependency changed underneath it. That simplicity is a feature, not a placeholder for something more sophisticated later." },
    ],
  },
  {
    id: 7,
    title: "What a Good Blockquote Actually Does",
    excerpt:
      "A small typographic detail that changes how a page reads, and why it's worth getting right.",
    category: "Design",
    author: "J. Rivera",
    date: "2025-11-08",
    readTime: 3,
    image: "images/cover-07.svg",
    featured: false,
    content: [
      { type: "p", lead: true, text: "A blockquote is a pause button. It tells the reader: slow down, this line is doing more work than the sentences around it." },
      { type: "p", text: "That only works if the blockquote actually looks different — a distinct rule, a change in type, enough space around it that it reads as a deliberate stop rather than an accident of formatting." },
      { type: "blockquote", text: "If every paragraph is styled to feel important, none of them are." },
      { type: "p", text: "The instinct to over-style a page usually comes from wanting everything to stand out. The better instinct is to decide, in advance, which few things actually deserve to." },
    ],
  },
  {
    id: 8,
    title: "Building a Reading List That Survives Contact With Real Life",
    excerpt:
      "Most reading lists fail for the same predictable reasons. Here's a simpler system that's lasted.",
    category: "Life",
    author: "J. Rivera",
    date: "2025-10-22",
    readTime: 4,
    image: "images/cover-08.svg",
    featured: false,
    content: [
      { type: "p", lead: true, text: "My reading list used to be a graveyard — hundreds of links saved and never opened, sorted by good intentions rather than any realistic plan to read them." },
      { type: "h2", text: "The rule that fixed it" },
      { type: "p", text: "One in, one out. If I add a book or article to the list, something else has to leave — either read, or deliberately dropped." },
      { type: "ul", items: [
        "Forces an honest ranking instead of infinite accumulation",
        "Makes \"I'll get to it eventually\" a decision instead of a default",
        "Keeps the list short enough to actually look at",
      ]},
      { type: "p", text: "It's a small constraint, but small constraints tend to survive contact with a busy week better than ambitious systems do." },
    ],
  },
{
  id: 9,
  title: "Scientific Writing for Agricultural Research Scientists – Book Summary",
  excerpt: "A concise overview of Scientific Writing for Agricultural Research Scientists, highlighting the essential principles of planning, writing, and publishing high-quality scientific research.",
  category: "Book Summary",
  author: "Ramchandra Poudel",
  date: "2026-08-02",
  readTime: 10,
  image: "images/scientific-writing-cover.jpg",
  featured: false,
  content: [
    {
      type: "p",
      lead: true,
      text: "Clear scientific writing is just as important as good scientific research. A well-designed experiment has little impact if its findings are poorly communicated. Scientific Writing for Agricultural Research Scientists serves as a practical guide for students, researchers, and professionals who want to improve their scientific communication skills."
    },
    {
      type: "h2",
      text: "What this book covers"
    },
    {
      type: "p",
      text: "The manual introduces the complete scientific writing process, including planning research publications, organizing scientific manuscripts, writing clear introductions and discussions, presenting tables and figures effectively, referencing and citations, journal submission and peer review, and ethical issues in scientific publishing."
    },
    {
      type: "h2",
      text: "Why it matters"
    },
    {
      type: "p",
      text: "Scientific writing is more than following a format—it is about communicating ideas clearly, accurately, and honestly. This book emphasizes logical thinking, concise language, and proper organization, making it valuable for anyone involved in agricultural research."
    },
    {
      type: "h2",
      text: "Who should read it?"
    },
    {
      type: "ul",
      items: [
        "Undergraduate agriculture students",
        "Postgraduate researchers",
        "Early-career scientists",
        "Extension professionals",
        "Anyone interested in scientific publishing"
      ]
    },
    {
      type: "h2",
      text: "Key Takeaways"
    },
    {
      type: "ul",
      items: [
        "Good research deserves good writing.",
        "Clarity is more important than complexity.",
        "Every section of a scientific paper has a specific purpose.",
        "Ethical publishing practices are essential.",
        "Scientific writing improves with continuous practice."
      ]
    },
    {
      type: "h2",
      text: "Download the Book"
    },
    {
      type: "p",
      text: "You can access the complete training manual here: https://drive.google.com/file/d/16YOT4E1abv30nvNOpXPgU0Y2ug94TGvj/view?usp=drivesdk"
    },
    {
      type: "h2",
      text: "Final Thoughts"
    },
    {
      type: "p",
      text: "Whether you're preparing your first research report or your hundredth journal article, strong writing skills remain one of the most valuable tools a researcher can develop. This manual provides a practical foundation for communicating scientific knowledge effectively and professionally."
    }
  ]
},
   ];

/* -----------------------------------------
   2. Small helpers
----------------------------------------- */

/** Format an ISO date string like "2026-03-02" into "March 2, 2026". */
function formatDate(isoDate) {
  const date = new Date(isoDate + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Escape text before inserting it into innerHTML, to keep things safe and predictable. */
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/** Find an article by its id (ids are numbers, but URL params arrive as strings). */
function getArticleById(id) {
  return ARTICLES.find((article) => article.id === Number(id));
}

/* -----------------------------------------
   3. Navigation
----------------------------------------- */
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the mobile menu whenever a link is chosen.
    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Highlight the nav link that matches the current page.
  const currentPage = document.body.dataset.page;
  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add("active");
    }
  });
}

/* -----------------------------------------
   4. Rendering article cards
----------------------------------------- */

/** Build the HTML string for one article card. */
function articleCardHTML(article) {
  return `
    <article class="article-card" data-category="${escapeHTML(article.category)}" data-title="${escapeHTML(article.title.toLowerCase())}">
      <a href="article.html?id=${article.id}" class="article-card-image">
        <img src="${article.image}" alt="Cover image for ${escapeHTML(article.title)}" loading="lazy">
      </a>
      <div class="article-card-body">
        <span class="article-card-category">${escapeHTML(article.category)}</span>
        <h3><a href="article.html?id=${article.id}">${escapeHTML(article.title)}</a></h3>
        <p>${escapeHTML(article.excerpt)}</p>
        <div class="article-card-meta">
          <span>${formatDate(article.date)}</span>
          <span class="dot" aria-hidden="true"></span>
          <span>${article.readTime} min read</span>
        </div>
        <a href="article.html?id=${article.id}" class="btn-text">Read more &rarr;</a>
      </div>
    </article>
  `;
}

/** Render the "Latest Articles" section on the home page. */
function renderLatestArticles() {
  const grid = document.querySelector("#latest-articles-grid");
  if (!grid) return;

  const latest = ARTICLES.filter((a) => !a.featured).slice(0, 6);
  grid.innerHTML = latest.map(articleCardHTML).join("");
}

/** Render the featured article section on the home page. */
function renderFeaturedArticle() {
  const container = document.querySelector("#featured-article");
  if (!container) return;

  const featured = ARTICLES.find((a) => a.featured) || ARTICLES[0];

  container.innerHTML = `
    <div class="featured-image">
      <a href="article.html?id=${featured.id}">
        <img src="${featured.image}" alt="Cover image for ${escapeHTML(featured.title)}">
      </a>
    </div>
    <div class="featured-text">
      <span class="article-card-category">${escapeHTML(featured.category)}</span>
      <h3><a href="article.html?id=${featured.id}">${escapeHTML(featured.title)}</a></h3>
      <div class="featured-meta">
        <span>${formatDate(featured.date)}</span>
        <span class="dot" aria-hidden="true"></span>
        <span>${featured.readTime} min read</span>
      </div>
      <p>${escapeHTML(featured.excerpt)}</p>
      <a href="article.html?id=${featured.id}" class="btn btn-outline">Read the full article</a>
    </div>
  `;
}

/* -----------------------------------------
   5. Articles page: search + category filter
----------------------------------------- */
function renderArticlesPage() {
  const grid = document.querySelector("#articles-grid");
  if (!grid) return;

  // Render every article once; filtering just shows/hides cards afterward.
  grid.innerHTML = ARTICLES.map(articleCardHTML).join("");

  const searchInput = document.querySelector("#article-search");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const noResults = document.querySelector("#no-results");
  const cards = () => Array.from(grid.querySelectorAll(".article-card"));

  let activeCategory = "all";

  function applyFilters() {
    const query = (searchInput?.value || "").trim().toLowerCase();
    let visibleCount = 0;

    cards().forEach((card) => {
      const matchesCategory = activeCategory === "all" || card.dataset.category === activeCategory;
      const matchesQuery = query === "" || card.dataset.title.includes(query);
      const isVisible = matchesCategory && matchesQuery;
      card.style.display = isVisible ? "" : "none";
      if (isVisible) visibleCount += 1;
    });

    if (noResults) {
      noResults.classList.toggle("visible", visibleCount === 0);
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      button.classList.add("active");
      activeCategory = button.dataset.category;
      applyFilters();
    });
  });
}

/* -----------------------------------------
   6. Single article page
----------------------------------------- */

/** Turn one content block into an HTML string. */
function renderBlock(block) {
  switch (block.type) {
    case "p":
      return `<p class="${block.lead ? "lead" : ""}">${escapeHTML(block.text)}</p>`;
    case "h2":
      ret
