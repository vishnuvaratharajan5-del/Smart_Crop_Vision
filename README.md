# Plant Leaf Disease Identifier 🌿

An interactive, user-friendly AI-powered plant leaf disease diagnostic analyzer and crop care companion. Snap a photo of a sick plant leaf or select a prebaked demo sample to instantly identify pathogens, assess threat levels, and receive professional eco-safe/chemical treatment plans.

---

### 🌐 Access the Application
* **Development Preview Link:** [Launch App Preview](https://ais-dev-jy3cxdqq5fcpvoysib7rup-354974988284.asia-southeast1.run.app)
* **Shared Production Link:** [Launch Shared App](https://ais-pre-jy3cxdqq5fcpvoysib7rup-354974988284.asia-southeast1.run.app)

---

## ✨ Features
1. **Diagnosis Lab:** Upload high-resolution images or drop leaf files in real-time to analyze spotting patterns, mold growth, or tissue discoloration.
2. **Plant Care Library (Wiki):** A built-in plant disease wiki where you can instantly search for crop conditions, discover organic solutions, chemical cures, and learn standard preventative strategies.
3. **Smart Demo Mode:** Equipped with deterministic simulations of common diseases (Blight, Black Rot, Powdery Mildew, Apple Scab, and Healthy Tissue) allowing seamless evaluation even without an API Key configured.
4. **Live Gemini 3.5 AI Integration:** Powering agronomist-grade scans on user-uploaded custom foliage when a `GEMINI_API_KEY` is provided in the environment.

---

## 📖 Step-by-Step Instructions

### Step 1: Launch the Application
Open the application using either of the preview links above. The interface is optimized to be clean, responsive, and easy to use on both mobile phones and desktop displays.

### Step 2: Choose Your Mode
* **Demo Mode (On by default):** Best for checking out how the app works instantly! Allows you to analyze our sample leaves (Tomato Late Blight, Grape Black Rot, Healthy Potato) or any custom upload through our high-fidelity botanist simulation.
* **Live AI Mode:** Toggle "Demo Mode" **OFF** inside the *Load Plant Leaf* card. This enables the server-side Gemini 3.5 model to perform live, dynamic vision scans on your custom uploads. *(Note: Requires your `GEMINI_API_KEY` to be entered under Settings > Secrets).*

### Step 3: Analyze a Leaf
1. **Using Demo Samples:** Click on any of the three preloaded leaf pictures in the **Try Sample Leaf Images** panel. The application will instantly load the image and present a complete agronomist diagnostic report.
2. **Using Your Own Photo:** 
   - Click inside the dotted drag-and-drop zone to open your camera/file explorer, or drag and drop a valid picture file (`PNG`, `JPG`, `JPEG`).
   - Click the **Identify Disease** button. 
   - A pulsing scanner bar will read the leaf tissue structure and return the result.

### Step 4: Review the Diagnostic Report
When the analysis finishes, the **Diagnosis Lab Report** displays:
- **Pathogen & Crop Category:** The identified scientific species/plant variety and disease name.
- **Threat Level Badge:** High, Medium, or Low threat indicators based on physical severity.
- **AI Confidence Rating:** Percent accuracy of the vision match.
- **Summary & Key Symptoms:** An easy-to-understand breakdown of what is wrong.
- **Immediate Treatment Plan:** Clear, step-by-step guides separating **Organic Eco-Safe Remedies** from standard **Chemical Treatments**.
- **Recurrence Preventions:** Proactive gardening advice to keep the pathogen from coming back.

### Step 5: Explore the Plant Care Library
Switch to the **Plant Care Library** tab at the top of the screen to search the botanical database:
- Enter any search keyword (like "Tomato", "Grape", "Mildew").
- Browse diseases to read full, detailed care sheets for immediate gardening reference.
