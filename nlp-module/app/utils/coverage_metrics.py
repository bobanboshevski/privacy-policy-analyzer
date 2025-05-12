# Content Coverage
# How well the privacy policy covers expected topics (e.g., data collection, sharing, security)


# How It Works:
# 	•	Define topic keyword sets (data use, cookies, third-party sharing, user rights).
# 	•	Count topic coverage based on keyword matches or semantic similarity using sentence embeddings.
#
# Tools:
# 	•	Use sentence-transformers for semantic search.
# 	•	Use SpaCy’s Doc.similarity() with reference topic sentences.


# TOPICS = {
#     "data_collection": ["we collect", "information you provide", "personal data"],
#     "data_sharing": ["third-party", "share with partners", "disclose to"],
#     "user_rights": ["right to access", "delete your data", "opt-out"],
#     "security": ["encrypt", "secure", "safeguards"]
# }
#
#
# def compute_coverage(text):
#     covered = 0
#     for topic, keywords in TOPICS.items():
#         if any(kw in text.lower() for kw in keywords):
#             covered += 1
#     return {
#         "coverage_score": covered / len(TOPICS)
#     }
