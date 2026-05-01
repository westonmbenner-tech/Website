/**
 * Awareness-oriented micro-cards (not medical advice).
 * Edit this array to add or change conditions and support links.
 */
export type MedicineTilCard = {
  name: string;
  /** One or two sentences shown on the card. */
  hook: string;
  link: string;
  /** Optional grouping label (e.g. "Genetic", "Autoimmune"). */
  tag?: string;
};

export const MEDICINE_TIL_CARDS: MedicineTilCard[] = [
  {
    name: "Leprosy / Hansen’s disease",
    hook: "A curable bacterial disease still shaped by stigma, delayed diagnosis, and social isolation.",
    link: "https://www.hoperises.org/support-our-work",
    tag: "Infectious",
  },
  {
    name: "Hereditary Hemorrhagic Telangiectasia",
    hook: "A genetic blood-vessel disorder that can cause nosebleeds, anemia, and hidden AVMs in organs.",
    link: "https://curehht.org/understanding-hht/",
    tag: "Genetic",
  },
  {
    name: "Mastocytosis / Mast Cell Disease",
    hook: "Overactive mast cells can trigger allergic-type reactions across multiple body systems.",
    link: "https://tmsforacure.org/",
  },
  {
    name: "Alpha-1 Antitrypsin Deficiency",
    hook: "A genetic condition that can damage the lungs and liver, sometimes mistaken for asthma or COPD.",
    link: "https://alpha1.org/",
    tag: "Genetic",
  },
  {
    name: "Friedreich’s Ataxia",
    hook: "A rare inherited neurodegenerative disease that affects coordination, speech, heart function, and mobility.",
    link: "https://www.curefa.org/",
  },
  {
    name: "Progeria",
    hook: "A rapid-aging syndrome in children caused by a mutation affecting the structure of the cell nucleus.",
    link: "https://www.progeriaresearch.org/",
  },
  {
    name: "Alport Syndrome",
    hook: "A genetic kidney disease that can also affect hearing and vision.",
    link: "https://alportsyndrome.org/",
  },
  {
    name: "Ehlers-Danlos Syndromes",
    hook: "Connective tissue disorders that can cause hypermobility, fragile tissue, pain, and dysautonomia.",
    link: "https://www.ehlers-danlos.com/",
  },
  {
    name: "Dysautonomia / POTS",
    hook: "A nervous-system regulation disorder that can cause fainting, rapid heart rate, fatigue, and brain fog.",
    link: "https://www.dysautonomiainternational.org/",
  },
  {
    name: "Lymphedema",
    hook: "A chronic lymphatic disorder that causes swelling and can raise the risk of infection.",
    link: "https://lymphaticnetwork.org/",
  },
  {
    name: "Antiphospholipid Syndrome",
    hook: "An autoimmune clotting disorder linked to strokes, miscarriages, and abnormal blood clots.",
    link: "https://apsfa.org/",
    tag: "Autoimmune",
  },
  {
    name: "Sarcoidosis",
    hook: "Inflammatory disease where granulomas can affect the lungs, skin, eyes, or heart.",
    link: "https://www.stopsarcoidosis.org/",
  },
  {
    name: "Myositis",
    hook: "Rare autoimmune muscle diseases that can cause weakness, fatigue, rashes, and lung involvement.",
    link: "https://www.myositis.org/",
  },
  {
    name: "Vasculitis",
    hook: "Inflammation of blood vessels that can damage organs by reducing blood flow.",
    link: "https://www.vasculitisfoundation.org/",
  },
  {
    name: "Scleroderma",
    hook: "An autoimmune disease that can harden skin and affect internal organs through fibrosis and blood-vessel damage.",
    link: "https://scleroderma.org/",
    tag: "Autoimmune",
  },
  {
    name: "Mitochondrial Disease",
    hook: "Cells struggle to produce enough energy, often affecting brain, muscle, and heart.",
    link: "https://www.umdf.org/",
  },
  {
    name: "Congenital Muscular Dystrophy",
    hook: "Inherited muscle disorders that begin early in life and can affect movement, breathing, and development.",
    link: "https://www.curecmd.org/",
  },
  {
    name: "Myotonic Dystrophy",
    hook: "Muscle stiffness, weakness, heart rhythm problems, and multi-system symptoms from a genetic disorder.",
    link: "https://www.myotonic.org/",
  },
  {
    name: "Usher Syndrome",
    hook: "Hearing loss combined with progressive vision loss from retinitis pigmentosa.",
    link: "https://www.usher-syndrome.org/",
  },
  {
    name: "CHARGE Syndrome",
    hook: "A complex genetic syndrome that can affect eyes, heart, growth, development, hearing, and balance.",
    link: "https://www.chargesyndrome.org/",
  },
  {
    name: "Prader-Willi Syndrome",
    hook: "Low muscle tone, developmental differences, and intense, chronic hunger.",
    link: "https://www.pwsausa.org/",
  },
  {
    name: "Angelman Syndrome",
    hook: "Seizures, movement differences, speech impairment, and a very social affect.",
    link: "https://www.angelman.org/",
  },
  {
    name: "Sanfilippo Syndrome",
    hook: "A childhood neurodegenerative lysosomal storage disease sometimes described as childhood dementia.",
    link: "https://curesanfilippofoundation.org/",
  },
  {
    name: "Niemann-Pick Disease",
    hook: "Lysosomal storage disorders that can affect the brain, liver, spleen, lungs, and nervous system.",
    link: "https://nnpdf.org/",
  },
  {
    name: "Tay-Sachs Disease",
    hook: "Toxic lipid buildup damages nerve cells, especially in the brain and spinal cord.",
    link: "https://www.curetay-sachs.org/",
  },
  {
    name: "Adrenoleukodystrophy",
    hook: "Damages the nervous system and adrenal glands; some forms progress rapidly in childhood.",
    link: "https://aldconnect.org/",
  },
  {
    name: "Tuberous Sclerosis Complex",
    hook: "Benign tumors in multiple organs, seizures, autism spectrum features, and kidney complications.",
    link: "https://www.tscalliance.org/",
  },
  {
    name: "Charcot-Marie-Tooth Disease",
    hook: "Inherited nerve disorders that cause muscle weakness, foot deformities, and sensory loss.",
    link: "https://www.cmtausa.org/",
  },
  {
    name: "Ataxia-Telangiectasia",
    hook: "Movement problems, immune deficiency, cancer risk, and sensitivity to radiation.",
    link: "https://www.atcp.org/",
  },
  {
    name: "Dystonia",
    hook: "Involuntary muscle contractions cause twisting, tremors, or abnormal postures.",
    link: "https://dystonia-foundation.org/",
  },
  {
    name: "Ataxia",
    hook: "Impaired coordination, balance, speech, and fine motor control—a symptom family and disease group.",
    link: "https://www.ataxia.org/",
  },
  {
    name: "Primary Immunodeficiency",
    hook: "Parts of the immune system are missing or malfunctioning, causing recurrent infections.",
    link: "https://primaryimmune.org/",
  },
  {
    name: "Guillain-Barré Syndrome / CIDP",
    hook: "Immune-mediated nerve disorders with weakness, paralysis, sensory changes, and long recovery.",
    link: "https://www.gbs-cidp.org/",
  },
  {
    name: "Amyloidosis",
    hook: "Misfolded proteins build up in organs such as the heart, kidneys, nerves, or liver.",
    link: "https://amyloidosis.org/",
  },
  {
    name: "Pseudomyxoma Peritonei",
    hook: "A rare cancer-like condition where mucinous tumor cells spread inside the abdomen.",
    link: "https://www.pseudomyxomasurvivor.org/",
  },
  {
    name: "Lymphangioleiomyomatosis",
    hook: "A rare lung disease, mostly affecting women, where abnormal cells damage lung tissue and can cause collapses.",
    link: "https://www.thelamfoundation.org/",
  },
  {
    name: "Pheochromocytoma / Paraganglioma",
    hook: "Rare neuroendocrine tumors that can release adrenaline-like hormones and cause dangerous blood-pressure spikes.",
    link: "https://pheopara.org/",
  },
  {
    name: "Acromegaly",
    hook: "Excess growth hormone—often from a pituitary tumor—produces gradual body changes.",
    link: "https://www.acromegalycommunity.org/",
  },
  {
    name: "Cushing’s Syndrome",
    hook: "Prolonged excess cortisol produces metabolic, skin, muscle, and mood changes.",
    link: "https://csrf.net/",
  },
  {
    name: "Long QT Syndrome",
    hook: "An inherited heart rhythm disorder that can cause fainting, seizures, or sudden cardiac arrest.",
    link: "https://sads.org/",
  },
  {
    name: "Hypertrophic Cardiomyopathy",
    hook: "Thickened heart muscle can disrupt rhythm and blood flow.",
    link: "https://4hcm.org/",
  },
  {
    name: "Progressive Supranuclear Palsy",
    hook: "A rare neurodegenerative disease affecting movement, balance, speech, swallowing, and eye motion.",
    link: "https://www.psp.org/",
  },
  {
    name: "Behçet’s Disease",
    hook: "Mouth and genital ulcers, eye inflammation, and vascular problems from rare systemic inflammation.",
    link: "https://www.behcets.com/",
  },
  {
    name: "Wilson Disease",
    hook: "Copper accumulates in the liver, brain, and other tissues.",
    link: "https://wilsondisease.org/",
  },
  {
    name: "Porphyria",
    hook: "Disorders affecting heme production—severe abdominal pain, neurological symptoms, or light sensitivity.",
    link: "https://porphyriafoundation.org/",
  },
  {
    name: "Paroxysmal Nocturnal Hemoglobinuria",
    hook: "Red blood cells break apart and clotting risk rises.",
    link: "https://www.pnhfoundation.org/",
  },
  {
    name: "Aplastic Anemia",
    hook: "Bone marrow failure: the body stops producing enough blood cells.",
    link: "https://www.aamds.org/",
  },
  {
    name: "Histiocytosis",
    hook: "Abnormal immune cells build up and damage tissues.",
    link: "https://histio.org/",
  },
  {
    name: "Noonan Syndrome",
    hook: "Growth, facial features, heart structure, bleeding, and development can be affected.",
    link: "https://teamnoonan.org/",
  },
  {
    name: "CLOVES Syndrome",
    hook: "Rare overgrowth with vascular malformations and orthopedic complications.",
    link: "https://clovessyndrome.org/",
  },
  {
    name: "GM1 Gangliosidosis",
    hook: "A lysosomal storage disease that progressively damages the nervous system.",
    link: "https://curegm1.org/",
  },
  {
    name: "Metachromatic Leukodystrophy",
    hook: "Inherited disorder that destroys myelin, affecting movement, cognition, and nerve function.",
    link: "https://mldfoundation.org/",
  },
  {
    name: "Pitt-Hopkins Syndrome",
    hook: "Developmental delays, breathing irregularities, seizures, and distinctive facial features.",
    link: "https://pitthopkins.org/",
  },
  {
    name: "Dup15q Syndrome",
    hook: "Extra copies of part of chromosome 15—often linked to autism and seizures.",
    link: "https://dup15q.org/",
  },
  {
    name: "CDKL5 Deficiency Disorder",
    hook: "Early-onset seizures and severe developmental challenges.",
    link: "https://www.cdkl5.com/",
  },
  {
    name: "STXBP1 Disorders",
    hook: "Epilepsy, movement differences, and developmental delays.",
    link: "https://www.stxbp1disorders.org/",
  },
  {
    name: "Alternating Hemiplegia of Childhood",
    hook: "Episodes of temporary paralysis, movement problems, and developmental challenges.",
    link: "https://ahckids.org/",
  },
  {
    name: "Dravet Syndrome",
    hook: "Developmental epilepsy beginning in infancy, often resistant to standard seizure treatments.",
    link: "https://dravetfoundation.org/",
  },
  {
    name: "Rett Syndrome",
    hook: "Regression, movement problems, and communication challenges—mostly affecting girls.",
    link: "https://www.rettsyndrome.org/",
  },
  {
    name: "Idiopathic Hypersomnia",
    hook: "Extreme daytime sleepiness even after long or seemingly adequate sleep.",
    link: "https://www.hypersomniafoundation.org/",
  },
];
