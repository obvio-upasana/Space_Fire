# How to use FlameAtlas data sources

This is the developer handoff for source ingestion, evidence retrieval, charts and citations. It specifies future implementation; it does not mean the database, embeddings or ranking engine already exist.

## 1. Current archive and limits

Archive checked on 12 October 2026:

- [FlameAtlas Drive root](https://drive.google.com/drive/folders/1J5uAWjQwyPl7zfn7Ixrs3mKOMzvHS-6x)
- [Main sources.json](https://drive.google.com/file/d/1bbZFxjo22shCZ-azOiqZjm1m2k9dweqN/view): 38 source records, with 14 TXT artifacts and 23 original PDFs. Some records contain links or abstract-only evidence rather than a full paper. These artifact counts exclude the selected investigation files below; the source records include two investigation pointers.
- [PSI-25 archive](https://drive.google.com/drive/folders/1yJuWWA7UQDwFixJyr-ho20EXwAxaosBC): selected BASS-II files. This is not the complete NASA dataset.
- [PSI-26 archive](https://drive.google.com/drive/folders/1xUHHJ6Ou61srB4V-m9MgtiTonegi2qws): selected BASS files. [Its file index](https://drive.google.com/file/d/1E7k7Ct1KUAphzgHqLSmP5oI-75JCl3w7/view) resolves six originals and records the missing final report.
- [PSI-25 file_sources.json](https://drive.google.com/file/d/1PGc0i2jfPSn1oSNmlXHNcxbyuQ4a4P4o/view): original-file provenance, description provenance and missing-file records.

PSI-25 contains six usable original files: experimental CSV, fan calibration XLSX, engineering PPTX, operations DOCX, science requirements PDF and summary report PDF. Also saved: original NASA metadata JSON, the original extracted investigation metadata TXT, and the NASA description TXT. The metadata ZIP was extracted and then removed from Drive at the owner's request. Its checksum and deletion status remain in the index for audit history; do not fetch its former Drive ID.

The experimental CSV has 129 data rows and 17 columns. It includes sample material, test identifiers, equipment displays and gas measurements. It does not supply a flame-spread-rate column. A row count is not a count of independent validated findings. Read the report and calibration before interpreting values.

NASA's ReadMe DOCX and test-matrix XLSX returned HTTP 404 during collection. They are missing, not empty, and must not be reconstructed by an AI. Raw videos, large raw ZIPs and image proof sheets were deliberately excluded from this first pass. The original selected files were about 52.4 MB before ZIP removal.

The 12 October coverage audit found 127 visible PSI-25 PDFs: 125 raw ProofSheets and two document PDFs. Both document PDFs are archived. ProofSheets are distinct from scientific publications and remain optional raw visual evidence. The publication DOI links are retained in the index as link-only references; they are not claims that all full papers were downloaded. The portal displays 130 experimental entries, while the archived original CSV parses to 129 data rows; record this discrepancy rather than silently inventing a row.

PSI-26 adds an experimental CSV, an as-run XLSX, three original results presentations as PDFs, and the science requirements PDF. The workbook includes oxygen, pressure, setup and observations/anomalies, with overlapping year/combined sheets and explicit data-gap sheets. Do not count every sheet row as a unique experiment. Its BASS final-report download returned 404.

Seven additional original NTRS PDFs cover Saffire VI preliminary results (20240007488), Saffire V vehicle modeling (20240008602), exploration-atmosphere microgravity PMMA spread (20210017785), buoyancy and thick-PMMA spread (20200000557), the SoFIE project overview (20200000361), low-gravity smoke detection (20140006579), and SAME-2 particle morphology/size results (20130000422). The SoFIE overview is program context, not new flight-results evidence. Saffire VI results are explicitly preliminary. These additions plus PSI-26 originals total 29,021,116 bytes; original bytes and authoritative URLs are retained without generated TXT copies.

PSI-25 is **Burning and Suppression of Solids - II**, DOI `10.60555/4qc4-de67`, study version 4. The old SAME guess in source.md was incorrect. The AWS registry must not be assumed to mirror every PSI investigation: the checked bucket roots were DSI, OASIS and pk4; PSI-25 was not found there.

## 2. Drive layout

| Folder | Purpose | Ingestion treatment |
|---|---|---|
| Articles | Original extracted article TXT | Text retrieval with article URL and section offsets |
| PDFs | Original PDF bytes | Extract page-aware text; keep original for inspection |
| Source-Index | Main sources.json | Resolve identity, citations, links and artifact checksums |
| Investigations/PSI-25-BASS-II/Originals | Six selected original files | Parse according to file format |
| Investigations/PSI-25-BASS-II/RAG-Text | Original NASA description TXT only | Source wording from NASA metadata; not extracted PDF text |
| Investigations/PSI-25-BASS-II/Source-Index | Original metadata, file_sources.json and extraction audit history | Resolve identity and versions; ignore removed preliminary text artifacts |
| Investigations/PSI-26-BASS/Originals | Selected BASS CSV, XLSX and PDFs | Parse and review originals; preserve workbook sheet/cell locations |
| Investigations/PSI-26-BASS/Source-Index | Original NASA metadata and file_sources.json | Resolve original filenames, versions, hashes and missing downloads |

Content files contain source wording only. Generated filenames, indexes, offsets and this guide are separate metadata. Never insert our summaries, citation headers or AI explanations into the source body.

## 3. What each format contributes

| Format | What to ingest | Important limit |
|---|---|---|
| Article TXT | Source paragraphs and headings | Exact section names/character offsets; not invented PDF pages |
| PDF | Text per physical PDF page | Printed page label can differ; image text may need reviewed OCR |
| DOCX | Paragraphs and tables in document order | Use body-element/table locations, not unstable rendered page numbers |
| PPTX | Slide text and tables | Use slide number; picture text is not covered by text extraction |
| CSV | Original headers and rows | Preserve raw values; validate meaning before typed conversion |
| XLSX | Cells, formulas, cached values, units and sheet names | A formula and its cached result are different evidence |
| Metadata JSON/TXT | Program identity, DOI, versions and bibliography | Requirements and hypotheses are not measured outcomes |
| ZIP | Inspect manifest and selectively extract allowed members | Never embed ZIP bytes; do not ingest placeholders or bulk media |

Preliminary PSI-25 document text copies were removed after garbled text was identified. Do not use them for embedding. Original PDFs, DOCX and PPTX remain the ingestion inputs; the developer pipeline must extract and review them. The remaining PSI-25-description.txt comes from the NASA investigation metadata fields, not from a PDF and not from an AI summary.

The [extraction audit index](https://drive.google.com/file/d/1MvNqoATLVOjU7B99De4ZN8JTfAns7xez/view) is historical metadata only. Its removed artifacts are not active inputs. The preliminary summary report pass found text on 137 of 144 pages; pages 8, 110, 122, 126, 142, 143 and 144 had no extractable text. Inspect originals to distinguish blank pages from image-only pages. The main archive's 16 PDFs also await proper page-aware extraction and review. Preserve equations, table structure, units and image text using layout-aware parsing and OCR where necessary; run numeric and citation checks before embedding.

## 4. Resolve source identity before parsing

The future ingestion script starts from sources.json, not an unordered folder scan:

1. Read each main source record and retain its `id`, `source_url`, `references` and `artifacts`.
2. For article/PDF artifacts, resolve `drive_file_id`, `drive_url`, `sha256` and `bytes`. A local `path` may point to deleted staging; it is not the durable storage address.
3. For the PSI-25 record, follow `investigation_source_index_url`. Read original file records and `extracted_text`. The active extracted_text contains only the NASA description. Skip artifacts marked removed/deleted and treat historical extraction audit records as non-ingestible.
4. Apply the same investigation-index resolution to PSI-26. Original PSI file records use `source_id` rather than main-index `id`. Preserve it exactly. Link child sources to the investigation; do not mint unrelated IDs for extracted copies.
5. Join each document extraction to its original using `source_id` and `original_drive_file_id`. Its SHA-256 identifies the extracted text, while the original artifact SHA-256 identifies the original binary.
6. Resolve citations from the NASA `source_url`, DOI and stable `download_api_url`. Never save temporary signed download URLs as citations.

Keep both the NTRS landing-page URL and the direct PDF URL when available. Main-index `references` are outbound links discovered in articles; they are not automatically ingested documents or evidence. Fetch, verify and register a linked paper separately before using it. A paper title or abstract does not establish its unavailable full-text results.

## 5. Proposed database tables

These are design fields for later implementation, not migrations to run now.

| Table | Core fields and responsibilities |
|---|---|
| sources | source_id, parent_source_id, title, source_type, program, canonical_url, pdf_url, download_api_url, doi, study_version, file_version, retrieval_time, availability, evidence_type |
| artifacts | artifact_id, source_id, drive_file_id, drive_url, original_filename, mime_type, sha256, byte_size, artifact_kind, extraction_method, review_status |
| chunks | chunk_id, source_id, artifact_id, text, start_offset, end_offset, page_start/page_end or slide/body-element/section locator, content_hash, embedding, embedding_model, chunking_version |
| experiments | experiment_id, investigation_source_id, original_test_id, material, geometry, scale, gravity, pressure, oxygen, airflow, flow_direction, raw_conditions, validation_status |
| measurements | measurement_id, experiment_id, metric, raw_value, raw_unit, normalized_value, normalized_unit, uncertainty, source_id, artifact_id, sheet/row/cell or page/table locator, validation_status |
| ingestion_runs | run_id, source/version, parser_version, status, hashes, errors, timestamps |

Use foreign keys from chunks and measurements to sources and artifacts. Make re-ingestion idempotent using source/version plus artifact hash, and chunk identity using artifact hash, locator and chunking version. Never identify a scientific test only by its CSV row number; keep the original test ID and investigation identity too.

`evidence_type` separates measured result, requirements, procedure, hypothesis, overview and abstract. Store unavailable measurements as NULL with a reason, not zero. Preserve raw units before conversion and keep conversion logic/version separately.

## 6. Future ingestion script responsibilities

1. **Discover:** Load indexes, skip deleted/unavailable artifacts and check versions. Report missing records.
2. **Fetch:** Download one bounded artifact at a time from Drive or the public source. Check byte size and SHA-256. Stream rather than loading bulk data; remove temporary originals only after outputs are verified and saved.
3. **Extract:** Choose a format-specific parser. Keep source wording, page/slide/body-element boundaries and original tables. Record OCR separately with confidence and review status. Do not silently repair a scientific value.
4. **Review:** Check missing pages, garbled text, table alignment, units, footnotes and numeric results. Quarantine unreliable spans instead of embedding them as trusted evidence.
5. **Structure:** Import CSV/XLSX rows into raw staging, then map verified columns to experiments/measurements. Join the fan calibration only when the hardware/configuration and units match. Do not label fan display values as airflow speed without that mapping.
6. **Chunk:** Split reviewed text along headings/paragraphs and page boundaries. Start with roughly 500–800 tokens and 50–100 tokens of overlap; tune using retrieval tests. Keep small tables with headers/units/footnotes. These are initial engineering settings, not scientific rules.
7. **Embed:** Embed only chunk text. Store its source and locator metadata beside the vector, not merely inside the prompt. Pin the embedding model and dimension; reject mixed dimensions.
8. **Load:** Upsert sources, artifacts, experiments, measurements and chunks in recoverable batches. A failed extraction must not mark the source as successfully ingested.
9. **Verify:** Confirm every chunk resolves to a source and original locator, every numeric result resolves to a table cell/page, and repeated runs do not duplicate evidence.

Keep original and extracted artifacts distinct. TXT is convenient for RAG, but numerical tables should retain row/cell structure. Do not flatten the entire XLSX into prose and expect vector search to compute reliable charts.

## 7. Retrieval and citation flow

User question → keyword and vector retrieval with condition filters → cited text plus checked SQL measurements → answer → citation validation.

Retrieve chunk IDs and source metadata together. Assign short display labels such as [S1] to retrieved evidence in the answer context. The model may cite only supplied evidence IDs. Resolve those IDs to authoritative URLs on the server; do not let the model construct URLs or invent page numbers.

For a paper, display its title, NASA/NTRS landing URL, direct PDF link and physical PDF page when known. For a web article, show its title, original URL and section when known. For a dataset, show PSI investigation, DOI/version, filename and sheet/row/cell or report-page location. Offer the Drive copy as a secondary saved-copy link.

An answer citation is valid only if the cited span supports the claim. A working URL alone is insufficient. If the answer contains a number, it must be backed by a checked measurement/tool result or reviewed source span. Unsupported claims are removed or answered with an explicit evidence gap. Do not use a hypothesis from NASA's description as a confirmed finding.

## 8. Charts, rankings and graph use

Charts query structured measurements through SQL. RAG supplies explanations and evidence links. A chart point must carry experiment_id, measurement_id and source locator so a click opens its evidence.

Compare and rank only compatible material, geometry, scale, flow direction, oxygen, pressure and gravity conditions. Do not mix ground, ISS, lunar and Martian conditions into a single unqualified ranking. The current CSV does not by itself establish spread-rate, extinction or suppression scores; ingest checked report results first. Missing metrics must not become default scores.

If adding a knowledge graph later, create entities for programs, investigations, tests, materials and findings. Relations such as TESTED_MATERIAL, MEASURED_UNDER and SUPPORTED_BY must carry source IDs and locators. Model-proposed relations stay unverified until checked. A knowledge graph is optional for the first hackathon implementation; PostgreSQL relations plus pgvector can support the first version.

## 9. Is more data needed?

The archive is sufficient to start the hackathon ingestion and a cited evidence-search demo, program overview, condition filtering and selected comparisons. Source discovery is not proof that parsing or validation has finished. It is not complete coverage of the challenge, nor ready for scientifically defensible risk ranking without measurement review.

| Feature | Current evidence position | Next required step |
|---|---|---|
| Evidence Q&A and insight cards | NASA articles and original research PDFs cover several programs | Proper extraction/OCR and citation validation |
| Experiment library and selected charts | BASS-II CSV/calibration plus BASS CSV/as-run matrix | Map columns, review units and deduplicate tests |
| Large-scale fire evidence | Earlier Saffire sources plus Saffire V/VI additions | Extract result tables and retain preliminary/model distinctions |
| Detection evidence | SAME/DAFT overviews plus two smoke results papers | Review particle metrics and detector implications |
| Exploration condition matching | Lunar/Martian papers and exploration-atmosphere PMMA study | Match actual tested conditions; show gaps for untested settings |
| Ranking | Candidate outcomes exist in reports/presentations | Validate comparable measurements before computing scores |
| Current SoFIE flight-result coverage | Program-level context is saved | Do not imply complete current SoFIE result data |

Stop broad collection for the first prototype. Add another source when a target demo question lacks evidence, a needed measurement is unavailable, or a specific program is absent. The first version should show supported results and explicit evidence gaps rather than claim complete Moon/Mars fire-safety coverage.

Add sources according to uncovered features, not bulk size:

1. Review BASS-II report tables and existing Saffire papers for comparable measured outcomes.
2. For solid-material ignition/extinction under exploration conditions, investigate SoFIE/SoFIE-GEL availability through NASA and PSI.
3. For large-scale spread and enclosure effects, prioritize Saffire outcome tables.
4. For suppression/cool-flame behavior, assess relevant FLEX sources. Keep liquid-droplet results distinct from solid-material tests.
5. For detection, assess SAME smoke/aerosol sources if that feature is included.
6. For Moon/Mars matching, use available partial-gravity papers with their actual test conditions. Do not assume ISS microgravity measurements directly equal lunar or Martian behavior.

ACME is broad combustion research; check each subexperiment's relevance rather than loading the entire program. Confirm each investigation's accession/title using current public metadata before collection. NASA overview pages already in the archive are discovery pointers, not substitutes for measured results.

For each candidate, first list metadata and files, inspect README/units/result tables, estimate size, then select small relevant documents and tabular outcomes. Only obtain large videos/images when a specific feature requires analysis of them. Do not download a 250 GB investigation to build text RAG.

## 10. Roles and acceptance checks

| Role | Deliverable |
|---|---|
| Source/extraction developer | Versioned originals, source indexes, extraction locations and honest missing/OCR status |
| Data developer | Reviewed typed rows, units, calibration mappings, comparable groups and measurement provenance |
| RAG/backend developer | Idempotent ingestion, hybrid retrieval, source joins and citation validation |
| Frontend developer | Evidence links on answers, chart points, experiment cards and rankings; clear coverage limits |

Before demo: test at least 20 questions across numeric answers, paper-page citations, table lookups, conditions, missing evidence and incompatible comparisons. Test that no answer cites a missing artifact, no count implies complete PSI coverage, no requirement becomes a measured result, and no Drive link replaces the authoritative citation. No database or vector code is required to use this handoff now.
