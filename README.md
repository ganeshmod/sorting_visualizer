# ⬆ Sorting Algorithm Visualizer

> A production-ready DSA portfolio project — Java implementations + React interactive visualizer.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0055?logo=framer)
![Java](https://img.shields.io/badge/Java-17+-ED8B00?logo=openjdk)

---

## 📌 Project Overview

This project demonstrates **Data Structures & Algorithms knowledge in Java** alongside **frontend development skills in React.js**. Six sorting algorithms are implemented twice — once in clean, commented Java (for DSA showcase), and once in JavaScript generators that drive frame-by-frame animations.

Built to be added to a **frontend developer resume** and **GitHub portfolio**.

---

## ✨ Features

### Visualizer
- 🎨 Animated bar chart — real-time height and color transitions
- 🔴 **Red** = Comparing · 🟠 **Orange** = Swapping · 🟢 **Green** = Sorted · 🟡 **Yellow** = Pivot
- ▶ Start · ⏸ Pause · ▶ Resume · ↺ Reset · ⚡ New Array
- 🎚 Array size slider (10 – 100 elements)
- 🚀 Speed control (Slow → Turbo, 5 levels)
- 📊 Live statistics: Comparisons, Swaps, Execution Time
- 🧠 Algorithm info panel: description, time/space complexity, stability

### Algorithm Comparison Mode
- Run two algorithms **side-by-side** on the **same array**
- Compare comparisons, swaps, and execution time
- 🏆 Winner is highlighted automatically

### Complexity Reference Table
- Big-O reference for all 6 algorithms
- Color-coded: green = fast, yellow = medium, red = slow
- Best / Average / Worst / Space / Stable

### Sorting History
- Stores the last 10 sorting runs
- Shows: algorithm, array size, time taken, comparisons, swaps

---

## 🗂 Folder Structure

```
sorting-visualizer/
├── frontend/                        # React app (Vite + Tailwind + Framer Motion)
│   ├── src/
│   │   ├── algorithms/
│   │   │   └── sortingAlgorithms.js # JS generator implementations
│   │   ├── components/
│   │   │   ├── SortingBars.jsx      # Main animated bar visualization
│   │   │   ├── ControlPanel.jsx     # Algorithm selector, sliders, buttons
│   │   │   ├── StatsPanel.jsx       # Live stats and complexity display
│   │   │   ├── AlgorithmInfo.jsx    # Description card
│   │   │   ├── ComparisonMode.jsx   # Side-by-side comparison
│   │   │   ├── ComplexityChart.jsx  # Big-O reference table
│   │   │   ├── SortingHistory.jsx   # Last 10 runs log
│   │   │   └── Header.jsx           # App header
│   │   ├── hooks/
│   │   │   ├── useSorting.js        # Core animation state machine
│   │   │   └── useComparison.js     # Comparison mode state
│   │   ├── data/
│   │   │   └── algorithmData.js     # Algorithm metadata, constants
│   │   ├── utils/
│   │   │   └── helpers.js           # Utility functions
│   │   ├── App.jsx                  # Root component + tab routing
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css                # Tailwind + custom styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── java-algorithms/                 # Java DSA implementations
│   ├── BubbleSort.java
│   ├── SelectionSort.java
│   ├── InsertionSort.java
│   ├── MergeSort.java
│   ├── QuickSort.java
│   └── HeapSort.java
│
└── README.md
```

---

## 🧮 Algorithms Implemented

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ Yes |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | ❌ No |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ Yes |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ No |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | ❌ No |

---

## 🚀 Installation & Running

### Prerequisites
- Node.js 18+
- npm 9+
- Java 17+ (only for running Java files)

### 1. Clone the Repository

```bash
git clone https://github.com/ganeshmod/sorting-visualizer.git
cd sorting-visualizer
```

### 2. Run the React App

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### 3. Build for Production

```bash
cd frontend
npm run build
npm run preview
```

---

## ☕ Running Java Files

Each Java file is standalone with a `main()` method — no build tool or Maven needed.

### Compile and Run (from `java-algorithms/` folder)

```bash
cd java-algorithms

# Bubble Sort
javac BubbleSort.java && java BubbleSort

# Selection Sort
javac SelectionSort.java && java SelectionSort

# Insertion Sort
javac InsertionSort.java && java InsertionSort

# Merge Sort
javac MergeSort.java && java MergeSort

# Quick Sort
javac QuickSort.java && java QuickSort

# Heap Sort
javac HeapSort.java && java HeapSort
```

### Expected Output (example — Bubble Sort)
```
=== Bubble Sort ===
Time Complexity  : Best O(n) | Average O(n²) | Worst O(n²)
Space Complexity : O(1) — In-place
Stable           : Yes

Before sorting: [64, 34, 25, 12, 22, 11, 90]
After sorting:  [11, 12, 22, 25, 34, 64, 90]
```

---

## 🖼 Screenshots

> Add screenshots here after deploying. Suggested sections:
> - Main Visualizer running Merge Sort
> - Comparison Mode: Bubble vs Quick
> - Complexity Reference Table
> - Sorting History log

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion 11 |
| Algorithm Engine | JS Generators (yield-based frame stepping) |
| DSA Reference | Java 17 |
| Build Tool | Vite |

---

## 🔮 Future Enhancements

- [ ] Step-by-step manual mode (advance one frame at a time)
- [ ] Sound effects tied to bar height
- [ ] Custom array input (type your own values)
- [ ] Export sorting animation as GIF/video
- [ ] Nearly-sorted and reverse-sorted array presets
- [ ] Mobile gesture controls (swipe to pause/resume)
- [ ] Add more algorithms: Shell Sort, Tim Sort, Radix Sort, Counting Sort
- [ ] Spring Boot backend to run Java sorts server-side and return steps via API
- [ ] Deploy to Vercel / Netlify with GitHub Actions CI

---

## 👤 Author

**Ganesh Kumar Modanwal**  
Full Stack Developer (MERN Stack)  
GitHub: [@ganeshmod](https://github.com/ganeshmod)  
LinkedIn: [ganesh-kumar-modanwal](https://linkedin.com/in/ganesh-kumar-modanwal-01a287251)

---

## 📄 License

MIT — free to use for portfolios, learning, and projects.
