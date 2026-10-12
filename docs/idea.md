# Idea

## Problem statement

Flame in Freefall: AI-Powered Fire Safety Insights from Microgravity Combustion Data

For decades, NASA has studied how flames and fire behave in microgravity, gathering a trove of experimental data along the way. That knowledge matters more than ever as humans gear up to return to the Moon and press on to Mars, yet the volume of results makes them hard to find, compare, and understand. Your challenge is to create an interactive, AI-powered dashboard that summarizes, ranks, and interprets those findings to deliver fire safety insights for human space exploration.

Source: https://www.spaceappschallenge.org/2026/challenges/flame-in-freefall-ai-powered-fire-safety-insights-from-microgravity-combustion-data/

## Our idea: FlameAtlas

An interactive, AI-powered dashboard where users can find, compare, and understand NASA's microgravity combustion experiments and findings. It summarizes the evidence, ranks comparable experiments or conditions by fire risk, and interprets what the findings mean for fire safety in human space exploration, including future Moon and Mars missions. Every number comes from a checked database. The AI explains the evidence, and every answer shows its source.

- **Summarizes:** experiments and findings have short explanations with their conditions, results, limitations, and sources.
- **Ranks:** experiments or conditions are ordered by fire risk only within comparable groups and when the required measurements are available.
- **Interprets:** plain-language insights and evidence-backed answers explain what the findings mean for fire prevention, detection, and suppression, and where they may inform future missions.

## Scope of the challenge

We cover the breadth of the problem statement: making NASA's microgravity combustion findings easier to find, compare, and understand through summarization, ranking, and interpretation.

Relevant topics include flame behavior, ignition, growth and spread, material flammability, extinction and suppression, and smoke and combustion-product detection. We consider solid fuels, liquid droplets, and gaseous flames where their findings contribute to fire-safety understanding. Each topic is included according to the evidence available.

Moon and Mars missions are an application of these insights. Microgravity findings remain labeled as microgravity evidence; any partial-gravity measurements, models, and planned experiments are identified separately. We explain gaps rather than treating one environment's results as predictions for another.

The eight features in `features.md` support this scope. Dataset availability determines which findings we can demonstrate and rank, without narrowing the project's purpose to a single program or combustion topic.

## What we add

1. A program map that explains NASA's combustion programs, their topics, their fire-safety relevance, and which evidence we have loaded.
2. Ranking inside comparable groups only, with the formula and weights visible and editable.
3. Moon and Mars matching: the user sets oxygen, pressure and gravity, and we show the closest evidence or a clear "no evidence" warning.
4. Answers that refuse when evidence is missing, instead of guessing.
5. A trust page that shows our test questions and pass rate.

## Rules we never break

1. Numbers come from the database, never from the AI.
2. Every claim shows a source.
3. No evidence means "not enough evidence".
4. We never rank experiments that cannot be compared.
5. We say what the data does not cover, for example "this is microgravity, not Moon gravity".
