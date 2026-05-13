import { Atom, Cpu, FlaskConical, Gamepad2, History, Lightbulb, Microscope, Orbit, Rocket, ShieldAlert, Sparkles, Zap } from "lucide-react";
import { HardwareDiagram } from "@/components/HardwareDiagram";
import { InteractiveAtom } from "@/components/InteractiveAtom";
import type { SlideData } from "@/types/slides";

export const slides: SlideData[] = [
  {
    id: "title",
    eyebrow: "Scene 01 / Research Signal",
    title: "Xenon",
    subtitle: "Chemistry and Xbox 360 hardware: the Xenon element, Xenon CPU, and Xenos GPU.",
    layout: "intro",
    accent: "cyan",
    stats: [
      { value: "Xe", label: "element symbol" },
      { value: "54", label: "atomic number" },
      { value: "360", label: "hardware era" }
    ],
    visual: <Sparkles className="h-24 w-24" strokeWidth={1.2} />
  },
  {
    id: "xenon-element",
    eyebrow: "Scene 02 / Atomic Profile",
    title: "What Is Xenon?",
    subtitle: "Xenon is a rare atmospheric noble gas: colorless, odorless, dense, and named from the Greek xenos, meaning strange.",
    layout: "showcase",
    accent: "cyan",
    allCardsOpen: true,
    facts: [
      { label: "Symbol", value: "Xe" },
      { label: "Atomic Number", value: "54" },
      { label: "Group", value: "Noble gases" },
      { label: "State", value: "Gas" }
    ],
    cards: [
      {
        title: "Rare Gas",
        body: "Xenon exists in very small amounts in Earth’s atmosphere, which is why it must be separated carefully from liquid air instead of collected directly like a common gas.",
        meta: "Atmosphere"
      },
      {
        title: "Dense",
        body: "It is much denser than many common gases, so it behaves like a heavy, quiet presence in containers and specialized equipment. That density also helps explain why xenon is useful in high-performance lighting and scientific detectors.",
        meta: "Property"
      },
      {
        title: "Strange Name",
        body: "Its name comes from the Greek word xenos, meaning strange or foreign. That name fits the element well because xenon seemed chemically unusual when noble gases were believed to be completely inert.",
        meta: "Origin"
      }
    ],
    visual: <InteractiveAtom />
  },
  {
    id: "xenon-atom-3d",
    eyebrow: "Scene 03 / 3D Atom Lab",
    title: "Xenon Atom Model",
    subtitle: "A dedicated interactive view of xenon's nucleus and electron shells. Drag to rotate, use the wheel or trackpad to zoom, and inspect the model from different angles.",
    layout: "atomLab",
    accent: "cyan",
    visual: <InteractiveAtom mode="slide" />
  },
  {
    id: "discovery",
    eyebrow: "Scene 04 / Historical Breakthrough",
    title: "Discovery of Xenon",
    subtitle: "William Ramsay and Morris Travers discovered xenon in 1898 through fractional distillation of liquid air.",
    layout: "breakdown",
    accent: "magenta",
    cards: [
      {
        title: "1898",
        body: "Xenon was identified during a period of major noble gas discoveries, when scientists were learning that the atmosphere contained more hidden components than oxygen, nitrogen, and carbon dioxide.",
        meta: "Date"
      },
      {
        title: "Ramsay + Travers",
        body: "William Ramsay and Morris Travers separated gases from liquid air and found a new trace gas. Their work helped complete the early map of noble gas chemistry.",
        meta: "Scientists"
      },
      {
        title: "Liquid Air",
        body: "Fractional distillation separates substances by boiling point. Because each gas evaporates at a different temperature, the method made it possible to isolate xenon from a complex mixture.",
        meta: "Method"
      }
    ],
    visual: <History className="h-24 w-24" strokeWidth={1.2} />
  },
  {
    id: "physical-properties",
    eyebrow: "Scene 05 / Physical Readings",
    title: "Physical Properties",
    subtitle: "Xenon is a heavy, nonflammable gas that emits a blue-white glow when electricity passes through it.",
    layout: "research",
    accent: "amber",
    bullets: [
      "Colorless and odorless in normal conditions.",
      "Nonflammable, because it is a noble gas.",
      "Very heavy atomic mass compared with many gases.",
      "Blue-white glow makes it valuable in lighting systems."
    ],
    stats: [
      { value: "-111.9 °C", label: "melting point" },
      { value: "-108.0 °C", label: "boiling point" },
      { value: "Xe", label: "gas symbol" }
    ],
    visual: <Zap className="h-24 w-24" strokeWidth={1.2} />
  },
  {
    id: "chemical-behavior",
    eyebrow: "Scene 06 / Noble Gas Chemistry",
    title: "Chemical Behavior",
    subtitle: "Xenon changed science because noble gases were once believed to be completely inert.",
    layout: "breakdown",
    accent: "lime",
    cards: [
      {
        title: "XeF2",
        body: "Xenon difluoride is one of xenon’s known fluorine compounds. Its existence helped prove that xenon could participate in chemical bonding under the right conditions.",
        meta: "Compound"
      },
      {
        title: "XeF4",
        body: "Xenon tetrafluoride showed that noble gases can form stable chemical bonds. This challenged the older idea that noble gases were completely unable to react.",
        meta: "Compound"
      },
      {
        title: "XeF6",
        body: "Xenon hexafluoride is another example of xenon bonding under strong conditions. It shows how powerful reactants like fluorine can force even a noble gas into new arrangements.",
        meta: "Compound"
      }
    ],
    chips: ["Extreme conditions", "Noble gas bonding", "First proven reactive noble gas"],
    visual: <FlaskConical className="h-24 w-24" strokeWidth={1.2} />
  },
  {
    id: "isotopes",
    eyebrow: "Scene 07 / Nuclear Fingerprints",
    title: "Xenon Isotopes",
    subtitle: "Different xenon isotopes matter in nuclear reactors, spectroscopy, and planetary science.",
    layout: "breakdown",
    accent: "violet",
    allCardsOpen: true,
    cards: [
      {
        title: "Xenon-135",
        body: "A strong neutron absorber that can affect nuclear reactor operation. Because it captures neutrons so effectively, its buildup can change how a reactor behaves over time and can temporarily reduce reactor power if engineers do not account for it.",
        meta: "Reactor"
      },
      {
        title: "Xenon-129",
        body: "Used in spectroscopy and in studies of planetary formation. Scientists can use isotope patterns as clues about where materials came from, how atmospheres changed, and how planetary bodies evolved across long time scales.",
        meta: "Science"
      },
      {
        title: "Xenon-124",
        body: "Known for extremely slow radioactive decay. Its behavior is important because it gives researchers a window into rare nuclear processes that are difficult to observe, making it valuable for advanced physics research.",
        meta: "Decay"
      }
    ],
    visual: <Orbit className="h-24 w-24" strokeWidth={1.2} />
  },
  {
    id: "uses",
    eyebrow: "Scene 08 / Real-World Systems",
    title: "Uses of Xenon",
    subtitle: "Xenon’s unusual light, mass, and low reactivity make it valuable in lighting, aerospace, and medicine.",
    layout: "breakdown",
    accent: "cyan",
    cards: [
      {
        title: "Lighting",
        body: "Camera flashes, cinema projectors, and HID lamps use xenon’s bright glow. When energized, xenon produces an intense blue-white light that is useful when brightness and clarity matter.",
        meta: "Application"
      },
      {
        title: "Aerospace",
        body: "Ion propulsion systems use xenon as propellant for satellites. Xenon atoms can be ionized and accelerated to produce small but efficient thrust over long periods.",
        meta: "Application"
      },
      {
        title: "Medicine",
        body: "Xenon is studied for experimental anesthesia and imaging research. Its low chemical reactivity makes it interesting for medical uses where controlled biological interaction is important.",
        meta: "Application"
      }
    ],
    visual: <Lightbulb className="h-24 w-24" strokeWidth={1.2} />
  },
  {
    id: "advanced-science",
    eyebrow: "Scene 09 / Frontier Research",
    title: "Advanced Science",
    subtitle: "Xenon appears in semiconductor manufacturing, dark matter detection, and space science.",
    layout: "research",
    accent: "magenta",
    bullets: [
      "Semiconductor manufacturing uses xenon in processes such as silicon etching.",
      "Liquid xenon detectors help search for dark matter in particle physics experiments.",
      "Planetary isotope analysis uses xenon clues to understand space history."
    ],
    stats: [
      { value: "Si", label: "etching" },
      { value: "LXe", label: "detectors" },
      { value: "129", label: "planet clues" }
    ],
    visual: <Microscope className="h-24 w-24" strokeWidth={1.2} />
  },
  {
    id: "xbox-transition",
    eyebrow: "Scene 10 / From Element to Console",
    title: "Xenon Beyond Chemistry",
    subtitle: "The name Xenon also entered gaming hardware: Xenon was the Xbox 360 CPU and Xenos was the Xbox 360 GPU.",
    layout: "showcase",
    accent: "amber",
    cards: [
      {
        title: "Xenon",
        body: "The Xbox 360 central processor, developed by IBM and Microsoft. It carried the same name as the element but represented a very different kind of power: multicore game computation.",
        meta: "CPU"
      },
      {
        title: "Xenos",
        body: "The Xbox 360 graphics processor, designed by ATI Technologies. It introduced ideas that would become normal in modern GPUs, especially flexible shader workloads.",
        meta: "GPU"
      },
      {
        title: "Xbox 360",
        body: "Together, these chips powered a defining generation of console gaming. Their design pushed developers to think about parallel CPU work and more programmable graphics pipelines.",
        meta: "Console"
      }
    ],
    visual: <HardwareDiagram />
  },
  {
    id: "xenon-cpu",
    eyebrow: "Scene 11 / Processor Core",
    title: "The Xenon CPU",
    subtitle: "The Xbox 360 CPU was a custom PowerPC-based processor built around parallel work.",
    layout: "research",
    accent: "lime",
    bullets: [
      "Developed by IBM and Microsoft.",
      "Contained 3 PowerPC cores.",
      "Ran at a 3.2 GHz clock speed.",
      "Supported 6 hardware threads total."
    ],
    stats: [
      { value: "3", label: "cores" },
      { value: "3.2 GHz", label: "clock" },
      { value: "6", label: "threads" }
    ],
    visual: <Cpu className="h-24 w-24" strokeWidth={1.2} />
  },
  {
    id: "cpu-impact",
    eyebrow: "Scene 12 / Engine Redesign",
    title: "Why the CPU Mattered",
    subtitle: "Xenon pushed console game development toward multithreading and parallel processing.",
    layout: "breakdown",
    accent: "violet",
    cards: [
      {
        title: "Multithreading",
        body: "Games increasingly split work across multiple execution threads. Instead of relying on one main processor path, engines had to divide animation, physics, rendering preparation, and gameplay systems.",
        meta: "Impact"
      },
      {
        title: "AI + Physics",
        body: "More advanced simulations became possible when work was parallelized. Enemy behavior, destructible objects, vehicle handling, and world systems could all benefit from extra processing lanes.",
        meta: "Impact"
      },
      {
        title: "Engine Design",
        body: "Developers had to rethink engines for multiple cores instead of one main pipeline. This was difficult at first, but it helped normalize multicore thinking across the game industry.",
        meta: "Impact"
      }
    ],
    visual: <Gamepad2 className="h-24 w-24" strokeWidth={1.2} />
  },
  {
    id: "cpu-problems",
    eyebrow: "Scene 13 / Reliability Arc",
    title: "Xenon CPU Problems",
    subtitle: "Early Xbox 360 systems became known for overheating, hardware stress, and the Red Ring of Death.",
    layout: "research",
    accent: "magenta",
    bullets: [
      "Early systems suffered from heat and hardware stress.",
      "The Red Ring of Death became a major reliability symbol.",
      "Later revisions improved cooling, efficiency, and reliability."
    ],
    stats: [
      { value: "Heat", label: "main risk" },
      { value: "RROD", label: "failure sign" },
      { value: "Revisions", label: "fix path" }
    ],
    visual: <ShieldAlert className="h-24 w-24" strokeWidth={1.2} />
  },
  {
    id: "xenos-gpu",
    eyebrow: "Scene 14 / Graphics Processor",
    title: "The Xenos GPU",
    subtitle: "ATI’s Xenos GPU brought a forward-looking graphics design to the Xbox 360.",
    layout: "breakdown",
    accent: "cyan",
    cards: [
      {
        title: "500 MHz",
        body: "Xenos ran at a 500 MHz clock speed, giving the Xbox 360 a strong graphics foundation for high-definition console games.",
        meta: "Clock"
      },
      {
        title: "Unified Shaders",
        body: "Its shader architecture dynamically allocated graphics workloads. This meant the GPU could shift resources between different kinds of shading work instead of keeping them locked into separate fixed roles.",
        meta: "Architecture"
      },
      {
        title: "10 MB eDRAM",
        body: "Embedded memory provided very high bandwidth and better anti-aliasing performance. This helped games produce smoother edges and stronger visual output for the time.",
        meta: "Memory"
      }
    ],
    visual: <Rocket className="h-24 w-24" strokeWidth={1.2} />
  },
  {
    id: "conclusion",
    eyebrow: "Scene 15 / Final Frame",
    title: "Legacy of Xenon and Xenos",
    subtitle: "Together, xenon chemistry and Xbox 360 hardware show scientific innovation, engineering advancement, and a defining era of technology and gaming.",
    layout: "credits",
    accent: "violet",
    credits: [
      "Xenon element: chemistry, medicine, aerospace",
      "Xenon CPU: multicore game programming",
      "Xenos GPU: modern graphics architecture",
      "Shared theme: strange names, serious impact"
    ],
    visual: <Atom className="h-24 w-24" strokeWidth={1.2} />
  }
];
