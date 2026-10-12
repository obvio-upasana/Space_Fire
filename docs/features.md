# Features

1. Experiment library
2. Evidence Q&A
3. Fire risk ranking
4. Program map
5. Mission condition matcher
6. Insight cards
7. Compare two experiments
8. Trust page

## 1. Experiment library

A searchable list of experiment cards.

- Filters: program, fuel, oxygen percent, pressure, airflow, gravity level, flow direction, topic (spread, suppression, detection).
- Each card shows a short summary, the key conditions, and a source link.
- Clicking a card opens the full record and every finding tied to it.
- Data used: the checked experiment records.
- Solves: "hard to find".

## 2. Evidence Q&A

A chat box that answers only from our evidence.

- Search uses keywords and meaning together (pgvector), because names like BASS-II and numbers are weak points for meaning search alone.
- The answer shows database numbers first, then a short explanation.
- Every sentence carries a source tag that opens the page.
- If evidence is missing, it says "not enough evidence" and names what is missing.
- The AI can only call our tools (`search_evidence`, `get_experiment`, `rank_group`, `find_closest_conditions`) and cannot write a number that no tool returned.
- Solves: "AI-powered" without made-up physics.

## 3. Fire risk ranking

Orders conditions or experiments from higher to lower fire risk, inside comparable groups only.

- Groups come from fuel form, geometry, flow direction (opposed or concurrent), and test scale.
- Score parts: flame spread speed, lowest oxygen where a flame still burns, behavior at low airflow, how hard the fire is to put out.
- Each part is scaled 0 to 100 inside its group, then combined with weights.
- A "How this score works" panel shows the formula. The user can change the weights and watch the order change.
- Each rank shows how many experiments support it and how sure we are.
- Solves: "ranks".

## 4. Program map

One screen that lays out NASA's combustion programs and why we loaded some of them.

- Rows: BASS, BASS-II, SoFIE, Saffire, ACME, FLEX, FLARE, SAME, SLICE and others.
- Columns: what it studied, where it ran (ISS, Cygnus, ground), fire-safety relevance (high, medium, low), and whether we loaded it.
- Solves: shows we understood the field before choosing data.

## 5. Mission condition matcher

The user picks a setting and sees the closest evidence.

- Inputs: oxygen percent, total pressure, gravity (microgravity, Moon, Mars, Earth), airflow.
- Presets: ISS cabin (about 14.7 psia, 21% oxygen) and exploration atmosphere (8.2 psia, 34% oxygen).
- Output: the closest experiments, what they found, and a gap warning when nothing matches.
- Solves: links the data to the Moon and Mars.

## 6. Insight cards

Six to ten short findings in plain language.

- Each card has the finding, the numbers, the conditions it applies to, a confidence label, and the source.
- Topics from NASA pages we read: flame shape without buoyancy, low pressure slowing spread (Saffire), confinement raising or lowering flammability, cool flames that keep burning after the visible flame ends (FLEX), limits of the 1-g flammability test.
- Solves: "interprets".

## 7. Compare two experiments

A side-by-side view of two records.

- Same fields in the same order, with differences highlighted.
- A warning when the two are not directly comparable, for example different scale or flow direction.
- Solves: "hard to compare".

## 8. Trust page

Shows how reliable the tool is.

- 20 test questions with expected answers and our pass rate.
- Three counts: number accuracy, citation correctness, correct refusals.
- A data and limits note for each source.
- Solves: proves the answers are not made up.
