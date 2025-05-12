# READABILITY METRICS
# How readable and user-friendly the text is.

import textstat

# Readability index (FKGL, Gunning Fog, SMOG)
# Use textstat. Lower = easier to read.



# 1. Flesch Reading Ease (Higher is easier (e.g., > 60 is readable).) - score (0-100)
def flesch_reading_ease(text: str) -> float:
    return textstat.flesch_reading_ease(text)


# Flesh-Kincaid grade index (0 - ~20+)

# 2. Gunning Fog
def gunning_fog(text: str) -> float:
    return textstat.gunning_fog(text)


# 3. SMOG index


# 4. Dale-Chall Score; Penalizes complex words not on a known list.


