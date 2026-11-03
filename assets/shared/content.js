/* Single source of truth for every design. Edit text here once. */
window.SITE = {
  name: "Samruddhi Oke",
  first: "Samruddhi",
  last: "Oke",
  email: "svo8@cornell.edu",
  github: "https://github.com/Samruddhioke0410",
  linkedin: "https://www.linkedin.com/in/samruddhi-oke",
  resume: "assets/Samruddhi_Oke_Resume.pdf",
  portrait: "assets/img/portrait.jpg",
  reachyVideo: "assets/video/reachy.mp4",
  links: {
    radio: "", // radio show / station page
  },

  tagline: "CS (Honors) @ Cornell '28 · AI/ML · TATA Scholar",
  roles: ["Software Engineer", "AI/ML Researcher", "Founder", "Robotics Builder", "Teaching Assistant"],

  about: {
    lead: "I'm a Computer Science (Honors) student at <b>Cornell</b>, specializing in <b>ML &amp; AI</b>, and a <b>TATA Scholar</b> (top 1%).",
    body: [
      "I like problems where software meets the real world: a robot that has to find its way when half its sensors drop out, a chat system holding up under thousands of live streams, a model that has to answer in under 25 ms. I do research in robotic navigation, I founded a social platform with 160+ users, and I teach as a TA for LLMs, Machine Learning, and Embedded Systems.",
      "I'm drawn to startup culture, where you learn fast and ideas get designed, built, and shipped again and again. That's how I like to work.",
    ],
    chips: ["📍 Ithaca, NY", "🎓 Cornell CS '28 · GPA 3.6", "Seeking SWE internships · Summer 2027"],
  },


  research: [{
    role: "Undergraduate Researcher",
    project: "PilotProxy",
    org: "Cornell Ann S. Bowers College of Computing & Information Science",
    orgUrl: "https://cis.cornell.edu",
    mentor: "Prof. François Guimbretière",
    mentorUrl: "https://infosci.cornell.edu/people/francois-guimbretiere",
    dates: "January 2025 – Present",
    status: "Under review · CHI '27",
    bullets: [
      "Built multimodal <b>sensor-fusion models</b> (PyTorch, OpenCV, CUDA) that hold <b>±0.5 m localization</b> through 30% sensor dropout.",
      "Optimized a CUDA computer-vision pipeline to <b>30 FPS</b> with <b>&lt;50 ms YOLOv8</b> inference for real-time autonomous robot navigation.",
      "Engineered C++ / ROS navigation with dynamic A* path planning, <b>cutting manual operator intervention by 67%</b>.",
      "Designed offline and online evaluation harnesses that isolate sensor, model, and navigation failures before real-world deployment.",
    ],
    tags: ["PyTorch", "CUDA", "OpenCV", "YOLOv8", "C++", "ROS"],
  }],

  experience: [
    {
      role: "Founder & Applied AI/ML Engineer",
      org: "I Can't Tell Anyone",
      dates: "May 2026 – Present",
      mark: "IC",
      bullets: [
        "Developed, deployed, and maintain a full-stack AI social media site (React/Next.js, Python, FastAPI) end to end for <b>160+ users</b>.",
        "Built asyncio WebSockets with Redis Pub/Sub and PostgreSQL to route chat, feeds, and moderation across <b>5K+ live streams</b>.",
        "Reached <b>&lt;25 ms inference</b> by fine-tuning a PyTorch/Hugging Face classifier with LoRA and deploying ONNX INT8.",
        "Deployed Llama 3.2 inference with Triton and Docker, keeping sensitive user data inside controlled infrastructure.",
      ],
      tags: ["Next.js", "FastAPI", "Redis", "PostgreSQL", "LoRA", "ONNX", "Triton", "Llama 3.2"],
      links: [["▶ Watch demo", "https://youtu.be/d6EKJWPPSjk"]],
    },
    {
      role: "Software Engineering Intern",
      org: "ZetaChain",
      orgUrl: "https://www.zetachain.com",
      dates: "May 2025 – July 2025",
      mark: "Z",
      logo: "assets/img/logos/zetachain.png",
      bullets: [
        "Cut distributed Node.js API latency <b>56%</b> with cross-chain RPC batching, Redis caching, and PostgreSQL query optimization.",
        "Reduced schema errors <b>25%</b>, saving 20+ debugging hours/week, with reusable Zod/TypeScript validation across 20K+ LOC.",
        "Built an MCP-enabled TypeScript CLI with Claude Code for runtime diagnostics and RPC tooling, <b>adopted by 8 engineers</b>.",
        "Expanded automated testing to <b>90% coverage</b> and Dockerized Go services on Linux, reducing CI/CD failures by 30%.",
      ],
      tags: ["Node.js", "TypeScript", "Go", "Redis", "PostgreSQL", "Docker", "MCP"],
      links: [["zetachain.com ↗", "https://www.zetachain.com/"]],
    },
    {
      role: "Teaching Assistant",
      org: "Cornell University · Computer Science",
      orgUrl: "https://www.cs.cornell.edu",
      dates: "Spring 2026 – Present",
      mark: "TA",
      logo: "assets/img/logos/cornell.png",
      courses: [["Spring 2026", "Large Language Models", "llm"], ["Fall 2026", "Machine Learning", "ml"], ["Fall 2026", "Embedded Systems", "chip"]],
    },
  ],

  projects: [
    {
      title: "Legal Eagle",
      kicker: "Multimodal RAG · Generative AI · Team of 2",
      art: "podcast",
      idea: "Legal filings are dense, and almost nobody wants to read them. Legal Eagle turns them into a dual-host podcast you can actually listen to, with every line grounded in the source documents.",
      built: [
        "Designed a multimodal RAG retrieval architecture that converts legal filings into podcasts, <b>cutting LLM token costs 52.5%</b>.",
        "Reduced hallucinations <b>38%</b> with asynchronous multi-agent pipelines, grounding checks, and automated evaluation.",
      ],
      tags: ["Python", "LangGraph", "LangChain", "Pinecone", "Redis", "JavaScript"],
      links: [["▶ Watch demo", "https://youtu.be/ReSZEn3ARvg"]],
    },
    {
      title: "AirDrum Duel",
      kicker: "Embedded Systems · Real-Time · Team of 2",
      art: "drums",
      idea: "No drum kit, no problem. Two players swing motion-sensing boards like drumsticks and battle beat for beat. The hard part is making an invisible drum feel instant on a tiny microcontroller.",
      built: [
        "Wrote bare-metal firmware in <b>Embedded C and ARM assembly</b> for the FRDM-KL46Z (Cortex-M0+), splitting the game into <b>six concurrent stages</b> from sensor read to scoring.",
        "Turned raw IMU readings, sampled every <b>10 ms</b>, into drum-hit gestures, and used <b>earliest-deadline-first scheduling</b> so time-critical hits never wait behind slower work.",
        "Wired it together with hardware timers, interrupt handlers, and UART for low-latency input and output.",
      ],
      tags: ["Embedded C", "ARM Assembly", "Cortex-M0+", "EDF Scheduling", "IMU", "Interrupts", "UART"],
      links: [["▶ Watch demo", "https://youtu.be/6LhgXgnIcNo"], ["Project page ↗", "https://pages.github.coecis.cornell.edu/ece3140-spr2026/ab3235-svo8/"]],
    },
    {
      title: "Clout Trader",
      kicker: "Prediction Market · NLP · Web3",
      art: "candles",
      award: "🥈 2nd place · UPenn Blockchain Hackathon",
      idea: "What if you could trade an influencer's momentum the way you trade a stock? Clout Trader is a prediction market that turns social buzz into on-chain trading signals.",
      built: [
        "Processed <b>12K+ tweets/day</b> into NLP signals powering a Solidity/Next.js prediction market.",
        "Executed <b>$48K+</b> in simulated on-chain trades.",
      ],
      tags: ["Solidity", "Python", "Next.js", "NLP", "Tailwind CSS"],
    },
    {
      title: "Bitcoin Price Prediction",
      kicker: "Production ML · Streaming",
      art: "line",
      idea: "Most price-prediction projects stop at a notebook. This one runs as a production system: live market data streams in, a model serves predictions in real time, and monitoring flags when the model starts to drift.",
      built: [
        "Architected a real-time Kafka/PostgreSQL pipeline with <b>&lt;5 s streaming latency</b> over large-scale market data.",
        "Trained an XGBoost/LightGBM ensemble on 40+ features with <b>&lt;150 ms FastAPI inference</b> and Prometheus drift alerts.",
      ],
      tags: ["Python", "XGBoost", "LightGBM", "Kafka", "FastAPI", "Prometheus"],
    },
    // BME project: fill this in and uncomment. art can be "podcast", "drums", "candles", or "line".
    // {
    //   title: "",
    //   kicker: "",
    //   art: "line",
    //   idea: "",
    //   built: [""],
    //   tags: [],
    // },
  ],

  leadership: [
    {
      role: "Director of Data & Infrastructure",
      org: "Cornell Algorithmic Trading Club",
      orgUrl: "https://www.cornellalgo.com",
      logo: "assets/img/logos/cornell-algo.png",
      logoBg: "#141418",
      dates: "January 2026 – Present",
      bullets: [
        "Lead AWS/GCP cloud infrastructure for <b>20+ researchers</b> and a <b>$150K fund</b>, serving REST APIs and shared data services.",
        "Trained CNN and NLP classifiers over <b>15K+ SEC filings</b>, cutting ingestion time 40%.",
        "Designed real-time SQL/NoSQL storage across PostgreSQL, Redis, and Firebase for durable, cached, and live market data.",
        "Standardized PR review, testing, data versioning, AWS access controls, and runbooks across shared infrastructure.",
      ],
      tags: ["AWS", "GCP", "TensorFlow", "scikit-learn", "PostgreSQL", "Firebase"],
      links: [["cornellalgo.com ↗", "https://www.cornellalgo.com/"]],
    },
    {
      role: "Full-Stack Engineer & Recruitment Lead",
      org: "Cornell Blockchain",
      orgUrl: "https://www.cornellblockchain.org",
      logo: "assets/img/logos/cornell-blockchain.png",
      dates: "September 2024 – Present",
      bullets: [
        "Led <b>5 engineers</b> through sprint planning, API design, and PR reviews to ship a React/Next.js web and mobile gig marketplace.",
        "Developed async FastAPI services (SQLAlchemy pooling, PostgreSQL) sustaining <b>10K+ concurrent requests</b> in load tests.",
      ],
      tags: ["React", "Next.js", "FastAPI", "SQLAlchemy", "PostgreSQL"],
      links: [["cornellblockchain.org ↗", "https://www.cornellblockchain.org"]],
    },
  ],

  skills: {
    "Languages": [["Python", "python-plain"], ["Java", "java-plain"], ["C++", "cplusplus-plain"], ["C", "c-plain"], ["Go", "go-original-wordmark"], ["TypeScript", "typescript-plain"], ["JavaScript", "javascript-plain"], ["C#", "csharp-plain"], ["SQL", null], ["Solidity", "solidity-plain"], ["Rust", "rust-original"], ["R", "r-plain"], ["MATLAB", "matlab-plain"], ["Kotlin", "kotlin-plain"]],
    "Full-Stack": [["React", "react-original"], ["Next.js", "nextjs-plain"], ["Node.js", "nodejs-plain"], ["FastAPI", "fastapi-plain"], ["Flask", "flask-original"], ["SQLAlchemy", null], ["Tailwind CSS", "tailwindcss-original"], ["REST APIs", null], ["CI/CD", "githubactions-plain"], ["HTML/CSS", "html5-plain"]],
    "AI / ML": [["PyTorch", "pytorch-original"], ["TensorFlow", "tensorflow-original"], ["scikit-learn", "scikitlearn-plain"], ["Keras", "keras-plain"], ["Hugging Face", null], ["LangChain", null], ["LangGraph", null], ["OpenCV", "opencv-plain"], ["CUDA", null], ["Triton", null], ["JAX", null]],
    "Infra & Tools": [["ROS", null], ["AWS", "amazonwebservices-plain-wordmark"], ["GCP", "googlecloud-plain"], ["Docker", "docker-plain"], ["Git", "git-plain"], ["Redis", "redis-plain"], ["PostgreSQL", "postgresql-plain"], ["Kafka", "apachekafka-original"], ["Linux / Unix", "linux-plain"], ["Firebase", "firebase-plain"], ["Claude Code", null], ["Cursor", null]],
  },

  interests: [
    { key: "drums", title: "Drumming", text: "Keeping the beat to 2016-era Hindi songs and remixes of the old classics." },
    { key: "martial", title: "Martial arts", text: "Kalaripayattu, Muay Thai, Karate, and Boxing." },
    { key: "adventure", title: "Adventure", text: "River rafting, ATV rides, and surfing. Happiest out near the water." },
    { key: "paint", title: "Watercolors", text: "Cloudy skies, rivers, and quiet cabins." },
    { key: "cube", title: "Rubik's cube", text: "Algorithms you can hold in your hand." },
    { key: "poker", title: "Poker & trading", text: "Reading odds, sizing bets, knowing when to fold, at the table and in markets." },
    { key: "radio", title: "On the radio", text: "Bollywood, 2016-era Hindi hits, and remixes of the old classics.", link: "radio" },
    { key: "cocoa", title: "Fuel of choice", text: "Hot chocolate, a cloudy day, a river view. Red everything, starry nights, and very small robots." },
  ],

  quote: ["It's a magical world, Hobbes, ol' buddy… Let's go exploring!", "Calvin, by Bill Watterson"],
  contactLine: "I'm looking for <b>Software Engineering internships for Summer 2027</b>. If you're building something ambitious in AI, systems, or infrastructure, I'd love to talk.",
};
