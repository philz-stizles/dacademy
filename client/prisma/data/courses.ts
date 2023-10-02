import { FullCourse, FullChapter } from '@/types/course';

const courses: (Omit<
  FullCourse,
  | 'id'
  | 'wsl'
  | 'attachments'
  | 'chapters'
  | 'updatedAt'
  | 'createdAt'
  | 'author'
  | 'authorId'
  | 'categoryId'
  | 'category'
> & {
  category: string;
  wsl: { name: string }[];
  chapters: Omit<
    FullChapter,
    'id' | 'updatedAt' | 'createdAt' | 'courseId' | 'muxData'
  >[];
  attachments: {}[];
})[] = [
  {
    type: '',
    category: 'Web Development',
    title: 'Next JS & Typescript with Shopify Integration - Full Guide',
    description:
      'Learn modern Next JS(Next 10+). Code everything in Typescript and integrate with Shopify.',
    coverImage: 'https://thrangra.sirv.com/Next_TypeScript_Shopify_Final.jpg',
    rating: 3,
    price: 14000,
    isPublished: true,
    link: 'https://academy.eincode.com/courses/next-js-typescript-with-shopify-integration-full-guide',
    slug: 'next-js-typescript-with-shopify-integration-full-guide',
    wsl: [
      { name: 'Build Gatsby JS apps on your own' },
      { name: 'Build static page apps with modern technologies' },
    ],
    chapters: [
      {
        title: 'Introduction to Web3, Ethereum and the block chain',
        position: 1,
        isPublished: true,
        isFree: true,
        description:
          '<p>Welcome to the fascinating world of Web3, Ethereum, and Blockchain technology! This chapter in our online course is designed to provide you with a comprehensive understanding of the decentralized digital landscape that is transforming industries and redefining the way we interact with the internet.</p><p>In this chapter, you will embark on a journey to uncover the core principles, technologies, and applications that form the foundation of Web3, with a specific focus on the Ethereum blockchain. Whether you\'re a seasoned developer, a business enthusiast, or simply curious about the future of the internet, this chapter will empower you with the knowledge and skills to navigate this rapidly evolving landscape.</p><p>Key Topics Covered:</p><ol><li><strong style="color: var(--tw-prose-bold);">Introduction to Web3</strong>: We\'ll start by introducing you to the concept of Web3, which represents a new paradigm in web technology. You\'ll discover how Web3 differs from its predecessor, Web2, and why it\'s often referred to as the "decentralized web."</li><li><strong style="color: var(--tw-prose-bold);">Understanding Blockchain Technology</strong>: Dive deep into the fundamental concepts of blockchain technology. Learn how decentralized ledgers work, the principles of immutability and transparency, and the role of consensus mechanisms in securing the network.</li><li><strong style="color: var(--tw-prose-bold);">Ethereum: The World Computer</strong>: Get to know Ethereum, one of the most prominent blockchain platforms. Explore its smart contract capabilities and its role in enabling decentralized applications (DApps) and decentralized finance (DeFi).</li></ol><p><br></p>',
        videoUrl:
          'https://utfs.io/f/4c34ad93-7e4c-4da9-8fb1-72a21c65c0a0-x9k96s.mp4',
      },
    ],
    attachments: [],
  },
  {
    type: '',
    category: 'Web Development',
    title: "Gatsby JS Developer's Guide - Important Parts & Blog App",
    description:
      'Learn popular Gatsby JS(Gatsby v3) framework. Use React/GraphQL to build your own blog page with JAMStack architecture.',
    coverImage: 'https://thrangra.sirv.com/Gatsby.jpeg',
    rating: 3,
    price: 14000,
    isPublished: true,
    link: 'https://academy.eincode.com/courses/gatsby-js-developer-s-guide-important-parts-blog-app',
    slug: 'gatsby-js-developer-s-guide-important-parts-blog-app',
    wsl: [
      { name: 'Build Gatsby JS apps on your own' },
      { name: 'Build static page apps with modern technologies' },
      { name: 'Understand meaning and benefits of JAMStack' },
      { name: 'Use GraphQL to your advantage' },
    ],
    chapters: [
      {
        title: 'Introduction to Web3, Ethereum and the block chain',
        position: 1,
        isPublished: true,
        isFree: true,
        description:
          '<p>Welcome to the fascinating world of Web3, Ethereum, and Blockchain technology! This chapter in our online course is designed to provide you with a comprehensive understanding of the decentralized digital landscape that is transforming industries and redefining the way we interact with the internet.</p><p>In this chapter, you will embark on a journey to uncover the core principles, technologies, and applications that form the foundation of Web3, with a specific focus on the Ethereum blockchain. Whether you\'re a seasoned developer, a business enthusiast, or simply curious about the future of the internet, this chapter will empower you with the knowledge and skills to navigate this rapidly evolving landscape.</p><p>Key Topics Covered:</p><ol><li><strong style="color: var(--tw-prose-bold);">Introduction to Web3</strong>: We\'ll start by introducing you to the concept of Web3, which represents a new paradigm in web technology. You\'ll discover how Web3 differs from its predecessor, Web2, and why it\'s often referred to as the "decentralized web."</li><li><strong style="color: var(--tw-prose-bold);">Understanding Blockchain Technology</strong>: Dive deep into the fundamental concepts of blockchain technology. Learn how decentralized ledgers work, the principles of immutability and transparency, and the role of consensus mechanisms in securing the network.</li><li><strong style="color: var(--tw-prose-bold);">Ethereum: The World Computer</strong>: Get to know Ethereum, one of the most prominent blockchain platforms. Explore its smart contract capabilities and its role in enabling decentralized applications (DApps) and decentralized finance (DeFi).</li></ol><p><br></p>',
        videoUrl:
          'https://utfs.io/f/4c34ad93-7e4c-4da9-8fb1-72a21c65c0a0-x9k96s.mp4',
      },
    ],
    attachments: [],
  },
  {
    type: '',
    category: 'Web Development',
    title: 'The Complete Unity Guide 3D - Beginner to RPG Game Dev in C#',
    description:
      'Build 3 games & learn Unity practical way! Start with fundamentals and finish with an RPG game. Using Unity 2020 and C#',
    coverImage: 'https://thrangra.sirv.com/UnityJS.jpeg',
    rating: 3,
    price: 14000,
    isPublished: true,
    link: 'https://academy.eincode.com/courses/the-complete-unity-guide-3d-beginner-to-rpg-game-dev-in-c',
    slug: 'the-complete-unity-guide-3d-beginner-to-rpg-game-dev-in-c',
    wsl: [
      { name: 'The practical approach by creating cool games' },
      { name: 'Fundamentals and core concepts of game development' },
      { name: 'Create a RPG game with tons of features' },
      { name: 'Math explanations behind the code.' },
    ],
    chapters: [
      {
        title: 'Introduction to Web3, Ethereum and the block chain',
        position: 1,
        isPublished: true,
        isFree: true,
        description:
          '<p>Welcome to the fascinating world of Web3, Ethereum, and Blockchain technology! This chapter in our online course is designed to provide you with a comprehensive understanding of the decentralized digital landscape that is transforming industries and redefining the way we interact with the internet.</p><p>In this chapter, you will embark on a journey to uncover the core principles, technologies, and applications that form the foundation of Web3, with a specific focus on the Ethereum blockchain. Whether you\'re a seasoned developer, a business enthusiast, or simply curious about the future of the internet, this chapter will empower you with the knowledge and skills to navigate this rapidly evolving landscape.</p><p>Key Topics Covered:</p><ol><li><strong style="color: var(--tw-prose-bold);">Introduction to Web3</strong>: We\'ll start by introducing you to the concept of Web3, which represents a new paradigm in web technology. You\'ll discover how Web3 differs from its predecessor, Web2, and why it\'s often referred to as the "decentralized web."</li><li><strong style="color: var(--tw-prose-bold);">Understanding Blockchain Technology</strong>: Dive deep into the fundamental concepts of blockchain technology. Learn how decentralized ledgers work, the principles of immutability and transparency, and the role of consensus mechanisms in securing the network.</li><li><strong style="color: var(--tw-prose-bold);">Ethereum: The World Computer</strong>: Get to know Ethereum, one of the most prominent blockchain platforms. Explore its smart contract capabilities and its role in enabling decentralized applications (DApps) and decentralized finance (DeFi).</li></ol><p><br></p>',
        videoUrl:
          'https://utfs.io/f/4c34ad93-7e4c-4da9-8fb1-72a21c65c0a0-x9k96s.mp4',
      },
    ],
    attachments: [],
  },
  {
    type: '',
    category: 'Web Development',
    title: 'Game Development in JS - The Complete Guide (w/ Phaser 3)',
    description:
      'Start building your own games and publish them on Facebook. Learn how to create HTML5 games in Javascript with Phaser 3.',
    coverImage: 'https://thrangra.sirv.com/PhaserJS.jpeg',
    rating: 3,
    price: 14000,
    isPublished: true,
    link: 'https://academy.eincode.com/courses/phaser-3-the-complete-guide-build-publish-games-in-js',
    slug: 'phaser-3-the-complete-guide-build-publish-games-in-js',
    wsl: [
      { name: 'Developing games by creating the games' },
      { name: 'Fundamentals of game development' },
      { name: 'Use Javascript to develop games for Facebook' },
      { name: 'Publish your own game on Facebook Instant Games' },
    ],
    chapters: [
      {
        title: 'Introduction to Web3, Ethereum and the block chain',
        position: 1,
        isPublished: true,
        isFree: true,
        description:
          '<p>Welcome to the fascinating world of Web3, Ethereum, and Blockchain technology! This chapter in our online course is designed to provide you with a comprehensive understanding of the decentralized digital landscape that is transforming industries and redefining the way we interact with the internet.</p><p>In this chapter, you will embark on a journey to uncover the core principles, technologies, and applications that form the foundation of Web3, with a specific focus on the Ethereum blockchain. Whether you\'re a seasoned developer, a business enthusiast, or simply curious about the future of the internet, this chapter will empower you with the knowledge and skills to navigate this rapidly evolving landscape.</p><p>Key Topics Covered:</p><ol><li><strong style="color: var(--tw-prose-bold);">Introduction to Web3</strong>: We\'ll start by introducing you to the concept of Web3, which represents a new paradigm in web technology. You\'ll discover how Web3 differs from its predecessor, Web2, and why it\'s often referred to as the "decentralized web."</li><li><strong style="color: var(--tw-prose-bold);">Understanding Blockchain Technology</strong>: Dive deep into the fundamental concepts of blockchain technology. Learn how decentralized ledgers work, the principles of immutability and transparency, and the role of consensus mechanisms in securing the network.</li><li><strong style="color: var(--tw-prose-bold);">Ethereum: The World Computer</strong>: Get to know Ethereum, one of the most prominent blockchain platforms. Explore its smart contract capabilities and its role in enabling decentralized applications (DApps) and decentralized finance (DeFi).</li></ol><p><br></p>',
        videoUrl:
          'https://utfs.io/f/4c34ad93-7e4c-4da9-8fb1-72a21c65c0a0-x9k96s.mp4',
      },
    ],
    attachments: [],
  },
  {
    type: '',
    category: 'Web Development',
    title: 'Electron & React JS: Build a Native Chat App with Javascript',
    description:
      'Learn how to build a chat app with Electron & React JS. Utilize React JS + Firebase(DB) to create a fully native app',
    coverImage: 'https://thrangra.sirv.com/Electron.jpeg',
    rating: 3,
    price: 14000,
    isPublished: true,
    link: 'https://academy.eincode.com/courses/electron-react-js-build-native-chat-app-with-javascript',
    slug: 'electron-react-js-build-native-chat-app-with-javascript',
    wsl: [
      { name: 'Understand how Electron JS works' },
      { name: "Create a 'real-life' chat application" },
      { name: 'Create native apps with Javascript, Html + CSS' },
      { name: 'Learn how to use React JS in combination with Electron' },
    ],
    chapters: [
      {
        title: 'Introduction to Web3, Ethereum and the block chain',
        position: 1,
        isPublished: true,
        isFree: true,
        description:
          '<p>Welcome to the fascinating world of Web3, Ethereum, and Blockchain technology! This chapter in our online course is designed to provide you with a comprehensive understanding of the decentralized digital landscape that is transforming industries and redefining the way we interact with the internet.</p><p>In this chapter, you will embark on a journey to uncover the core principles, technologies, and applications that form the foundation of Web3, with a specific focus on the Ethereum blockchain. Whether you\'re a seasoned developer, a business enthusiast, or simply curious about the future of the internet, this chapter will empower you with the knowledge and skills to navigate this rapidly evolving landscape.</p><p>Key Topics Covered:</p><ol><li><strong style="color: var(--tw-prose-bold);">Introduction to Web3</strong>: We\'ll start by introducing you to the concept of Web3, which represents a new paradigm in web technology. You\'ll discover how Web3 differs from its predecessor, Web2, and why it\'s often referred to as the "decentralized web."</li><li><strong style="color: var(--tw-prose-bold);">Understanding Blockchain Technology</strong>: Dive deep into the fundamental concepts of blockchain technology. Learn how decentralized ledgers work, the principles of immutability and transparency, and the role of consensus mechanisms in securing the network.</li><li><strong style="color: var(--tw-prose-bold);">Ethereum: The World Computer</strong>: Get to know Ethereum, one of the most prominent blockchain platforms. Explore its smart contract capabilities and its role in enabling decentralized applications (DApps) and decentralized finance (DeFi).</li></ol><p><br></p>',
        videoUrl:
          'https://utfs.io/f/4c34ad93-7e4c-4da9-8fb1-72a21c65c0a0-x9k96s.mp4',
      },
    ],
    attachments: [],
  },
  {
    type: '',
    category: 'Web Development',
    title: 'Vue JS 3, React JS & Angular - Guide to Popular Frameworks',
    description:
      'Understand basics and difficult parts of the 3 most popular frameworks - React JS, Angular and Vue. All in one course!',
    coverImage: 'https://thrangra.sirv.com/VueReactAng.jpeg',
    rating: 3,
    price: 14000,
    isPublished: true,
    link: 'https://academy.eincode.com/courses/vue-3-react-angular-guide-to-popular-frameworks',
    slug: 'vue-3-react-angular-guide-to-popular-frameworks',
    wsl: [
      { name: 'Most popular web frameworks -> React, Angular & Vue JS' },
      { name: 'Features explained on practical examples' },
      { name: 'Base and core concepts of the three most popular frameworks' },
    ],
    chapters: [
      {
        title: 'Introduction to Web3, Ethereum and the block chain',
        position: 1,
        isPublished: true,
        isFree: true,
        description:
          '<p>Welcome to the fascinating world of Web3, Ethereum, and Blockchain technology! This chapter in our online course is designed to provide you with a comprehensive understanding of the decentralized digital landscape that is transforming industries and redefining the way we interact with the internet.</p><p>In this chapter, you will embark on a journey to uncover the core principles, technologies, and applications that form the foundation of Web3, with a specific focus on the Ethereum blockchain. Whether you\'re a seasoned developer, a business enthusiast, or simply curious about the future of the internet, this chapter will empower you with the knowledge and skills to navigate this rapidly evolving landscape.</p><p>Key Topics Covered:</p><ol><li><strong style="color: var(--tw-prose-bold);">Introduction to Web3</strong>: We\'ll start by introducing you to the concept of Web3, which represents a new paradigm in web technology. You\'ll discover how Web3 differs from its predecessor, Web2, and why it\'s often referred to as the "decentralized web."</li><li><strong style="color: var(--tw-prose-bold);">Understanding Blockchain Technology</strong>: Dive deep into the fundamental concepts of blockchain technology. Learn how decentralized ledgers work, the principles of immutability and transparency, and the role of consensus mechanisms in securing the network.</li><li><strong style="color: var(--tw-prose-bold);">Ethereum: The World Computer</strong>: Get to know Ethereum, one of the most prominent blockchain platforms. Explore its smart contract capabilities and its role in enabling decentralized applications (DApps) and decentralized finance (DeFi).</li></ol><p><br></p>',
        videoUrl:
          'https://utfs.io/f/4c34ad93-7e4c-4da9-8fb1-72a21c65c0a0-x9k96s.mp4',
      },
    ],
    attachments: [],
  },
  {
    type: '',
    category: 'Web Development',
    title: 'Vue JS 3 - The Practical Guide',
    description:
      'Understand basic and difficult parts of Vue JS 3 framework. Course is including Vue Router and latest Vue JS 3 features including Composition API.    ',
    coverImage: 'https://thrangra.sirv.com/Vue3.png',
    rating: 3,
    price: 14000,
    isPublished: true,
    link: 'https://academy.eincode.com/courses/vue-js-3-the-practical-guide',
    slug: 'vue-js-3-the-practical-guide',
    wsl: [
      { name: 'Features explained on practical examples' },
      { name: 'Base and core concepts of Vue JS 3' },
    ],
    chapters: [
      {
        title: 'Introduction to Web3, Ethereum and the block chain',
        position: 1,
        isPublished: true,
        isFree: true,
        description:
          '<p>Welcome to the fascinating world of Web3, Ethereum, and Blockchain technology! This chapter in our online course is designed to provide you with a comprehensive understanding of the decentralized digital landscape that is transforming industries and redefining the way we interact with the internet.</p><p>In this chapter, you will embark on a journey to uncover the core principles, technologies, and applications that form the foundation of Web3, with a specific focus on the Ethereum blockchain. Whether you\'re a seasoned developer, a business enthusiast, or simply curious about the future of the internet, this chapter will empower you with the knowledge and skills to navigate this rapidly evolving landscape.</p><p>Key Topics Covered:</p><ol><li><strong style="color: var(--tw-prose-bold);">Introduction to Web3</strong>: We\'ll start by introducing you to the concept of Web3, which represents a new paradigm in web technology. You\'ll discover how Web3 differs from its predecessor, Web2, and why it\'s often referred to as the "decentralized web."</li><li><strong style="color: var(--tw-prose-bold);">Understanding Blockchain Technology</strong>: Dive deep into the fundamental concepts of blockchain technology. Learn how decentralized ledgers work, the principles of immutability and transparency, and the role of consensus mechanisms in securing the network.</li><li><strong style="color: var(--tw-prose-bold);">Ethereum: The World Computer</strong>: Get to know Ethereum, one of the most prominent blockchain platforms. Explore its smart contract capabilities and its role in enabling decentralized applications (DApps) and decentralized finance (DeFi).</li></ol><p><br></p>',
        videoUrl:
          'https://utfs.io/f/4c34ad93-7e4c-4da9-8fb1-72a21c65c0a0-x9k96s.mp4',
      },
    ],
    attachments: [],
  },
  {
    type: '',
    category: 'Web Development',
    title: 'Complete Next.js with React & Node - Beautiful Portfolio App',
    description:
      'Build Serverless Web Apps with Next.js. Learn Hooks. Deploy to Vercel. Next.js (Next JS 10+), React (React 16+) & Node.',
    coverImage: 'https://thrangra.sirv.com/NextJS.jpeg',
    rating: 3,
    price: 14000,
    isPublished: true,
    link: 'https://academy.eincode.com/courses/complete-next-js-with-react-node-beautiful-portfolio-app',
    slug: 'complete-next-js-with-react-node-beautiful-portfolio-app',
    wsl: [
      {
        name: 'Develop serverless & classical web applications with the latest Next JS & React',
      },
      {
        name: 'Understand web concepts clearly by creating real-world applications',
      },
      {
        name: 'Create SEO (Search Engine Optimization) and Isomorphic Friendly Applications',
      },
      {
        name: 'Establish yourself in field of the exciting Next and React web development environment',
      },
    ],
    chapters: [
      {
        title: 'Introduction to Web3, Ethereum and the block chain',
        position: 1,
        isPublished: true,
        isFree: true,
        description:
          '<p>Welcome to the fascinating world of Web3, Ethereum, and Blockchain technology! This chapter in our online course is designed to provide you with a comprehensive understanding of the decentralized digital landscape that is transforming industries and redefining the way we interact with the internet.</p><p>In this chapter, you will embark on a journey to uncover the core principles, technologies, and applications that form the foundation of Web3, with a specific focus on the Ethereum blockchain. Whether you\'re a seasoned developer, a business enthusiast, or simply curious about the future of the internet, this chapter will empower you with the knowledge and skills to navigate this rapidly evolving landscape.</p><p>Key Topics Covered:</p><ol><li><strong style="color: var(--tw-prose-bold);">Introduction to Web3</strong>: We\'ll start by introducing you to the concept of Web3, which represents a new paradigm in web technology. You\'ll discover how Web3 differs from its predecessor, Web2, and why it\'s often referred to as the "decentralized web."</li><li><strong style="color: var(--tw-prose-bold);">Understanding Blockchain Technology</strong>: Dive deep into the fundamental concepts of blockchain technology. Learn how decentralized ledgers work, the principles of immutability and transparency, and the role of consensus mechanisms in securing the network.</li><li><strong style="color: var(--tw-prose-bold);">Ethereum: The World Computer</strong>: Get to know Ethereum, one of the most prominent blockchain platforms. Explore its smart contract capabilities and its role in enabling decentralized applications (DApps) and decentralized finance (DeFi).</li></ol><p><br></p>',
        videoUrl:
          'https://utfs.io/f/4c34ad93-7e4c-4da9-8fb1-72a21c65c0a0-x9k96s.mp4',
      },
    ],
    attachments: [],
  },
  // {
  //
  //   type: '',
  //   category: 'React, Angular',
  //   title: 'React, Angular, Node In-Depth Guide: Beginner to Pro (2020)',
  //   description:
  //     'Beginner to Advance Web Developer Guide. Master Angular (Angular 8+), React + Redux (React 16.12+) & Node with Mongo DB!',
  //   coverImage: 'https://thrangra.sirv.com/AngularJS.jpeg',
  //   rating: 3,
  //   price: 14000,
  //   isPublished: true,
  //   link: 'https://academy.eincode.com/courses/react-angular-node-in-depth-guide-beginner-to-pro-2020',
  //   slug: 'react-angular-node-in-depth-guide-beginner-to-pro-2020',
  //   wsl: [
  //     'Develop Real-world web applications with React, Angular and Node',
  //     'Understand the processes and architecture of Angular, React and Node',
  //     'Create own web applications in most demanded frameworks on the market',
  //     'Establish yourself in field of the exciting Angular, React and Node web development environment',
  //   ],
  //   chapters: [],
  //   attachments: [],
  //
  // },
  // {
  //
  //   type: '',
  //   category: 'React JS',
  //   title: 'React JS & Firebase Complete Course (incl. Chat Application)',
  //   description:
  //     "Create 'real world' React JS applications connected to Firestore (Firebase). Redux, authentication + real time features!",
  //   coverImage: 'https://thrangra.sirv.com/ReactFirebase.jpeg',
  //   rating: 3,
  //   price: 14000,
  //   isPublished: true,
  //   link: 'https://academy.eincode.com/courses/react-js-firebase-complete-course-incl-chat-application',
  //   slug: 'react-js-firebase-complete-course-incl-chat-application',
  //   wsl: [
  //     'Develop real-world web application with React JS and Firebase',
  //     'Understand the processes and concepts of React JS 2',
  //     'Use gained knowledge to create your own Web Applications',
  //   ],
  //   chapters: [],
  //   attachments: [],
  //
  // },
  // {
  //
  //   type: '',
  //   category: 'Vue JS',
  //   title: 'Vue JS 2 &  Firebase Complete Course',
  //   description:
  //     "Learn how to create 'real world' Vue JS 2 application connected to Firestore(Firebase) Database.",
  //   coverImage: 'https://thrangra.sirv.com/VueFirebase.jpeg',
  //   rating: 3,
  //   price: 14000,
  //   isPublished: true,
  //   link: 'https://academy.eincode.com/courses/vue-js-2-firebase-complete-course',
  //   slug: 'vue-js-2-firebase-complete-course',
  //   wsl: [
  //     'Develop real-world web application with Vue JS 2 and Firebase',
  //     'Understand the processes and concepts of Vue JS 2',
  //     'Use gained knowledge to create your own Web Applications',
  //   ],
  //   chapters: [],
  //   attachments: [],
  //
  // },
  // {
  //
  //   type: '',
  //   title: 'Next.JS with Sanity CMS - Serverless Blog App (w/ Vercel)',
  //   description:
  //     'Build your own Blog App with the latest Next.JS & React(Next 9.4+, React hooks). Learn how to use headless Sanity CMS.',
  //   coverImage: 'https://thrangra.sirv.com/Sanity.jpeg',
  //   rating: 3,
  //   price: 14000,
  //   isPublished: true,
  //   link: 'https://academy.eincode.com/courses/next-js-with-sanity-cms-serverless-blog-app-w-vercel',
  //   slug: 'next-js-with-sanity-cms-serverless-blog-app-w-vercel',
  //   wsl: [
  //     'Use the latest Next/React features (getStaticProps, getStaticPaths, getServerSideProps)',
  //     'Create statically generated web apps',
  //     'Deploy Serverless Apps !',
  //     'Integrate Sanity CMS',
  //   ],
  //   chapters: [],
  //   attachments: [],
  //
  // },
  // {
  //
  //   type: '',
  //   title: 'Next.js and Apollo - Portfolio App (w/ React, GraphQL, Node)',
  //   description:
  //     'Learn GraphQL and Apollo! Create a fast portfolio application in Next.js(Next 9+) / React backed with Apollo + Node.js',
  //   coverImage: 'https://thrangra.sirv.com/Apollo.jpeg',
  //   rating: 3,
  //   price: 14000,
  //   isPublished: true,
  //   link: 'https://academy.eincode.com/courses/next-js-and-apollo-portfolio-app-w-react-graphql-node',
  //   slug: 'next-js-and-apollo-portfolio-app-w-react-graphql-node',
  //   wsl: [
  //     'Develop Real-world web application with Next JS, Apollo and Node',
  //     'Create your own portfolio application in most demanded frameworks on the market',
  //     'Grasp full power of GraphQL',
  //   ],
  //   chapters: [],
  //   attachments: [],
  //
  // },
  // {
  //
  //   type: '',
  //   title: 'The Complete Vue JS Developer Course – inc. Vue JS 2!',
  //   description:
  //     'Build real web apps with Vuex, Router, Node! Master Vue Js and Vue JS 2!',
  //   coverImage: 'https://thrangra.sirv.com/VueJS.jpeg',
  //   rating: 3,
  //   price: 14000,
  //   isPublished: true,
  //   link: 'https://academy.eincode.com/courses/the-complete-vue-js-developer-course-inc-vue-js-2',
  //   slug: 'the-complete-vue-js-developer-course-inc-vue-js-2',
  //   wsl: [
  //     'Develop powerful, modern, real-world web applications with Vue JS 2 and Node',
  //     'Completely understand the processes and concepts of Vue JS 2',
  //     'Use gained knowledge to create your own Web Applications',
  //     'Become fluent in concepts and tools like Vuex, MongoDb, Sockets, Authentication',
  //   ],
  //   chapters: [],
  //   attachments: [],
  //
  // },
  // {
  //
  //   type: '',
  //   category: 'Nuxt JS',
  //   title: 'The Complete Nuxt.js & Vue.js Course | Self Promo App',
  //   description:
  //     'Complete Developer Guide covering Vue.js and Nuxt.js basic to advance concepts. Get your hands on real projects.',
  //   coverImage: 'https://thrangra.sirv.com/NuxtJS.jpeg',
  //   rating: 3,
  //   price: 14000,
  //   isPublished: true,
  //   link: 'https://academy.eincode.com/courses/the-complete-nuxt-js-vue-js-course-self-promo-app',
  //   slug: 'the-complete-nuxt-js-vue-js-course-self-promo-app',
  //   wsl: [
  //     'Develop powerful, modern, real-world web applications with Nuxt JS, Vue JS 2 and Node',
  //     'Completely understand the processes and concepts of Nuxt JS & Vue JS 2',
  //     'Use gained knowledge to create your own Web Applications',
  //     'Become fluent in concepts and tools like SSR, Vuex, Vuelidate and more',
  //   ],
  //   chapters: [],
  //   attachments: [],
  //
  // },
];

export default courses;
