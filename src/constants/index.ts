import { Challenges, UserChallenge } from "../pages/Challenges";


export const navItems = [
    {
        icon: "/assets/icons/layout-dashboard.svg",
        name: "Dashboard",
        url: "/Dashboard"
    },
    {
        icon: "/assets/icons/car.png",
        name: "Track impact",
        url: "/track-impact"
    },
    {
        icon: "/assets/icons/shopping-cart.svg",
        name: "Eco shopping",
        url: "/eco-shopping"
    },
    {
        icon: "/assets/icons/lightbulb.svg",
        name: "Daily Tips",
        url: "/daily-tips"
    },
    {
        icon: "/assets/icons/trophy.svg",
        name: "Challenges",
        url: "/challenges"
    }
     
]

export const projects = [
    {
        image: "https://thesolarlabs.com/ros/content/images/2023/04/solar-farm-business--1---1--compressed.jpg",
        title: "Solar Farm Project",
        text: "Offset 1kg CO₂ for $0.50",
    },
    {
        image: "https://th.bing.com/th/id/OIP.BaPwHb8oLjMBxB5gTjTOvQHaE_?rs=1&pid=ImgDetMain",
        title: "Reforestation Initiative",
        text: "Offset 1kg CO₂ for $0.75",
    },
    {
        image: "https://static4.abbyy.com/abbyycommedia/33413/reforestation-1.png",
        title: "Wind Energy Project",
        text: "Offset 1kg CO₂ for $0.60",
    }
]

export const stats = [
    {
      title: "Your Carbon Footprint",
      value: "742 kg CO₂",
      subtitle: "This month",
      highlight: true,
    },
    {
      title: "Active Streak",
      value: "12 days",
      subtitle: "Keep it up!",
    },
    {
      title: "Eco Points",
      value: "2,450",
      subtitle: "Level 5 Eco Warrior",
    },
];

export const productsData = [
    {
        id: '1',
        name: 'Organic Cotton T-Shirt',
        brand: 'EcoWear',
        category: 'Clothing',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800',
        price: 1299,
        ecoScore: 85,
        rating: 4.7,
        reviews: 128,
        isVerified: true,
        certifications: ['Organic', 'Fair Trade']
    },
    {
        id: '2',
        name: 'Bamboo Water Bottle',
        brand: 'GreenLife',
        category: 'Accessories',
        image: 'https://planetgoodwill.com/wp-content/uploads/2018/12/911ZrDKR7CL._SL1500_.jpg',
        price: 899,
        ecoScore: 90,
        rating: 4.5,
        reviews: 89,
        isVerified: true,
        certifications: ['Plastic-Free', 'Sustainable']
    },
    {
        id: '3',
        name: 'Recycled Kitchen items',
        brand: 'EcoPaper',
        category: 'Stationery',
        image: 'https://thesustainablebrandsjournal.com/wp-content/uploads/2023/10/aaa-mbbLRRx6G-transformed-e1697954086537.jpg',
        price: 499,
        ecoScore: 88,
        rating: 4.6,
        reviews: 72,
        isVerified: true,
        certifications: ['Recycled', 'Biodegradable']
    },
    {
        id: '4',
        name: 'Reusable Metal Straw Set',
        brand: 'EcoSip',
        category: 'Kitchenware',
        image: 'https://stepstozerowaste.com/wp-content/uploads/2020/01/toothbrush-3.png',
        price: 299,
        ecoScore: 95,
        rating: 4.9,
        reviews: 150,
        isVerified: true,
        certifications: ['Plastic-Free', 'Zero Waste']
    },
    {
        id: '5',
        name: 'Compostable Phone Case',
        brand: 'GreenGadget',
        category: 'Electronics',
        image: 'https://www.johnsbyrne.com/wp-content/uploads/2014/09/Farmed-Here-013.jpg',
        price: 1599,
        ecoScore: 89,
        rating: 4.4,
        reviews: 45,
        isVerified: true,
        certifications: ['Compostable', 'Biodegradable']
    },
    {
        id: '6',
        name: 'Eco-Friendly Yoga Mat',
        brand: 'ZenEarth',
        category: 'Fitness',
        image: 'https://static1.squarespace.com/static/52536652e4b007332ef4ecf4/t/594602f0c534a57e3a0a21cf/1497760502920/',
        price: 2499,
        ecoScore: 91,
        rating: 4.7,
        reviews: 98,
        isVerified: true,
        certifications: ['Non-Toxic', 'Recyclable']
    },
    {
        id: '7',
        name: 'Recycled Wool Blanket',
        brand: 'EcoWarm',
        category: 'Home & Living',
        image: 'https://litextension.com/blog/wp-content/uploads/2023/08/image2.webp',
        price: 2799,
        ecoScore: 87,
        rating: 4.6,
        reviews: 55,
        isVerified: true,
        certifications: ['Recycled', 'Fair Trade']
    },
    {
        id: '8',
        name: 'Biodegradable Toothbrush',
        brand: 'GreenSmile',
        category: 'Personal Care',
        image: 'https://www.rescript.in/assets/uploads/inventory/pro_63d8ddada3ae34463.jpg',
        price: 199,
        ecoScore: 93,
        rating: 4.8,
        reviews: 210,
        isVerified: true,
        certifications: ['BPA-Free', 'Compostable']
    },
    {
        id: '9',
        name: 'Reusable Cotton Grocery Bag',
        brand: 'EcoCarry',
        category: 'Accessories',
        image: 'https://img.freepik.com/premium-photo/sustainable-elegance-ecofriendly-product-packaging-mockup-with-empty-white-spaces_839035-458684.jpg',
        price: 399,
        ecoScore: 96,
        rating: 4.9,
        reviews: 320,
        isVerified: true,
        certifications: ['Organic', 'Fair Trade']
    }
];

export const tipsData = [
    {
        id: 1,
        tip: "Use a reusable water bottle instead of single-use plastic bottles.",
        icon: "/assets/icons/milk.svg",
        impact: "Plastic bottles take 450 years to decompose and are a major source of ocean pollution.",
        tipCompleted: false
    },
    {
        id: 2,
        tip: "Unplug devices when not in use to save energy.",
        icon: "/assets/icons/plug.svg",
        impact: "Phantom energy consumption accounts for 10% of your electricity bill.",
        tipCompleted: false
    },
    {
        id: 3,
        tip: "Switch to energy-efficient LED light bulbs.",
        icon: "/assets/icons/lightbulb.svg",
        impact: "LED bulbs use 75% less energy than incandescent bulbs and last 25 times longer.",
        tipCompleted: false
    },
    {
        id: 4,
        tip: "Reduce meat consumption to lower your carbon footprint.",
        icon: "/assets/icons/leaf.svg",
        impact: "Animal agriculture is responsible for 14.5% of global greenhouse gas emissions.",
        tipCompleted: false
    },
    {
        id: 5,
        tip: "Plant a tree in your backyard to absorb CO₂ emissions.",
        icon: "/assets/icons/tree-pine.svg",
        impact: "A single tree can absorb 48 pounds of CO₂ per year.",
        tipCompleted: false
    },
    {
        id: 6,
        tip: "Use public transportation or carpool to reduce emissions.",
        icon: "/assets/icons/bus.svg",
        impact: "Carpooling with just one other person can cut your emissions in half.",
        tipCompleted: false
    }
]

export const communityInsights = [
    {
        id: 1,
        user: "JM",
        tip: "I've been using a reusable water bottle for 3 months now and haven't bought a single plastic bottle. It's easier than I thought!",
        date: "2 days ago"
    },
    {
        id: 2,
        user: "DK",
        tip: "I started unplugging my devices at night and noticed a decrease in my electricity bill last month!",
        date: "5 days ago"
    }
]    

export const ecoNews = [
    {
        link: 'https://en.wikipedia.org/wiki/Plastic_pollution',
        title: 'The Impact of Plastic Pollution',
        text: 'Learn how plastic affects our oceans and wildlife',
    },
    {
        link: 'https://blog.ridwell.com/blog/10-super-simple-plastic-swaps',
        title: '10 Easy Swaps for a Plastic-Free Life',
        text: 'Simple alternatives to common plastic items',
    },
    {
        link: 'https://en.wikipedia.org/wiki/Home_composting',
        title: 'How to Start Composting at Home',
        text: 'Turn food waste into garden gold',
    },
    {
        link: 'https://en.wikipedia.org/wiki/Sustainable_packaging',
        title: 'Sustainable packaging',
        text: 'Packaging materials and methods that result in improved sustainability.',
    }
]

export const progress = [
    {
        badge: '🌊',
        text: 'Water Saver',
    },
    {
        badge: '♻️',
        text: 'Recycling Pro',
    },
    {
        badge: '🔋',
        text: 'Energy Saver',
    },
    {
        badge: '🌱',
        text: 'Plant Parent',
    },
]

export const challenges:Challenges[] = [
    {
      id: '1',
      name: 'Zero Waste Week',
      description: 'Eliminate all single-use plastics from your daily routine for a week.',
      category: 'Waste',
      impactScore: 25,
      duration: 7,
      participants: 1243,
      isNew: false,
      image: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '2',
      name: 'Bike to Work',
      description: 'Replace your car commute with biking for two weeks to reduce carbon emissions.',
      category: 'Transport',
      impactScore: 35,
      duration: 14,
      participants: 876,
      isNew: false,
      image: 'https://images.unsplash.com/photo-1519583272095-6433daf26b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '3',
      name: 'Meatless Month',
      description: 'Go vegetarian for a month to reduce your carbon footprint and water usage.',
      category: 'Food',
      impactScore: 50,
      duration: 30,
      participants: 542,
      isNew: false,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '4',
      name: 'Energy Saver',
      description: 'Reduce your home energy consumption by 20% through simple daily habits.',
      category: 'Energy',
      impactScore: 20,
      duration: 21,
      participants: 1567,
      isNew: true,
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '5',
      name: 'Tree Planting Initiative',
      description: 'Plant a tree each week for a month to help combat climate change.',
      category: 'Environmental',
      impactScore: 45,
      duration: 28,
      participants: 328,
      isNew: true,
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '6',
      name: 'Water Conservation',
      description: 'Reduce your daily water usage by implementing water-saving techniques.',
      category: 'Environmental',
      impactScore: 15,
      duration: 14,
      participants: 921,
      isNew: false,
      image: 'https://images.unsplash.com/photo-1527100673774-cce25eafaf7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '7',
      name: 'Plastic-Free Shopping',
      description: 'Shop without bringing home any plastic packaging for two weeks.',
      category: 'Waste',
      impactScore: 40,
      duration: 14,
      participants: 432,
      isNew: false,
      image: 'https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '8',
      name: 'Public Transport Challenge',
      description: 'Use only public transportation for all your travel needs for a month.',
      category: 'Transport',
      impactScore: 30,
      duration: 30,
      participants: 654,
      isNew: true,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
];

export const userChallenges: UserChallenge[] = [
    {
      challengeId: '1',
      progress: 57,
      startDate: '2025-04-10',
      dailyLogs: [
        { date: '2025-04-10', completed: true, note: 'Used reusable bags for grocery shopping' },
        { date: '2025-04-11', completed: true, note: 'Brought my own coffee cup to work' },
        { date: '2025-04-12', completed: true, note: 'Used glass containers for leftovers' },
        { date: '2025-04-13', completed: true, note: 'Skipped plastic bags today ✅' },
      ],
      completed: false
    },
    {
      challengeId: '4',
      progress: 33,
      startDate: '2025-04-05',
      dailyLogs: [
        { date: '2025-04-05', completed: true, note: 'Turned off all lights when not in use' },
        { date: '2025-04-06', completed: true, note: 'Unplugged chargers when not charging' },
        { date: '2025-04-07', completed: true, note: 'Used natural light instead of artificial when possible' },
        { date: '2025-04-08', completed: false, note: 'Forgot to turn off the TV when leaving the room' },
        { date: '2025-04-09', completed: true, note: 'Adjusted thermostat to save energy' },
        { date: '2025-04-10', completed: true, note: 'Air-dried clothes instead of using dryer' },
        { date: '2025-04-11', completed: true, note: 'Used energy-efficient settings on appliances' },
      ],
      completed: false
    },

];



export const posts = [
    {
        id: 1,
        user: {
            name: 'Sarah Green',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
            badge: '🌱 Eco Warrior'
        },
        content: 'Just completed my first zero-waste month! Amazing how much plastic we can avoid with just a few simple changes. 🌍',
        likes: 124,
        comments: 18,
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800'
    },
    {
        id: 2,
        user: {
            name: 'Mike Rivers',
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150',
            badge: '🌿 Nature Guardian'
        },
        content: 'Led a successful beach cleanup today! Together we collected over 100kg of plastic waste. Every small action counts! 🌊',
        likes: 89,
        comments: 12,
        image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800'
    },
    {
        id: 3,
        user: {
        name: 'Emily Woods',
        avatar: 'https://images.unsplash.com/photo-1525130413817-d45c1d127c42?w=150',
        badge: '🌻 Sustainable Enthusiast'
        },
        content: 'Started composting at home, and I can already see the difference! Less waste, healthier plants. 🌱 #SustainableLiving',
        likes: 75,
        comments: 10,
        image: 'https://images.unsplash.com/photo-1571652467033-371b5ad9d1f7?w=800'
    },
    {
        id: 4,
        user: {
        name: 'James Carter',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
        badge: '🌿 Eco Advocate'
        },
        content: 'Switched to a plant-based diet this month! Feeling great and reducing my carbon footprint at the same time. 🥗🌎',
        likes: 102,
        comments: 14,
        image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800'
    },
    {
        id: 5,
        user: {
        name: 'Sophia Martinez',
        avatar: 'https://images.unsplash.com/photo-1519709041909-b130b5821107?w=150',
        badge: '🌍 Earth Defender'
        },
        content: 'DIY eco-friendly cleaning products are a game-changer! No more harsh chemicals, and my home smells amazing. 🍋✨',
        likes: 58,
        comments: 8,
        image: 'https://images.unsplash.com/photo-1574180566231-6814c417d4a7?w=800'
    },
    {
        id: 6,
        user: {
        name: 'Daniel Lee',
        avatar: 'https://images.unsplash.com/photo-1546525848-3ce03ca516f6?w=150',
        badge: '🌱 Green Innovator'
        },
        content: 'Installed solar panels on my roof! Excited to harness the power of the sun and reduce my electricity bills. ☀️⚡',
        likes: 150,
        comments: 22,
        image: 'https://images.unsplash.com/photo-1550565118-3a14e911ade0?w=800'
    },
    {
        id: 7,
        user: {
        name: 'Olivia Bennet',
        avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150',
        badge: '🌊 Ocean Protector'
        },
        content: 'Refilled my water bottle instead of buying plastic ones. Small habits lead to big changes! 💙 #PlasticFree',
        likes: 68,
        comments: 6,
        image: 'https://images.unsplash.com/photo-1555820585-a9552435a8e1?w=800'
    },
    {
        id: 8,
        user: {
        name: 'William Parker',
        avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150',
        badge: '🌾 Zero Waste Champion'
        },
        content: 'Tried a zero-waste grocery shopping challenge. Love the idea of bringing my own containers and avoiding plastic! ♻️',
        likes: 92,
        comments: 11,
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800'
    },
    {
        id: 9,
        user: {
        name: 'Ava Thompson',
        avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=150',
        badge: '🌱 Eco Ambassador'
        },
        content: 'Repurposed old clothes into reusable shopping bags! Fashion meets sustainability. 👜💚',
        likes: 47,
        comments: 5,
        image: 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e971a?w=800'
    },
    {
        id: 10,
        user: {
        name: 'Liam Roberts',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
        badge: '🌍 Green Warrior'
        },
        content: 'Planted 20 trees this weekend! Let’s make our planet greener together. 🌳🌿 #Reforestation',
        likes: 133,
        comments: 19,
        image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800'
    },
    {
        id: 11,
        user: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        badge: '🐝 Pollinator Protector'
        },
        content: 'Built a bee-friendly garden! These little pollinators need our help. 🐝🌸 #SaveTheBees',
        likes: 86,
        comments: 9,
        image: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=800'
    },
    {
        id: 12,
        user: {
        name: 'Noah Bennett',
        avatar: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=150',
        badge: '🌱 Climate Crusader'
        },
        content: 'Rode my bike instead of driving today. Less pollution, more exercise! 🚲🌎',
        likes: 55,
        comments: 7,
        image: 'https://images.unsplash.com/photo-1592496431122-65b6b7b7d869?w=800'
    }
];

export const avatarPlaceholderUrl =
"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";