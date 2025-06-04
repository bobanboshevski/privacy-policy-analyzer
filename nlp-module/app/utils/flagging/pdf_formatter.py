"""
PDF Formatting Utility for Flagging Analysis Functions

This module provides formatting functions to improve the appearance of flagged sentences
in PDF exports while maintaining the same return type as the original functions.
"""

import re
from typing import List, Dict, Union


def format_sentences_for_pdf(sentences: List[str], max_length: int = 200) -> List[str]:
    """
    Format a list of sentences for better PDF presentation with vertical spacing and bullets.

    Args:
        sentences: List of sentences to format
        max_length: Maximum character length before truncating

    Returns:
        List of well-formatted sentences
    """
    if not sentences:
        return ["No flagged sentences found for this category."]

    formatted_sentences = []
    for i, sentence in enumerate(sentences, 1):
        cleaned = clean_sentence(sentence)

        # Smart truncation if sentence is excessively long
        if len(cleaned) > max_length:
            cleaned = cleaned[:max_length].rsplit(' ', 1)[0] + "..."

        formatted = f"  • ({i}) {cleaned}"

        # Remove dangling commas or artifacts (defensive sanitization)
        formatted = re.sub(r'^[,\.]+', '', formatted)  # Remove leading , or .
        formatted = formatted.rstrip(",")  # Remove trailing commas
        if not formatted.endswith(('.', '!', '?', '...')):
            formatted += "."

        formatted_sentences.append(formatted + "\n")

    return formatted_sentences


def format_numbered_items_for_pdf(items: List[str]) -> List[str]:
    """
    Format a list of positive or summary items with clear numbered bullets.

    Args:
        items: List of bullet items (e.g. "Transparency about data...")

    Returns:
        List of formatted strings, each as its own paragraph
    """
    formatted = []
    for i, item in enumerate(items, 1):
        cleaned = clean_sentence(item)
        # Convert markdown-style bold to readable asterisks or quotes
        cleaned = re.sub(r'\*\*(.*?)\*\*', r'"\1"', cleaned)
        formatted.append(f"{i}. {cleaned}\n")

    return formatted if formatted else ["No items found.\n"]


def format_topic_coverage_for_pdf(coverage_result: Dict[str, List[str]]) -> Dict[str, List[str]]:
    """
    Format topic coverage results for PDF presentation.
    
    Args:
        coverage_result: Dictionary with 'missing_topics' and 'weak_coverage_sentences' keys
    
    Returns:
        Formatted dictionary maintaining the same structure
    """
    if not isinstance(coverage_result, dict):
        return coverage_result
    
    formatted_result = {}
    
    # Format missing topics
    if 'missing_topics' in coverage_result:
        missing_topics = coverage_result['missing_topics']
        if missing_topics:
            formatted_topics = [f"• {topic.replace('_', ' ').title()}" for topic in missing_topics]
            formatted_result['missing_topics'] = formatted_topics
        else:
            formatted_result['missing_topics'] = ["• No missing topics identified"]
    
    # Format weak coverage sentences
    if 'weak_coverage_sentences' in coverage_result:
        weak_sentences = coverage_result['weak_coverage_sentences']
        formatted_result['weak_coverage_sentences'] = format_sentences_for_pdf(weak_sentences)
    
    return formatted_result


def clean_sentence(sentence: str) -> str:
    """
    Clean and normalize a sentence for better readability.
    
    Args:
        sentence: Raw sentence text
    
    Returns:
        Cleaned sentence
    """
    # Remove extra whitespace
    cleaned = re.sub(r'\s+', ' ', sentence.strip())

    # Remove quotes that wrap the entire sentence
    if cleaned.startswith('"') and cleaned.endswith('"'):
        cleaned = cleaned[1:-1]
    elif cleaned.startswith("'") and cleaned.endswith("'"):
        cleaned = cleaned[1:-1]

    # Remove leading or trailing punctuation artifacts like rogue commas
    cleaned = cleaned.lstrip(",. ").rstrip(",. ")

    # Capitalize first letter if not already
    if cleaned and not cleaned[0].isupper():
        cleaned = cleaned[0].upper() + cleaned[1:]

    return cleaned


def format_vague_sentences(sentences: List[str]) -> List[str]:
    """Format vague sentences flagging results for PDF."""
    return format_sentences_for_pdf(sentences)


def format_passive_voice_sentences(sentences: List[str]) -> List[str]:
    """Format passive voice sentences flagging results for PDF."""
    return format_sentences_for_pdf(sentences)


def format_conditional_sentences(sentences: List[str]) -> List[str]:
    """Format conditional sentences flagging results for PDF."""
    return format_sentences_for_pdf(sentences)


def format_long_sentences(sentences: List[str]) -> List[str]:
    """Format long sentences flagging results for PDF."""
    return format_sentences_for_pdf(sentences, max_length=120)  # Longer for complex sentences


def format_complex_vocabulary_sentences(sentences: List[str]) -> List[str]:
    """Format complex vocabulary sentences flagging results for PDF."""
    return format_sentences_for_pdf(sentences)


def format_syntactically_complex_sentences(sentences: List[str]) -> List[str]:
    """Format syntactically complex sentences flagging results for PDF."""
    return format_sentences_for_pdf(sentences, max_length=130)


def format_missing_topics(coverage_result: Dict[str, List[str]]) -> Dict[str, List[str]]:
    """Format missing topics flagging results for PDF."""
    return format_topic_coverage_for_pdf(coverage_result)


def format_irrelevant_sentences(sentences: List[str]) -> List[str]:
    """Format irrelevant sentences flagging results for PDF."""
    return format_sentences_for_pdf(sentences)


def format_difficult_sentences_flesch(sentences: List[str]) -> List[str]:
    """Format Flesch difficult sentences flagging results for PDF."""
    return format_sentences_for_pdf(sentences)


def format_hard_sentences_smog(sentences: List[str]) -> List[str]:
    """Format SMOG hard sentences flagging results for PDF."""
    return format_sentences_for_pdf(sentences)


def format_polysyllabic_sentences(sentences: List[str]) -> List[str]:
    """Format polysyllabic sentences flagging results for PDF."""
    return format_sentences_for_pdf(sentences)


def format_biased_sentences(sentences: List[str]) -> List[str]:
    """Format biased sentences flagging results for PDF."""
    return format_sentences_for_pdf(sentences)


def format_opinion_heavy_sentences(sentences: List[str]) -> List[str]:
    """Format opinion heavy sentences flagging results for PDF."""
    return format_sentences_for_pdf(sentences)


def format_emotionally_charged_sentences(sentences: List[str]) -> List[str]:
    """Format emotionally charged sentences flagging results for PDF."""
    return format_sentences_for_pdf(sentences)


def format_impersonal_sentences(sentences: List[str]) -> List[str]:
    """Format emotionally charged sentences flagging results for PDF."""
    return format_sentences_for_pdf(sentences)

def format_no_action_sentences(sentences: List[str]) -> List[str]:
    """Format emotionally charged sentences flagging results for PDF."""
    return format_sentences_for_pdf(sentences)

def format_corporate_speak_sentences(sentences: List[str]) -> List[str]:
    """Format emotionally charged sentences flagging results for PDF."""
    return format_sentences_for_pdf(sentences)
