import {
    BookOpen,
    CheckCircle,
    Award,
    Play,
    Lock,
    ChevronRight,
    BarChart,
    Users,
    HeartHandshake,
    ShieldCheck,
    Menu,
    X
} from 'lucide-react';

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number; // Index of the correct option
    explanation: string; // Scientific/Educational explanation
}

export interface Module {
    id: string;
    title: string;
    duration: string;
    description: string;
    icon: any;
    locked: boolean;
    completed: boolean;
    content: {
        text: string;
        keyTakeaways: string[];
        quiz: QuizQuestion[];
    };
}

export const COURSE_CONTENT: Module[] = [
    {
        id: 'm1',
        title: 'The Pharmacist as a Consultant',
        duration: '1 hour',
        description: 'Shifting mindset from dispenser to trusted health advisor with scientific backing.',
        icon: Users,
        locked: false,
        completed: false,
        content: {
            text: "Modern pharmacy practice isn't just about dispensing medication; it's about ensuring positive health outcomes. This module explores how to position yourself as a consultant. Patients don't buy products; they buy solutions to their health problems. Your role is to bridge the gap between their symptoms and the right solution. \n\nTo truly succeed, you must move beyond the transactional nature of retail. When a patient hands you a prescription or asks for a product, that is just the beginning of the interaction. A consultant pharmacist proactively looks for gaps in care, potential drug interactions, and lifestyle factors that could influence the therapy's success.\n\n**Scientific Context:**\nStudies have shown that pharmacist-led interventions significantly improve medication adherence and clinical outcomes in chronic diseases like hypertension and diabetes. By acting as a consultant, you are not just 'selling'; you are performing a clinical intervention that reduces hospitalization rates and improves quality of life.",
            keyTakeaways: [
                "Difference between 'selling' and 'consulting'",
                "Building authority through empathy",
                "The trust equation in healthcare",
                "Clinical impact of pharmacist interventions"
            ],
            quiz: [
                {
                    id: 'q1',
                    question: "What is the primary goal of a consultant pharmacist?",
                    options: ["Maximizing daily transaction count", "Dispensing medication as quickly as possible", "Ensuring positive health outcomes", "Reducing inventory waste"],
                    correctAnswer: 2,
                    explanation: "The primary goal is ensuring positive health outcomes. While efficiency is important, the clinical outcome is the true measure of success in healthcare."
                },
                {
                    id: 'q2',
                    question: "According to studies, what is a proven benefit of pharmacist-led interventions?",
                    options: ["Increased marketing costs", "Improved medication adherence and clinical outcomes", "Reduced patient interaction time", "Higher insurance premiums"],
                    correctAnswer: 1,
                    explanation: "Numerous studies demonstrate that when pharmacists intervene (counseling, medication management), adherence rates rise and clinical markers (like HbA1c or BP) improve."
                },
                {
                    id: 'q3',
                    question: "In the 'Trust Equation', what role does 'Self-Orientation' play?",
                    options: ["It should be high to show confidence", "It should be low to focus on the patient", "It is irrelevant", "It means talking about yourself"],
                    correctAnswer: 1,
                    explanation: "Trust = (Credibility + Reliability + Intimacy) / Self-Orientation. Low self-orientation means you focus on the patient's needs, not your own sales targets, which increases trust."
                },
                {
                    id: 'q4',
                    question: "Which of the following is a 'Consultant' behavior?",
                    options: ["Handing over the bag and saying 'Next'", "Asking about other medications to check for interactions", "Ignoring OTC requests", "Focusing only on the most expensive item"],
                    correctAnswer: 1,
                    explanation: "Checking for interactions is a proactive clinical behavior that ensures safety and efficacy, defining the consultant role."
                },
                {
                    id: 'q5',
                    question: "Patients primarily buy ______.",
                    options: ["Chemical compounds", "Solutions to their health problems", "Brand names", "The cheapest option available"],
                    correctAnswer: 1,
                    explanation: "Patients are motivated by the relief of symptoms or the resolution of a health problem, not the product itself."
                },
                {
                    id: 'q6',
                    question: "What is the 'Transactional' mindset?",
                    options: ["Focusing on the long-term relationship", "Focusing only on the exchange of goods for money", "Focusing on patient education", "Focusing on clinical safety"],
                    correctAnswer: 1,
                    explanation: "A transactional mindset views the interaction as a simple trade, missing the opportunity for clinical care and relationship building."
                },
                {
                    id: 'q7',
                    question: "Why is empathy crucial for authority?",
                    options: ["It makes you look weak", "It shows you don't know the answer", "It builds connection, making advice more likely to be followed", "It is required by law"],
                    correctAnswer: 2,
                    explanation: "Empathy validates the patient's feelings. When patients feel understood, they trust the provider's authority and are more compliant with recommendations."
                },
                {
                    id: 'q8',
                    question: "A patient with hypertension asks for a decongestant. What does a consultant do?",
                    options: ["Sell the most popular one", "Warn about pseudoephedrine and recommend a safe alternative", "Say nothing", "Tell them to see a doctor"],
                    correctAnswer: 1,
                    explanation: "Pseudoephedrine can raise blood pressure. A consultant identifies this contraindication and recommends a safe alternative (e.g., saline spray or Coricidin), demonstrating clinical expertise."
                },
                {
                    id: 'q9',
                    question: "What is a 'Gap in Care'?",
                    options: ["A time when the pharmacy is closed", "A missing element in a patient's treatment plan (e.g., missing statin for a diabetic)", "A hole in the shelf", "A mistake in billing"],
                    correctAnswer: 1,
                    explanation: "A gap in care refers to a discrepancy between recommended best practices (guidelines) and the care the patient is actually receiving."
                },
                {
                    id: 'q10',
                    question: "How does a consultant pharmacist view a complaint?",
                    options: ["As an annoyance", "As an opportunity to improve care and build trust", "As a reason to argue", "As someone else's problem"],
                    correctAnswer: 1,
                    explanation: "Service recovery paradox suggests that resolving a complaint well can result in higher loyalty than if no problem had occurred. It's an opportunity to demonstrate commitment to care."
                }
            ]
        }
    },
    {
        id: 'm2',
        title: 'Active Listening & Needs Assessment',
        duration: '1 hour',
        description: 'Uncovering real patient needs using clinical frameworks like WWHAM.',
        icon: HeartHandshake,
        locked: false,
        completed: false,
        content: {
            text: "Most sales are lost because the pharmacist didn't fully understand the patient's problem. Active listening involves hearing what isn't said. Use the WWHAM method (Who, What, How long, Action taken, Medication) not just for safety, but to identify additional needs. \n\nOpen-ended questions are your most powerful tool. Instead of asking 'Do you have a dry cough?', ask 'Can you describe your cough?'. This encourages the patient to share more details, often revealing underlying issues or symptoms they hadn't thought to mention.\n\n**Scientific Context:**\nDifferential diagnosis relies heavily on accurate history taking. In pharmacy, 'triage' is the equivalent. By asking specific questions, you rule out red flags (referral needed) and rule in appropriate OTC therapies. For example, distinguishing between GERD and cardiac pain requires careful questioning.",
            keyTakeaways: [
                "Open-ended vs. Closed-ended questions",
                "The WWHAM framework for clinical triage",
                "Identifying red flags for referral",
                "The power of silence in consultation"
            ],
            quiz: [
                {
                    id: 'q1',
                    question: "What does the 'W' in WWHAM stand for?",
                    options: ["Why", "Who is the patient", "Where", "When"],
                    correctAnswer: 1,
                    explanation: "'Who' is critical. The patient might be a child, an elderly person, or pregnant, which drastically changes the safety profile of recommendations."
                },
                {
                    id: 'q2',
                    question: "Why are open-ended questions preferred in clinical assessment?",
                    options: ["They take less time", "They require yes/no answers", "They encourage detailed responses and reveal hidden symptoms", "They are easier to ask"],
                    correctAnswer: 2,
                    explanation: "Open-ended questions (e.g., 'Tell me about...') prevent bias and allow the patient to describe their experience fully, often revealing crucial diagnostic clues."
                },
                {
                    id: 'q3',
                    question: "What is 'Active Listening'?",
                    options: ["Waiting for your turn to speak", "Hearing the words and understanding the emotion and intent behind them", "Interrupting to correct the patient", "Writing down everything"],
                    correctAnswer: 1,
                    explanation: "Active listening involves full concentration, understanding, responding, and remembering what is being said, often reflecting back to confirm understanding."
                },
                {
                    id: 'q4',
                    question: "In WWHAM, why is 'Medication' (other meds) important?",
                    options: ["To sell more drugs", "To check for drug-drug interactions", "To judge the patient", "It is not important"],
                    correctAnswer: 1,
                    explanation: "Checking concurrent medications is vital to prevent interactions (e.g., NSAIDs with anticoagulants) and to identify drug-induced symptoms."
                },
                {
                    id: 'q5',
                    question: "A patient says 'I have a headache'. What is the best follow-up?",
                    options: ["Take Panadol", "Is it a migraine?", "Can you describe the pain and where it is located?", "Do you want the cheap one?"],
                    correctAnswer: 2,
                    explanation: "Asking for a description and location helps distinguish tension headaches from migraines or sinus headaches, leading to the correct product recommendation."
                },
                {
                    id: 'q6',
                    question: "What is a 'Red Flag' symptom?",
                    options: ["A symptom that requires immediate referral to a doctor", "A symptom that can be treated with herbal tea", "A common cold symptom", "A side effect"],
                    correctAnswer: 0,
                    explanation: "Red flags (e.g., chest pain radiating to the arm, sudden severe headache) indicate potentially life-threatening conditions requiring immediate medical attention."
                },
                {
                    id: 'q7',
                    question: "The 'H' in WWHAM stands for:",
                    options: ["How much", "How long (Duration)", "How come", "History"],
                    correctAnswer: 1,
                    explanation: "Duration helps distinguish acute vs. chronic conditions. A cough for 3 days is different from a cough for 3 months (which might suggest ACE inhibitor cough, GERD, or TB)."
                },
                {
                    id: 'q8',
                    question: "Which is an example of a closed-ended question?",
                    options: ["How does that make you feel?", "What have you tried so far?", "Does it hurt when you breathe?", "Tell me more about the pain"],
                    correctAnswer: 2,
                    explanation: "'Does it hurt when you breathe?' can be answered with a simple Yes or No, limiting the information gathered."
                },
                {
                    id: 'q9',
                    question: "Why is silence powerful in consultation?",
                    options: ["It makes the patient uncomfortable", "It gives the patient space to think and add more information", "It shows you are bored", "It saves your voice"],
                    correctAnswer: 1,
                    explanation: "Patients often need a moment to process. Pausing encourages them to fill the silence, often with the most important information they were hesitant to share."
                },
                {
                    id: 'q10',
                    question: "A patient buying antacids mentions 'black tarry stools'. What do you do?",
                    options: ["Recommend a stronger antacid", "Recommend a probiotic", "Refer to a doctor immediately (Red Flag)", "Suggest dietary changes"],
                    correctAnswer: 2,
                    explanation: "Black tarry stools (melena) indicate upper GI bleeding. This is a red flag requiring immediate medical evaluation, not OTC treatment."
                }
            ]
        }
    },
    {
        id: 'm3',
        title: 'Ethical Cross-Selling',
        duration: '1 hour',
        description: 'Recommending complementary therapies based on biochemistry and pharmacology.',
        icon: BarChart,
        locked: false,
        completed: false,
        content: {
            text: "Cross-selling in pharmacy is about 'Complete Care'. If a patient takes antibiotics, a probiotic prevents side effects. This isn't just a sale; it's better care. We'll learn how to frame recommendations so they are perceived as helpful advice, not a sales pitch. \n\nThe key is to link the additional product directly to the patient's primary goal or concern. For example, 'This antibiotic will clear the infection, but it might also upset your stomach. I recommend taking this probiotic 2 hours apart to keep your gut healthy.'\n\n**Scientific Context:**\nDrug-Induced Nutrient Depletion is a key area for ethical cross-selling. For example, Statins deplete Coenzyme Q10, which can lead to myopathy (muscle pain). Recommending CoQ10 is clinically sound. Similarly, Metformin depletes Vitamin B12. Addressing these depletions improves patient quality of life and compliance.",
            keyTakeaways: [
                "The 'Complete Care' framework",
                "Drug-Induced Nutrient Depletion (DIND)",
                "Antibiotic-Associated Diarrhea (AAD) prevention",
                "Timing your recommendation"
            ],
            quiz: [
                {
                    id: 'q1',
                    question: "What is the main purpose of ethical cross-selling?",
                    options: ["Increasing basket size", "Complete Care and better clinical outcomes", "Clearing old stock", "Meeting sales targets"],
                    correctAnswer: 1,
                    explanation: "Ethical cross-selling aims to provide a complete solution, preventing side effects or enhancing the efficacy of the primary treatment."
                },
                {
                    id: 'q2',
                    question: "Which nutrient is commonly depleted by Statins (cholesterol meds)?",
                    options: ["Vitamin C", "Coenzyme Q10 (CoQ10)", "Iron", "Calcium"],
                    correctAnswer: 1,
                    explanation: "Statins block the HMG-CoA reductase pathway, which produces cholesterol but also CoQ10. Low CoQ10 is linked to statin-induced muscle pain."
                },
                {
                    id: 'q3',
                    question: "Why recommend a probiotic with an antibiotic?",
                    options: ["To make it taste better", "To prevent Antibiotic-Associated Diarrhea (AAD)", "To increase the antibiotic absorption", "To lower the price"],
                    correctAnswer: 1,
                    explanation: "Antibiotics kill both bad and good bacteria. Probiotics help replenish the gut flora, reducing the risk of diarrhea and secondary infections like Candida."
                },
                {
                    id: 'q4',
                    question: "Metformin usage is associated with a deficiency in which vitamin?",
                    options: ["Vitamin D", "Vitamin B12", "Vitamin A", "Vitamin K"],
                    correctAnswer: 1,
                    explanation: "Long-term Metformin use interferes with B12 absorption in the ileum, potentially leading to neuropathy, which can be mistaken for diabetic neuropathy."
                },
                {
                    id: 'q5',
                    question: "A patient is buying oral rehydration salts for diarrhea. What is a good cross-sell?",
                    options: ["A laxative", "Zinc supplements", "Sleeping pills", "Cough syrup"],
                    correctAnswer: 1,
                    explanation: "Zinc supplementation reduces the duration and severity of diarrhea episodes and prevents future episodes for up to 3 months (WHO recommendation)."
                },
                {
                    id: 'q6',
                    question: "How should you frame a recommendation?",
                    options: ["As a discount", "As a requirement", "As helpful advice linked to their goal/safety", "As a favor"],
                    correctAnswer: 2,
                    explanation: "Linking the product to the patient's goal (e.g., 'to prevent stomach upset') makes the recommendation relevant and welcomed."
                },
                {
                    id: 'q7',
                    question: "A patient buys a corticosteroid inhaler. What should you recommend?",
                    options: ["A spacer device", "A nebulizer", "Antibiotics", "Painkillers"],
                    correctAnswer: 0,
                    explanation: "Spacers improve lung deposition of the drug and reduce oropharyngeal deposition, lowering the risk of oral thrush (candidiasis)."
                },
                {
                    id: 'q8',
                    question: "What is 'Drug-Induced Nutrient Depletion'?",
                    options: ["Drugs costing too much money", "Drugs blocking the absorption or increasing excretion of essential nutrients", "Nutrients blocking drugs", "Drugs expiring"],
                    correctAnswer: 1,
                    explanation: "Many chronic medications deplete nutrients. Addressing this is a key role for pharmacists to prevent long-term side effects."
                },
                {
                    id: 'q9',
                    question: "A patient with dry eyes asks for drops. What else might help?",
                    options: ["Omega-3 Fatty Acids", "Vitamin C", "Calcium", "Iron"],
                    correctAnswer: 0,
                    explanation: "Omega-3 fatty acids improve the quality of the oil layer in the tear film, reducing evaporation and improving dry eye symptoms."
                },
                {
                    id: 'q10',
                    question: "When is the best time to mention the cross-sell?",
                    options: ["After they have paid", "While you are counseling on the primary medication", "When they walk in the door", "Never"],
                    correctAnswer: 1,
                    explanation: "Mentioning it during counseling integrates it into the care plan. 'While you take this, you should also take this to prevent...'"
                }
            ]
        }
    },
    {
        id: 'm4',
        title: 'Handling Objections & Price Resistance',
        duration: '1 hour',
        description: 'Navigating cost concerns by explaining bioavailability and quality.',
        icon: ShieldCheck,
        locked: false,
        completed: false,
        content: {
            text: "Price is only an issue in the absence of value. When a patient says 'it's too expensive', they are often saying 'I don't understand why I need this'. Learn to pivot from price to value, explaining the long-term health benefits and cost-savings of prevention. \n\nThe 'Feel, Felt, Found' technique is effective here: 'I understand how you feel about the price. Many of my patients have felt the same way. However, they found that by using this higher-quality monitor, they avoided false readings and unnecessary doctor visits.'\n\n**Scientific Context:**\nNot all supplements are created equal. 'Bioavailability' is a key concept. For example, Magnesium Oxide is cheap but poorly absorbed compared to Magnesium Glycinate. Explaining that the cheaper option might pass through the body without effect helps the patient understand why the premium product is actually better value.",
            keyTakeaways: [
                "The 'Feel, Felt, Found' technique",
                "Bioavailability: Why quality matters",
                "Cost of illness vs. Cost of prevention",
                "Addressing skepticism about supplements"
            ],
            quiz: [
                {
                    id: 'q1',
                    question: "Price is usually an issue only in the absence of what?",
                    options: ["Money", "Value", "Time", "Interest"],
                    correctAnswer: 1,
                    explanation: "If the patient perceives the value (benefit) as higher than the cost, they will buy. Objections arise when they don't see the value."
                },
                {
                    id: 'q2',
                    question: "Which form of Magnesium is generally more bioavailable?",
                    options: ["Magnesium Oxide", "Magnesium Glycinate/Citrate", "Magnesium Sulfate", "Magnesium Carbonate"],
                    correctAnswer: 1,
                    explanation: "Chelated forms like Glycinate or organic salts like Citrate have much higher absorption rates than Oxide, which is often used in cheap supplements."
                },
                {
                    id: 'q3',
                    question: "What is the 'Feel, Felt, Found' technique?",
                    options: ["A way to ignore the objection", "A method to empathize, normalize, and provide a solution", "A way to lower the price", "A way to argue"],
                    correctAnswer: 1,
                    explanation: "It validates the patient's concern (Feel), shows they aren't alone (Felt), and offers a new perspective based on others' success (Found)."
                },
                {
                    id: 'q4',
                    question: "A patient says 'Generic is not as good as Brand'. What is the scientific truth?",
                    options: ["Generics are always worse", "Generics have the same active ingredient and bioequivalence", "Brands have more drug", "Generics are fake"],
                    correctAnswer: 1,
                    explanation: "Generics must prove bioequivalence to the FDA/regulatory body. They work the same way. Explaining this builds trust in affordable options."
                },
                {
                    id: 'q5',
                    question: "Why might a 'Cheap' Omega-3 supplement be a bad choice?",
                    options: ["It tastes bad", "It might have low EPA/DHA concentration and heavy metal contamination", "It is too small", "It is clear"],
                    correctAnswer: 1,
                    explanation: "Quality fish oils are molecularly distilled to remove mercury and concentrated to provide therapeutic doses of EPA/DHA. Cheap ones often aren't."
                },
                {
                    id: 'q6',
                    question: "How do you handle 'I'll think about it'?",
                    options: ["Say 'Okay bye'", "Ask 'What is your main concern?' to uncover the hidden objection", "Force them to buy", "Give a discount"],
                    correctAnswer: 1,
                    explanation: "'I'll think about it' is usually a stall. Probing gently helps uncover the real barrier (price, trust, confusion)."
                },
                {
                    id: 'q7',
                    question: "What is 'Bioavailability'?",
                    options: ["The price of the drug", "The fraction of the drug that reaches systemic circulation unchanged", "The expiration date", "The color of the pill"],
                    correctAnswer: 1,
                    explanation: "It determines how much of the substance the body can actually use. High bioavailability means better efficacy."
                },
                {
                    id: 'q8',
                    question: "A patient objects to the price of a blood pressure monitor. What is the value argument?",
                    options: ["It looks nice", "Accuracy prevents false readings and unnecessary ER visits", "It has a case", "It is new"],
                    correctAnswer: 1,
                    explanation: "Framing the cost against the 'cost of error' (anxiety, doctor visits, stroke risk) highlights the value of accuracy."
                },
                {
                    id: 'q9',
                    question: "Why is 'prevention' a hard sell?",
                    options: ["It is expensive", "The benefit is in the future (delayed gratification)", "It doesn't work", "Doctors don't like it"],
                    correctAnswer: 1,
                    explanation: "Humans prioritize immediate relief over future gain. You must make the future benefit feel tangible and immediate."
                },
                {
                    id: 'q10',
                    question: "What is the 'Cost of Illness' argument?",
                    options: ["Being sick is free", "The cost of the drug is less than the cost of lost work days and hospitalization", "Drugs are expensive", "Insurance pays for everything"],
                    correctAnswer: 1,
                    explanation: "Comparing the small cost of prevention (e.g., flu shot, vitamins) to the huge cost of being sick (lost wages, misery) helps justify the purchase."
                }
            ]
        }
    },
    {
        id: 'm5',
        title: 'Closing & Patient Adherence',
        duration: '1 hour',
        description: 'Ensuring commitment to therapy to prevent resistance and failure.',
        icon: CheckCircle,
        locked: false,
        completed: false,
        content: {
            text: "Closing isn't aggressive; it's guiding the patient to a decision that benefits them. We also cover adherence—selling the importance of taking the medication as prescribed, which is the ultimate sale. \n\nAn assumptive close works well in healthcare because it shows confidence. Instead of 'Do you want this?', try 'I'll add this to your bag so you have everything you need for a full recovery.'\n\n**Scientific Context:**\nNon-adherence is a massive public health issue. In antibiotics, stopping early leads to antimicrobial resistance (AMR). In hypertension, 'drug holidays' lead to rebound hypertension and stroke. Your 'close' is actually an adherence intervention. You are closing the deal on their health.",
            keyTakeaways: [
                "Assumptive closing techniques",
                "The danger of Antimicrobial Resistance (AMR)",
                "Consequences of non-adherence in chronic disease",
                "Follow-up strategies"
            ],
            quiz: [
                {
                    id: 'q1',
                    question: "What is described as the 'ultimate sale'?",
                    options: ["Selling the most expensive item", "Patient adherence to therapy", "Signing up for a loyalty card", "Selling a bundle"],
                    correctAnswer: 1,
                    explanation: "If the patient buys the drug but doesn't take it, the health outcome is zero. Adherence is the true goal."
                },
                {
                    id: 'q2',
                    question: "Why does an assumptive close work in healthcare?",
                    options: ["It tricks the patient", "It shows confidence and authority in the recommendation", "It is faster", "It is aggressive"],
                    correctAnswer: 1,
                    explanation: "Patients look to pharmacists for expert guidance. Assuming they want the best outcome ('I'll get this for you') signals that this is the standard of care."
                },
                {
                    id: 'q3',
                    question: "What is a consequence of stopping antibiotics early?",
                    options: ["Saving money", "Antimicrobial Resistance (AMR) and recurrence of infection", "Better gut health", "None"],
                    correctAnswer: 1,
                    explanation: "Sub-lethal dosing allows the strongest bacteria to survive and mutate, leading to resistant strains that are harder to treat."
                },
                {
                    id: 'q4',
                    question: "What is 'Rebound Hypertension'?",
                    options: ["Blood pressure going down", "A sudden, dangerous spike in BP after stopping medication abruptly", "A side effect of aspirin", "Low blood pressure"],
                    correctAnswer: 1,
                    explanation: "Some drugs (like clonidine or beta-blockers) cause the body to upregulate receptors. Stopping suddenly causes an exaggerated response (high BP)."
                },
                {
                    id: 'q5',
                    question: "What is the 'Teach-Back' method?",
                    options: ["Asking the patient to repeat the instructions in their own words", "Lecturing the patient", "Giving a pamphlet", "Calling the doctor"],
                    correctAnswer: 0,
                    explanation: "Teach-back confirms understanding. 'Just to make sure I explained it clearly, can you tell me how you're going to take this?'"
                },
                {
                    id: 'q6',
                    question: "A patient says 'I feel better, so I stopped my meds'. This is common in:",
                    options: ["Pain management", "Asymptomatic conditions like Hypertension or Hyperlipidemia", "Broken bones", "Burns"],
                    correctAnswer: 1,
                    explanation: "The 'Silent Killer' diseases have no symptoms. Patients often stop meds because they don't 'feel' sick, leading to long-term damage."
                },
                {
                    id: 'q7',
                    question: "What is a 'barrier to adherence'?",
                    options: ["The pharmacy door", "Anything preventing the patient from taking meds (Cost, Side effects, Forgetfulness)", "The bottle cap", "The doctor"],
                    correctAnswer: 1,
                    explanation: "Identifying the specific barrier (e.g., pill burden) allows you to offer a solution (e.g., pill organizer or combination drug)."
                },
                {
                    id: 'q8',
                    question: "How can you improve adherence for a forgetful patient?",
                    options: ["Scold them", "Recommend a pill organizer or sync it with a daily habit", "Tell them to try harder", "Increase the dose"],
                    correctAnswer: 1,
                    explanation: "Linking medication to a routine (like brushing teeth) or using tools (organizers, apps) are proven behavioral techniques."
                },
                {
                    id: 'q9',
                    question: "What is the 'Option Close'?",
                    options: ["Do you want it?", "Do you prefer the cherry flavor or the grape flavor?", "Buy this or die", "Leaving it up to them"],
                    correctAnswer: 1,
                    explanation: "Giving two positive options ('Flavor A or B', 'Tablet or Liquid') assumes the sale is made and focuses on preference."
                },
                {
                    id: 'q10',
                    question: "Why is follow-up important?",
                    options: ["To annoy the patient", "To check for efficacy and side effects, showing you care", "To ask for money", "To sell more"],
                    correctAnswer: 1,
                    explanation: "A follow-up call ('How is that medicine working for you?') catches non-adherence early and builds massive loyalty."
                }
            ]
        }
    },
    {
        id: 'final-exam',
        title: 'Final Exam: Comprehensive Case Studies',
        duration: '5 Mins',
        description: 'Test your mastery with real-world scenarios. You have 5 minutes to complete 5 case studies.',
        icon: ShieldCheck,
        locked: false,
        completed: false,
        content: {
            text: "This is the final step in your journey. You will be presented with 5 case studies that require you to synthesize knowledge from all previous modules. \n\n**Scientific Context:**\nReal-world practice is rarely multiple choice. It requires evaluating patient history, identifying red flags, and making clinical decisions under pressure. This exam simulates that pressure with a 5-minute timer.",
            keyTakeaways: [
                "Clinical decision making",
                "Identifying drug interactions",
                "Recognizing red flags",
                "Ethical sales application"
            ],
            quiz: [
                {
                    id: 'fe1',
                    question: "Case Study 1: A 55-year-old male with a history of hypertension and peptic ulcer disease asks for 'something strong' for a sprained ankle. He is currently taking Lisinopril and Omeprazole.",
                    options: [
                        "Recommend Ibuprofen 400mg (NSAID) for inflammation",
                        "Recommend Diclofenac gel (Topical NSAID) and Paracetamol",
                        "Recommend Aspirin",
                        "Recommend nothing and refer to doctor"
                    ],
                    correctAnswer: 1,
                    explanation: "Oral NSAIDs (Ibuprofen, Aspirin) are contraindicated due to his Peptic Ulcer history and Hypertension (can raise BP). Topical NSAIDs have lower systemic absorption, and Paracetamol is safe for the stomach."
                },
                {
                    id: 'fe2',
                    question: "Case Study 2: A young mother asks for a cough suppressant for her 4-year-old child who has a productive (wet) cough and mild fever.",
                    options: [
                        "Recommend a Dextromethorphan (suppressant) syrup",
                        "Recommend a Guaifenesin (expectorant) syrup and fluids",
                        "Recommend Aspirin for the fever",
                        "Recommend a sedating antihistamine"
                    ],
                    correctAnswer: 1,
                    explanation: "Suppressing a productive cough can lead to pneumonia by trapping mucus. An expectorant helps clear it. Aspirin is contraindicated in children (Reye's Syndrome)."
                },
                {
                    id: 'fe3',
                    question: "Case Study 3: A diabetic patient (Type 2) on Metformin complains of tingling in their feet. They assume it's just 'part of diabetes'.",
                    options: [
                        "Agree that it is likely diabetic neuropathy and offer pain cream",
                        "Investigate B12 deficiency (Drug-Induced Nutrient Depletion) and recommend B12 supplements",
                        "Tell them to stop taking Metformin",
                        "Sell them diabetic socks"
                    ],
                    correctAnswer: 1,
                    explanation: "Long-term Metformin use depletes Vitamin B12, causing neuropathy symptoms. This is a classic DIND case where a supplement can resolve the root cause."
                },
                {
                    id: 'fe4',
                    question: "Case Study 4: A customer complains of 'heartburn' that started an hour ago while gardening. They describe it as a 'heavy pressure' radiating to their left jaw. They want an antacid.",
                    options: [
                        "Sell them the strongest antacid available",
                        "Recommend a PPI like Omeprazole",
                        "Recognize this as a RED FLAG for Myocardial Infarction and call emergency services immediately",
                        "Recommend herbal tea"
                    ],
                    correctAnswer: 2,
                    explanation: "Radiating chest pain/pressure (jaw/arm) is a classic sign of a heart attack, often mistaken for heartburn. This requires immediate emergency referral, not OTC treatment."
                },
                {
                    id: 'fe5',
                    question: "Case Study 5: A patient taking Warfarin (blood thinner) asks for a multivitamin. They picked one off the shelf that contains Vitamin K.",
                    options: [
                        "Sell them the multivitamin they chose",
                        "Recommend a specific multivitamin without Vitamin K",
                        "Tell them vitamins are useless",
                        "Tell them to stop Warfarin"
                    ],
                    correctAnswer: 1,
                    explanation: "Vitamin K directly antagonizes Warfarin, increasing clotting risk. A consultant pharmacist must intervene to prevent this dangerous interaction."
                }
            ]
        }
    }
];
