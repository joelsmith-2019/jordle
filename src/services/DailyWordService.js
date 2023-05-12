// The dialy word service returns a new word every day.
let words = [
    "front",
    "south",
    "sport",
    "clerk",
    "heavy",
    "false",
    "heart",
    "basin",
    "sweat",
    "straw",
    "enjoy",
    "brink",
    "apple",
    "drink",
    "house",
    "story",
    "bowel",
    "trust",
    "gaffe",
    "haunt",
    "knock",
    "money",
    "proof",
    "seize",
    "dress",
    "brave",
    "witch",
    "alive",
    "wagon",
    "weave",
    "sword",
    "begin",
    "ratio",
    "frank",
    "tooth",
    "jewel",
    "chain",
    "shift",
    "entry",
    "break",
    "taste",
    "toast",
    "thank",
    "force",
    "quest",
    "funny",
    "table",
    "crown",
    "pitch",
    "brush",
    "cover",
    "ideal",
    "woman",
    "study",
    "coach",
    "fraud",
    "fever",
    "solid",
    "grain",
    "shake",
    "stand",
    "fault",
    "hobby",
    "enfix",
    "humor",
    "liver",
    "glare",
    "eject",
    "elbow",
    "rifle",
    "first",
    "feign",
    "pound",
    "trend",
    "small",
    "touch",
    "plain",
    "shaft",
    "mouth",
    "ridge",
    "troop",
    "theme",
    "glide",
    "drama",
    "fruit",
    "flesh",
    "moral",
    "bible",
    "tribe",
    "amber",
    "attic",
    "round",
    "brand",
    "belly",
    "month",
    "pause",
    "party",
    "voter",
    "ranch",
    "leave",
    "chief",
    "lobby",
    "trace",
    "large",
    "quiet",
    "pride",
    "ankle",
    "score",
    "prove",
    "climb",
    "dream",
    "river",
    "slant",
    "honor",
    "basic",
    "ferry",
    "guard",
    "guilt",
    "tough",
    "lover",
    "brain",
    "obese",
    "crime",
    "visit",
    "enter",
    "glory",
    "debut",
    "cheek",
    "tired",
    "ditch",
    "sweet",
    "coast",
    "patch",
    "grand",
    "fibre",
    "bland",
    "chase",
    "leash",
    "clear",
    "scale",
    "petty",
    "prize",
    "green",
    "angle",
    "beach",
    "cower",
    "bread",
    "trail",
    "metal",
    "amuse",
    "panel",
    "press",
    "choke",
    "teach",
    "thick",
    "quote",
    "linen",
    "error",
    "train",
    "outer",
    "queen",
    "sight",
    "route",
    "chaos",
    "greet",
    "irony",
    "eagle",
    "curve",
    "final",
    "north",
    "paint",
    "style",
    "berry",
    "dozen",
    "allow",
    "split",
    "stage",
    "rally",
    "stain",
    "swipe",
    "whole",
    "count",
    "crash",
    "owner",
    "wrist",
    "adopt",
    "delay",
    "refer",
    "think",
    "image",
    "dance",
    "smart",
    "elect",
    "spend",
    "mayor",
    "clean",
    "peace",
    "queue",
    "colon",
    "ivory",
    "screw",
    "decay",
    "paper",
    "agony",
    "ghost",
    "trait",
    "upset",
    "index",
    "glass",
    "equal",
    "creed",
    "write",
    "fleet",
    "aloof",
    "guide",
    "board",
    "cause",
    "swarm",
    "blade",
    "noise",
    "share",
    "pluck",
    "charm",
    "fresh",
    "burst",
    "pupil",
    "laser",
    "tread",
    "alarm",
    "wound",
    "fence",
    "slide",
    "orbit",
    "shock",
    "youth",
    "gloom",
    "shell",
    "movie",
    "shoot",
    "order",
    "carve",
    "adult",
    "shine",
    "snake",
    "radio",
    "power",
    "organ",
    "rebel",
    "voice",
    "relax",
    "sense",
    "claim",
    "merit",
    "miner",
    "thumb",
    "agree",
    "tasty",
    "frown",
    "trick",
    "forge",
    "range",
    "smile",
    "theft",
    "match",
    "plane",
    "glove",
    "plant",
    "blank",
    "acute",
    "sharp",
    "aisle",
    "uncle",
    "stamp",
    "grave",
    "frame",
    "urine",
    "slime",
    "dough",
    "floor",
    "steam",
    "rough",
    "swear",
    "Venus",
    "cheat",
    "swell",
    "marsh",
    "catch",
    "check",
    "lodge",
    "grass",
    "ready",
    "cable",
    "still",
    "chart",
    "sheet",
    "knife",
    "store",
    "stool",
    "right",
    "quota",
    "blame",
    "feast",
    "basis",
    "arise",
    "cater",
    "state",
    "beard",
    "major",
    "limit",
    "virus",
    "hover",
    "court",
    "penny",
    "worth",
    "disco",
    "essay",
    "young",
    "reign",
    "print",
    "drive",
    "admit",
    "stake",
    "scrap",
    "spoil",
    "video",
    "drill",
    "waste",
    "rumor",
    "price",
    "budge",
    "spray",
    "space",
    "medal",
    "strip",
    "trunk",
    "noble",
    "stall",
    "grief",
    "forum",
    "grant",
    "onion",
    "angel",
    "steep",
    "faint",
    "flush",
    "smash",
    "guess",
    "trial",
    "tempt",
    "sniff",
    "cycle",
    "night",
    "color",
    "flood",
    "nerve",
    "groan",
    "tease",
    "snail",
    "learn",
    "harsh",
    "waist",
    "embox",
    "widen",
    "chord",
    "proud",
    "lemon",
    "shark",
    "dirty",
    "swing",
    "salad",
    "class",
    "drain",
    "sting",
    "skate",
    "offer",
    "motif",
    "carry",
    "means",
    "agent",
    "watch",
    "Koran",
    "stuff",
    "blind",
    "elite",
    "shape",
    "trade",
    "sheep",
    "slave",
    "cruel",
    "bleed",
    "smoke",
    "abuse",
    "award",
    "equip",
    "shame",
    "yearn",
    "fight",
    "chair",
    "drift",
    "brake",
    "bacon",
    "cheap",
    "abbey",
    "breed",
    "truck",
    "wreck",
    "crowd",
    "crack",
    "tower",
    "creep",
    "value",
    "rugby",
    "torch",
    "asset",
    "handy",
    "tight",
    "plead",
    "union",
    "giant",
    "total",
    "model",
    "arena",
    "level",
    "other",
    "field",
    "album",
    "steak",
    "scene",
    "great",
    "bring",
    "exact",
    "bench",
    "raise",
    "slice",
    "spill",
    "anger",
    "sugar",
    "salon",
    "place",
    "track",
    "grind",
    "speed",
    "bless",
    "build",
    "favor",
    "clock",
    "cross",
    "lease",
    "stick",
    "light",
    "enemy",
    "width",
    "steel",
    "mercy",
    "shelf",
    "twist",
    "fairy",
    "joint",
    "flour",
    "spell",
    "piano",
    "kneel",
    "bride",
    "flock",
    "strap",
    "utter",
    "unity",
    "smell",
    "chalk",
    "cabin",
    "float",
    "opera",
    "vague",
    "tract",
    "flash",
    "pilot",
    "storm",
    "chest",
    "cream",
    "block",
    "deter",
    "arrow",
    "start",
    "spare",
    "stock",
    "doubt",
    "shout",
    "graze",
    "black",
    "guest",
    "valid",
    "draft",
    "siege",
    "evoke",
    "point",
    "serve",
    "sleep",
    "child",
    "panic",
    "spite",
    "piece",
    "terms",
    "minor",
    "donor",
    "clash",
    "issue",
    "sweep",
    "punch",
    "tense",
    "short",
    "fling",
    "death",
    "craft",
    "judge",
    "ample",
    "title",
    "slump",
    "white",
    "wrong",
    "snarl",
    "novel",
    "jelly",
    "tiger",
    "horse",
    "march",
    "blast",
    "muggy",
    "worry",
    "truth",
    "layer",
    "agile",
    "spine",
    "water",
    "grace",
    "brown",
    "wheat",
    "throw",
    "suite",
    "drown",
    "reach",
    "mouse",
    "exile",
    "habit",
    "lunch",
    "awful",
    "rider",
    "robot",
    "shave",
    "snack",
    "dairy",
    "faith",
    "brick",
    "weigh",
    "aware",
    "solve",
    "wheel",
    "treat",
    "crude",
    "staff",
    "sound",
    "loose",
    "world",
    "close",
    "braid",
    "thigh"
];

// Define daily word service
const DailyWordService = {

    // Get the daily word
    getDailyWord: async () => {

        // Start date (april 20, 2023)
        let startMillis = new Date(2023, 3, 20).getTime();

        // Get time since epoch
        let currentMillis = new Date().getTime();

        // Get number of days since startMillis
        let daysSince = Math.floor((currentMillis - startMillis) / (1000 * 3600 * 24));

        // Get the word
        let word = words.length > 0 ? words[daysSince % words.length] : "cutie";

        // Log the word
        // console.log("Days since", daysSince);
        // console.log(word);

        // Return the word
        return word;
    }
};

// Export the service
export default DailyWordService;