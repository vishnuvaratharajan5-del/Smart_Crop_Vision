import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Leaf,
  Camera,
  Info,
  UploadCloud,
  RotateCcw,
  RefreshCw,
  Search,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Sprout,
  ArrowRight,
  HelpCircle,
  Eye,
  Check,
} from "lucide-react";
import { DiagnosisReport, DiseaseWikiEntry } from "./types";

// Import locally generated custom sample images representing the user's provided images
import grapeRotImg from "./assets/images/grape_black_rot_1782459153697.jpg";
import tomatoBlightImg from "./assets/images/tomato_blight_1782459141632.jpg";
import potatoHealthyImg from "./assets/images/potato_healthy_1782459127496.jpg";

// Static botanical dictionary database for searchable care sheets
const CROP_WIKI_DATABASE: DiseaseWikiEntry[] = [
  {
    name: "Black Rot",
    crop: "Grape (Vitis vinifera)",
    description: "A highly destructive fungal disease caused by Guignardia bidwellii. It attacks all green parts of the vine, including leaves, young shoots, and berries. It turns healthy grapes into shriveled, hard black mummies, severely ruining grape harvests.",
    symptoms: [
      "Small, round reddish-brown spots on the upper leaf surface.",
      "A circle of tiny black dots (spore-producing bodies) forming inside leaf spots.",
      "Sunken, dark brown lesions on the stems or leaf stalks.",
      "Grapes turning brown, shriveling rapidly, and transforming into wrinkled black mummies."
    ],
    organicTreatments: [
      "Prune and burn/destroy all infected canes and shriveled grape mummies to reduce spores.",
      "Apply copper-based sprays (such as Bordeaux mixture) early in the growing season.",
      "Spray organic biofungicides containing Bacillus subtilis to prevent spore germination."
    ],
    chemicalTreatments: [
      "Apply targeted systemic fungicides containing Myclobutanil during early spring.",
      "Use protective fungicides like Mancozeb at bud break and early bloom intervals."
    ],
    preventions: [
      "Choose resistant grape varieties if planting new vines.",
      "Prune vines properly to improve ventilation and allow wet leaves to dry quickly.",
      "Remove weeds beneath the canopy to lower humidity levels."
    ]
  },
  {
    name: "Late Blight",
    crop: "Tomato & Potato (Solanum)",
    description: "Late blight is caused by Phytophthora infestans, a devastating plant mold pathogen. This disease thrives in cool, humid weather and spreads incredibly fast, capable of destroying entire gardens or crop fields in just a few days.",
    symptoms: [
      "Large, irregular water-soaked dark spots on leaves that turn brown or black.",
      "A delicate, white fuzzy mold visible on the underside of leaves during damp mornings.",
      "Dark, greasy-looking lesions on leaf stems and fruit.",
      "Complete collapse and rotting of leaves, turning them paper-thin and brittle."
    ],
    organicTreatments: [
      "Immediately pull up, bag, and discard infected plants. Do not compost them.",
      "Apply copper soap (copper octanoate) sprays on surrounding healthy crops.",
      "Apply organic microbial sprays to shield uninfected foliage from airborne spores."
    ],
    chemicalTreatments: [
      "Apply preventative fungicides containing Chlorothalonil before cool, wet weather arrives.",
      "Deploy systemic water-mold treatments if an outbreak is reported in your area."
    ],
    preventions: [
      "Water plants directly at the soil level (drip irrigation) to keep leaves dry.",
      "Leave wide spacing between tomato plants to maximize sunlight and breeze.",
      "Plant blight-resistant tomato cultivars."
    ]
  },
  {
    name: "Powdery Mildew",
    crop: "Squash, Apple & Others",
    description: "A common fungal disease caused by various species. It leaves a distinctive dusty, white powder on leaf surfaces, block sunlight, and stunts plant development.",
    symptoms: [
      "White, powdery patches resembling flour on leaves, stems, and blossoms.",
      "Leaves curling upward, drying out, and dropping off early.",
      "Stunted growth of new shoots and leaves.",
      "Fruit or buds covered in fine, white powdery dust."
    ],
    organicTreatments: [
      "Mix 1 tablespoon of baking soda and 1 teaspoon of organic neem oil in a gallon of water and spray.",
      "Apply organic milk sprays (40% milk, 60% water) on leaves in bright, warm sunlight.",
      "Use potassium bicarbonate sprays to break down the active fungal walls."
    ],
    chemicalTreatments: [
      "Apply sulfur-based or copper fungicides at the first sign of mildew.",
      "Use systemic fungicides like Myclobutanil during active vegetative growth."
    ],
    preventions: [
      "Plant crops in areas with full, direct sunlight to discourage mold growth.",
      "Select mildew-resistant seeds and plants.",
      "Avoid over-fertilizing with nitrogen, which creates weak, susceptible new growth."
    ]
  },
  {
    name: "Leaf Spot (Septoria)",
    crop: "Tomato & Pepper",
    description: "An aggressive fungal disease caused by Septoria lycopersici. It typically starts on the bottom leaves nearest the ground, climbing up the plant and causing severe leaf drop, which leaves the fruit vulnerable to sun damage.",
    symptoms: [
      "Dozens of tiny, circular gray-brown spots with dark, rigid borders.",
      "Small black specks visible inside the pale gray centers of leaf spots.",
      "Bottom leaves turning yellow, turning brittle, and dropping off.",
      "Defoliation rising up the plant, leaving the stems mostly bare at the bottom."
    ],
    organicTreatments: [
      "Prune off and safely discard all infected lower leaves to stop the upward climb.",
      "Apply copper-based organic fungicides thoroughly over the whole plant.",
      "Thickly mulch the ground beneath the plants to prevent soil spores from splashing up."
    ],
    chemicalTreatments: [
      "Apply fungicides containing Mancozeb or Chlorothalonil every 7 to 10 days in humid weather."
    ],
    preventions: [
      "Practice a strict crop rotation: never plant tomatoes, peppers, or potatoes in the same soil back-to-back.",
      "Water crops only in the morning so they dry fully before sunset.",
      "Sanitize support stakes and tomato cages at the end of every season."
    ]
  },
  {
    name: "Healthy Leaf",
    crop: "All Plant Species",
    description: "The leaf is in optimal physiological health. Chlorophyll production is high, turgor pressure is firm, and the leaf tissue is entirely free from fungal pathogens, bacteria, or decay.",
    symptoms: [
      "Deep, uniform green coloration without any spots or yellowing.",
      "Crisp, firm leaf margins with rigid, healthy veins.",
      "No trace of powdery dust, dark lesions, or rotting stems."
    ],
    organicTreatments: [
      "No disease treatment required! Keep up the great work.",
      "Feed periodically with organic compost tea or compost mulching to preserve soil vitality."
    ],
    chemicalTreatments: [
      "Strictly no chemicals or fungicides required. Enjoy clean, organic growth."
    ],
    preventions: [
      "Water consistently, keeping soil damp but not waterlogged.",
      "Scout your plants' lower leaves once a week to catch any potential spots early.",
      "Support robust soil biology by layering organic compost."
    ]
  }
];

// Visual cards of pre-loaded leaf examples for easy, instant testing
const DEMO_SAMPLES = [
  {
    id: "sample_grape_rot",
    name: "Grape (Black Rot)",
    imageUrl: grapeRotImg,
    mimeType: "image/jpeg",
    report: {
      cropName: "Grape (Vitis vinifera)",
      condition: "Black Rot (Guignardia bidwellii)",
      confidence: 0.94,
      severity: "High",
      summary: "This grape leaf shows circular reddish-brown spots with dark brown outer rings. Inside the spots, tiny black dots are clustered, which is a classic visual signature of active Black Rot.",
      symptoms: [
        "Reddish-brown circular spots with dark brown outer margins.",
        "Tiny black spore-producing dots (pycnidia) clustered inside the leaf spots.",
        "Slight leaf distortion around the infected sections."
      ],
      treatments: {
        organic: [
          "Carefully prune and bury/burn all infected canes and shriveled grape mummies.",
          "Apply liquid copper or sulfur-based biological sprays early in the morning.",
          "Apply bio-fungicides to suppress spore germination on adjacent leaves."
        ],
        chemical: [
          "Apply targeted systemic fungicides containing Myclobutanil.",
          "Spray protective contact fungicides like Mancozeb during warm, humid intervals."
        ]
      },
      preventions: [
        "Prune vines generously to promote air movement and fast leaf drying.",
        "Keep grape clusters and bottom leaves clear of direct ground contact.",
        "Examine leaves weekly, especially after rainstorms."
      ]
    }
  },
  {
    id: "sample_tomato_blight",
    name: "Tomato Leaf (Late Blight)",
    imageUrl: tomatoBlightImg,
    mimeType: "image/jpeg",
    report: {
      cropName: "Tomato (Solanum lycopersicum)",
      condition: "Late Blight (Phytophthora infestans)",
      confidence: 0.89,
      severity: "High",
      summary: "Severe water-soaked, dark grayish-brown lesions are climbing across the leaf margins. This fast-spreading water-mold pathogen thrives in damp weather and can destroy the plant quickly.",
      symptoms: [
        "Large, irregular greasy-looking spots starting at the leaf tips.",
        "Pale white, fuzzy mold growth on the undersides of damp leaves.",
        "Rapid leaf collapse and dark brown, soft stems."
      ],
      treatments: {
        organic: [
          "Uproot, bag, and immediately remove the entire infected plant from your garden.",
          "Spray copper octanoate (copper soap) on neighboring plants to protect them.",
          "Apply biofungicide sprays to guard healthy foliage."
        ],
        chemical: [
          "Spray a preventive fungicide like Chlorothalonil immediately.",
          "Use systemic water-mold treatments if blight outbreaks are active nearby."
        ]
      },
      preventions: [
        "Always irrigate at the plant base (avoid overhead watering).",
        "Space plants at least 3 feet apart to let leaves dry easily.",
        "Plant certified blight-resistant tomato hybrids."
      ]
    }
  },
  {
    id: "sample_healthy_potato",
    name: "Potato Leaf (Healthy)",
    imageUrl: potatoHealthyImg,
    mimeType: "image/jpeg",
    report: {
      cropName: "Potato (Solanum tuberosum)",
      condition: "Healthy Leaf",
      confidence: 0.98,
      severity: "None",
      summary: "This potato leaf sample shows excellent physiological health. The veins are robust, colors are a rich, uniform green indicating great chlorophyll, and there are no disease spots.",
      symptoms: [
        "Deep, uniform green color across the entire leaf.",
        "Firm, hydrated leaf structure with strong veins.",
        "Leaf margins are perfectly intact with zero spots or yellowing."
      ],
      treatments: {
        organic: [
          "No disease treatments needed! Maintain your normal garden schedule.",
          "Apply a light seaweed-based foliar spray to preserve leaf stamina."
        ],
        chemical: [
          "Strictly no chemical fungicides or sprays needed. Enjoy organic growth!"
        ]
      },
      preventions: [
        "Ensure consistent watering to prevent drought-related leaf stress.",
        "Inspect bottom leaves once a week to catch any early signs of blight.",
        "Rotate potato crop beds with peas or beans next season."
      ]
    }
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"diagnose" | "wiki">("diagnose");
  const [demoMode, setDemoMode] = useState<boolean>(true);

  // --- Diagnosis States ---
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedMimeType, setSelectedMimeType] = useState<string>("image/jpeg");
  const [diagnosis, setDiagnosis] = useState<DiagnosisReport | null>(null);
  const [diagnoseStatus, setDiagnoseStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [diagnoseError, setDiagnoseError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Wiki States ---
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedWikiEntry, setSelectedWikiEntry] = useState<DiseaseWikiEntry>(CROP_WIKI_DATABASE[0]);

  // Handle Drag & Drop
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG, JPG, or JPEG).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setSelectedImage(event.target.result as string);
        setSelectedMimeType(file.type);
        setDiagnosis(null);
        setDiagnoseStatus("idle");
        setDiagnoseError(null);
      }
    };
    reader.readAsDataURL(file);
  };

  // Select a pre-loaded sample
  const handleSelectDemoSample = (sampleId: string) => {
    const sample = DEMO_SAMPLES.find((s) => s.id === sampleId);
    if (sample) {
      setSelectedImage(sample.imageUrl);
      setSelectedMimeType(sample.mimeType);
      if (demoMode) {
        setDiagnosis(sample.report as DiagnosisReport);
        setDiagnoseStatus("success");
        setDiagnoseError(null);
      } else {
        setDiagnosis(null);
        setDiagnoseStatus("idle");
        setDiagnoseError(null);
      }
    }
  };

  // Run AI plant diagnosis
  const handleDiagnose = async () => {
    if (!selectedImage) return;

    setDiagnoseStatus("loading");
    setDiagnoseError(null);

    // If Demo Mode is ON and selected image matches a sample, load pre-built report instantly
    const matchedSample = DEMO_SAMPLES.find((s) => s.imageUrl === selectedImage);
    if (demoMode && matchedSample) {
      setTimeout(() => {
        setDiagnosis(matchedSample.report as DiagnosisReport);
        setDiagnoseStatus("success");
      }, 1500);
      return;
    }

    try {
      const response = await fetch("/api/diagnose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: selectedImage,
          mimeType: selectedMimeType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze leaf image.");
      }

      setDiagnosis(data);
      setDiagnoseStatus("success");
    } catch (err: any) {
      console.error(err);
      setDiagnoseError(err.message || "An error occurred during diagnosis. Is your server API key configured?");
      setDiagnoseStatus("error");
    }
  };

  // Clear diagnosis state
  const handleResetDiagnose = () => {
    setSelectedImage(null);
    setDiagnosis(null);
    setDiagnoseStatus("idle");
    setDiagnoseError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Filter wiki entries
  const filteredWiki = CROP_WIKI_DATABASE.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.crop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper for severity colors
  const getSeverityBadge = (severity: string) => {
    const s = severity?.toLowerCase() || "none";
    if (s === "high") {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
          <ShieldAlert className="w-3.5 h-3.5" />
          High Severity
        </span>
      );
    }
    if (s === "medium") {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
          <AlertTriangle className="w-3.5 h-3.5" />
          Medium Severity
        </span>
      );
    }
    if (s === "low") {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">
          <AlertTriangle className="w-3.5 h-3.5" />
          Low Severity
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Healthy / Safe
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans antialiased">
      {/* Visual Navigation Header */}
      <header className="border-b border-neutral-200 bg-white shadow-xs sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-600 rounded-xl text-white shadow-xs flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display tracking-tight text-neutral-900 flex items-center gap-2">
                Plant Leaf Disease Identifier
              </h1>
              <p className="text-xs text-neutral-500 font-medium">
                Instant Agronomist-Grade AI Leaf Scanning & Plant Care Guides
              </p>
            </div>
          </div>

          {/* Simple Tab Control */}
          <div className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-xl border border-neutral-200">
            <button
              id="tab-btn-diagnose"
              onClick={() => setActiveTab("diagnose")}
              className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 flex items-center gap-1.5 ${
                activeTab === "diagnose"
                  ? "bg-white text-emerald-800 shadow-xs"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Camera className="w-4 h-4" />
              Diagnosis Lab
            </button>
            <button
              id="tab-btn-wiki"
              onClick={() => setActiveTab("wiki")}
              className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 flex items-center gap-1.5 ${
                activeTab === "wiki"
                  ? "bg-white text-emerald-800 shadow-xs"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Plant Care Library
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* DIAGNOSIS TAB */}
        {activeTab === "diagnose" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Control Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Load Image Card */}
              <div id="card-load-image" className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-bold font-display text-neutral-900 flex items-center gap-2">
                    <UploadCloud className="w-5 h-5 text-emerald-600" />
                    Load Plant Leaf
                  </h2>

                  {/* Mode Selector Switch */}
                  <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    <span className="text-[11px] font-semibold text-emerald-800">
                      Demo Mode
                    </span>
                    <button
                      id="toggle-demo-mode"
                      onClick={() => {
                        setDemoMode(!demoMode);
                        setDiagnosis(null);
                        setDiagnoseStatus("idle");
                      }}
                      className={`relative inline-flex h-4.5 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                        demoMode ? "bg-emerald-600" : "bg-neutral-300"
                      }`}
                      title={demoMode ? "Disable demo simulation" : "Enable demo simulation"}
                    >
                      <span
                        className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                          demoMode ? "translate-x-3.5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-neutral-500 mb-4 leading-relaxed">
                  {demoMode
                    ? "Interactive Demo is ON. Clicking any sample leaf below instantly generates prebuilt diagnostic reports without requiring API Keys."
                    : "Interactive Demo is OFF. Upload custom garden photos to request a live, server-side Gemini 3.5 diagnostic scan."}
                </p>

                {/* Drop Stage */}
                <div
                  id="drop-zone"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 min-h-[180px] ${
                    isDragOver
                      ? "border-emerald-600 bg-emerald-50/50"
                      : "border-neutral-300 hover:border-emerald-500 hover:bg-neutral-50/40"
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />

                  {selectedImage ? (
                    <div className="relative w-full rounded-lg overflow-hidden flex items-center justify-center bg-neutral-100">
                      <img
                        src={selectedImage}
                        alt="Target Plant Leaf"
                        className="object-cover max-h-56 w-full rounded-lg"
                        referrerPolicy="no-referrer"
                      />
                      {/* Live scanning overlay line if active */}
                      {diagnoseStatus === "loading" && (
                        <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center">
                          <div className="w-full h-1 bg-emerald-500 absolute top-0 shadow-[0_0_15px_#10b981] animate-[bounce_2s_infinite]" />
                          <div className="p-3 bg-white/90 rounded-full shadow-md animate-bounce">
                            <Leaf className="w-6 h-6 text-emerald-600 animate-pulse" />
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                        Click to Replace Image
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="p-3 bg-neutral-100 rounded-full text-neutral-500">
                        <Camera className="w-6 h-6 text-neutral-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-neutral-800">
                          Drag leaf image here, or <span className="text-emerald-600">browse file</span>
                        </p>
                        <p className="text-[11px] text-neutral-400 mt-1 font-mono">
                          Supports PNG, JPG, JPEG
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Control Action Buttons */}
                {selectedImage && (
                  <div className="mt-4 flex gap-3">
                    <button
                      id="btn-clear-image"
                      onClick={handleResetDiagnose}
                      className="flex-1 px-4 py-2.5 border border-neutral-300 rounded-xl text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-colors duration-150 flex items-center justify-center gap-1.5"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Clear
                    </button>
                    <button
                      id="btn-run-diagnosis"
                      onClick={handleDiagnose}
                      disabled={diagnoseStatus === "loading"}
                      className="flex-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all duration-150 flex items-center justify-center gap-2 disabled:bg-neutral-400 cursor-pointer"
                    >
                      {diagnoseStatus === "loading" ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Scanning Spots & Veins...
                        </>
                      ) : (
                        <>
                          <Sprout className="w-4 h-4" />
                          Identify Disease
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Sample Plant Leaf Library Cards */}
              <div id="card-scouting-samples" className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs">
                <h3 className="text-sm font-bold font-display text-neutral-900 mb-3 flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-emerald-600" />
                  Try Sample Leaf Images
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {DEMO_SAMPLES.map((sample) => {
                    const isSelected = selectedImage === sample.imageUrl;
                    return (
                      <button
                        key={sample.id}
                        id={`sample-btn-${sample.id}`}
                        onClick={() => handleSelectDemoSample(sample.id)}
                        className={`group relative rounded-xl overflow-hidden border-2 text-left transition-all duration-150 ${
                          isSelected
                            ? "border-emerald-600 ring-2 ring-emerald-100"
                            : "border-neutral-200 hover:border-emerald-400"
                        }`}
                      >
                        <div className="aspect-square w-full bg-neutral-100 overflow-hidden">
                          <img
                            src={sample.imageUrl}
                            alt={sample.name}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="p-2 bg-white border-t border-neutral-100">
                          <p className="text-[10px] font-bold text-neutral-800 line-clamp-1">
                            {sample.name}
                          </p>
                          <p className="text-[9px] text-neutral-400 mt-0.5 line-clamp-1">
                            {sample.id.includes("healthy") ? "Healthy" : "Infected"}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 bg-emerald-600 text-white p-0.5 rounded-full">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Info Tip */}
              <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-4.5 flex gap-3">
                <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-900">How to snap leaf photos:</h4>
                  <ul className="text-[11px] text-emerald-800 mt-1 space-y-1 list-disc list-inside">
                    <li>Hold the camera steady in bright, indirect sunlight.</li>
                    <li>Ensure the main spots or leaf veins are clearly in focus.</li>
                    <li>Avoid busy backgrounds—place the leaf flat if possible.</li>
                  </ul>
                </div>
              </div>

            </div>

            {/* Right Diagnostic Result Column */}
            <div className="lg:col-span-7 flex flex-col">
              <AnimatePresence mode="wait">
                {diagnoseStatus === "idle" && !diagnosis && (
                  <motion.div
                    key="idle-state"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 bg-white rounded-2xl border border-neutral-200 p-12 text-center flex flex-col items-center justify-center min-h-[400px] shadow-xs"
                  >
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                      <Leaf className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold font-display text-neutral-900 mb-1">
                      Ready to Scan
                    </h3>
                    <p className="text-sm text-neutral-500 max-w-sm mb-6 leading-relaxed">
                      Upload a plant leaf image or tap one of our sample plant leaves on the left to run an instant disease diagnostic report.
                    </p>
                    <div className="flex flex-wrap gap-2.5 justify-center max-w-md">
                      {DEMO_SAMPLES.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => handleSelectDemoSample(s.id)}
                          className="px-3.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold rounded-lg text-neutral-700 transition-colors"
                        >
                          Scan {s.name.split(" ")[0]}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {diagnoseStatus === "loading" && (
                  <motion.div
                    key="loading-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 bg-white rounded-2xl border border-neutral-200 p-12 text-center flex flex-col items-center justify-center min-h-[400px] shadow-xs"
                  >
                    <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
                      <div className="absolute inset-0 border-4 border-emerald-100 rounded-full" />
                      <div className="absolute inset-0 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                      <Leaf className="w-6 h-6 text-emerald-600 animate-pulse" />
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 mb-1">
                      Scanning Plant Architecture
                    </h3>
                    <p className="text-xs text-neutral-500 max-w-xs animate-pulse leading-relaxed">
                      Analyzing leaf tissues, margins, lesions, and discoloration to verify pathogen signatures...
                    </p>
                  </motion.div>
                )}

                {diagnoseStatus === "error" && (
                  <motion.div
                    key="error-state"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 bg-white rounded-2xl border border-rose-200 p-8 text-center flex flex-col items-center justify-center min-h-[400px] shadow-xs"
                  >
                    <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mb-4">
                      <ShieldAlert className="w-7 h-7" />
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 mb-2">
                      Diagnostic Failed
                    </h3>
                    <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-xs text-rose-800 font-mono text-left max-w-md mb-6 break-words leading-relaxed">
                      {diagnoseError}
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleDiagnose}
                        className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-all"
                      >
                        Try Again
                      </button>
                      <button
                        onClick={() => setDemoMode(true)}
                        className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-bold transition-all"
                      >
                        Switch to Demo Mode
                      </button>
                    </div>
                  </motion.div>
                )}

                {diagnoseStatus === "success" && diagnosis && (
                  <motion.div
                    key="success-report"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs"
                  >
                    {/* Header Banner */}
                    <div className="p-6 bg-emerald-800 text-white border-b border-emerald-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 font-mono">
                          Diagnosed Plant Category: {diagnosis.cropName}
                        </p>
                        <h3 className="text-xl font-extrabold font-display tracking-tight text-white mt-1">
                          {diagnosis.condition}
                        </h3>
                      </div>
                      
                      {/* Severity Pill */}
                      <div>
                        {getSeverityBadge(diagnosis.severity)}
                      </div>
                    </div>

                    {/* Simulation Information Banner */}
                    {diagnosis.isSimulated && (
                      <div className="bg-amber-50 border-b border-amber-100 px-6 py-3.5 flex items-start gap-3">
                        <span className="text-amber-600 mt-0.5 shrink-0">
                          <AlertTriangle className="w-4 h-4" />
                        </span>
                        <p className="text-xs text-amber-800 leading-normal">
                          <span className="font-extrabold text-amber-900 uppercase tracking-wide mr-1.5 font-mono text-[10px] bg-amber-100 px-1.5 py-0.5 rounded">
                            Demo Active
                          </span>
                          High-fidelity botanical simulation activated. To enable real-time live AI leaf scanning on your custom image, add your <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold text-amber-950">GEMINI_API_KEY</code> in the <strong className="font-bold text-amber-900">Settings &gt; Secrets</strong> menu.
                        </p>
                      </div>
                    )}

                    {/* Report Main Content */}
                    <div className="p-6 space-y-6">
                      
                      {/* Confidence and Details Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                        <div>
                          <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">
                            AI Confidence Match
                          </p>
                          <div className="flex items-center gap-3 mt-1.5">
                            <div className="flex-1 h-2.5 bg-neutral-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                                style={{ width: `${Math.round(diagnosis.confidence * 100)}%` }}
                              />
                            </div>
                            <span className="text-xs font-extrabold text-neutral-800 font-mono">
                              {Math.round(diagnosis.confidence * 100)}%
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wide">
                            Pathogen Threat Level
                          </p>
                          <p className="text-sm font-bold text-neutral-800 mt-1 flex items-center gap-1.5">
                            <span className={`w-2.5 h-2.5 rounded-full ${
                              diagnosis.severity.toLowerCase() === "high"
                                ? "bg-rose-500"
                                : diagnosis.severity.toLowerCase() === "medium"
                                ? "bg-amber-500"
                                : diagnosis.severity.toLowerCase() === "low"
                                ? "bg-yellow-400"
                                : "bg-emerald-500"
                            }`} />
                            {diagnosis.severity}
                          </p>
                        </div>
                      </div>

                      {/* Summary Box */}
                      <div>
                        <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
                          Diagnosis Summary
                        </h4>
                        <p className="text-sm text-neutral-700 bg-emerald-50/40 p-4 rounded-xl border border-emerald-100/80 leading-relaxed">
                          {diagnosis.summary}
                        </p>
                      </div>

                      {/* Visual Symptoms Observed */}
                      {diagnosis.symptoms && diagnosis.symptoms.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2.5">
                            Observed Leaf Symptoms
                          </h4>
                          <div className="grid grid-cols-1 gap-2">
                            {diagnosis.symptoms.map((symptom, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm text-neutral-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                                <span className="leading-tight">{symptom}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Treatments and Action Plan */}
                      <div className="border-t border-neutral-100 pt-6">
                        <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">
                          Immediate Action & Treatment Plan
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          
                          {/* Organic Remedies */}
                          <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100">
                            <h5 className="text-xs font-extrabold text-emerald-900 flex items-center gap-1.5 mb-2.5">
                              <Sprout className="w-4 h-4 text-emerald-700" />
                              🌱 Organic Remedies (Eco-Safe)
                            </h5>
                            <div className="space-y-2">
                              {diagnosis.treatments.organic.map((item, i) => (
                                <p key={i} className="text-xs text-emerald-850 leading-relaxed flex gap-1.5">
                                  <span className="text-emerald-700 font-bold">•</span>
                                  {item}
                                </p>
                              ))}
                            </div>
                          </div>

                          {/* Chemical Remedies */}
                          <div className="bg-amber-50/30 rounded-xl p-4 border border-amber-100">
                            <h5 className="text-xs font-extrabold text-amber-900 flex items-center gap-1.5 mb-2.5">
                              <ShieldAlert className="w-4 h-4 text-amber-700" />
                              🧪 Chemical Treatments
                            </h5>
                            <div className="space-y-2">
                              {diagnosis.treatments.chemical.map((item, i) => (
                                <p key={i} className="text-xs text-amber-850 leading-relaxed flex gap-1.5">
                                  <span className="text-amber-700 font-bold">•</span>
                                  {item}
                                </p>
                              ))}
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Preventative Measures */}
                      {diagnosis.preventions && diagnosis.preventions.length > 0 && (
                        <div className="border-t border-neutral-100 pt-6 bg-neutral-50 -mx-6 -mb-6 p-6">
                          <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2.5">
                            How to Prevent Recurrence
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {diagnosis.preventions.map((prev, i) => (
                              <div key={i} className="flex gap-2 text-xs text-neutral-700 leading-relaxed">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{prev}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        )}

        {/* WIKI REFERENCE TAB */}
        {activeTab === "wiki" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Library Search & List */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              {/* Search Box */}
              <div id="wiki-search-card" className="bg-white rounded-2xl border border-neutral-200 p-4 shadow-xs">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                  <input
                    id="wiki-search-input"
                    type="text"
                    placeholder="Search plant or disease (e.g., Tomato)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all bg-neutral-50"
                  />
                </div>
              </div>

              {/* Disease Entry List */}
              <div className="flex flex-col gap-2.5">
                {filteredWiki.length > 0 ? (
                  filteredWiki.map((entry) => {
                    const isSelected = selectedWikiEntry.name === entry.name;
                    return (
                      <button
                        key={entry.name}
                        id={`wiki-btn-${entry.name.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={() => setSelectedWikiEntry(entry)}
                        className={`p-4 rounded-2xl border text-left transition-all duration-150 cursor-pointer ${
                          isSelected
                            ? "bg-white border-emerald-600 ring-2 ring-emerald-50 shadow-xs"
                            : "bg-white border-neutral-200 hover:border-emerald-400"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                            {entry.crop}
                          </span>
                          <ArrowRight className={`w-4 h-4 text-neutral-400 transition-transform ${
                            isSelected ? "translate-x-1 text-emerald-600" : ""
                          }`} />
                        </div>
                        <h4 className="text-sm font-bold text-neutral-900 mt-2">
                          {entry.name}
                        </h4>
                        <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                          {entry.description}
                        </p>
                      </button>
                    );
                  })
                ) : (
                  <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center text-neutral-500 text-xs">
                    No disease matching your search found. Try searching "Tomato" or "Blight".
                  </div>
                )}
              </div>
            </div>

            {/* Right Care Detail Panel */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedWikiEntry.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs"
                >
                  <div className="p-6 bg-emerald-800 text-white border-b border-emerald-900">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 font-mono bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-700/50">
                      CROP CATEGORY: {selectedWikiEntry.crop}
                    </span>
                    <h3 className="text-xl font-extrabold font-display tracking-tight text-white mt-3">
                      {selectedWikiEntry.name} Care Sheet
                    </h3>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Description */}
                    <div>
                      <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
                        Pathogen Description
                      </h4>
                      <p className="text-sm text-neutral-700 leading-relaxed bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                        {selectedWikiEntry.description}
                      </p>
                    </div>

                    {/* Symptoms List */}
                    <div>
                      <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2.5">
                        Key Identifying Symptoms
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {selectedWikiEntry.symptoms.map((sym, i) => (
                          <div key={i} className="flex gap-2.5 text-sm text-neutral-700 leading-relaxed">
                            <span className="text-emerald-600 font-bold mt-0.5 shrink-0">✓</span>
                            <span>{sym}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dual Action Treatment Columns */}
                    <div className="border-t border-neutral-100 pt-6">
                      <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">
                        Agronomist Recommended Treatments
                      </h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Organic Treatments */}
                        <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl">
                          <h5 className="text-xs font-extrabold text-emerald-900 flex items-center gap-1.5 mb-2">
                            <Sprout className="w-4 h-4 text-emerald-700" />
                            Organic Control
                          </h5>
                          <div className="space-y-2">
                            {selectedWikiEntry.organicTreatments.map((org, idx) => (
                              <p key={idx} className="text-xs text-emerald-850 leading-relaxed flex gap-1.5">
                                <span className="text-emerald-700 font-bold">•</span>
                                {org}
                              </p>
                            ))}
                          </div>
                        </div>

                        {/* Chemical Treatments */}
                        <div className="bg-amber-50/30 border border-amber-100 p-4 rounded-xl">
                          <h5 className="text-xs font-extrabold text-amber-900 flex items-center gap-1.5 mb-2">
                            <ShieldAlert className="w-4 h-4 text-amber-700" />
                            Chemical Control
                          </h5>
                          <div className="space-y-2">
                            {selectedWikiEntry.chemicalTreatments.map((chem, idx) => (
                              <p key={idx} className="text-xs text-amber-850 leading-relaxed flex gap-1.5">
                                <span className="text-amber-700 font-bold">•</span>
                                {chem}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Preventions */}
                    <div className="border-t border-neutral-100 pt-6 bg-neutral-50 -mx-6 -mb-6 p-6">
                      <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2.5">
                        Long-Term Preventions
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedWikiEntry.preventions.map((prev, i) => (
                          <div key={i} className="flex gap-2 text-xs text-neutral-700 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{prev}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
