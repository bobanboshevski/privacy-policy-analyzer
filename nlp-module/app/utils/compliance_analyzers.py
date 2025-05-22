from typing import Optional
from app.models.response_models import GdprComplianceMetrics, CcpaComplianceMetrics

from app.utils.gdpr_compliance_metrics import (
    check_lawful_basis_coverage,
    check_data_subject_rights_coverage,
    check_consent_mechanism_quality,
    check_dpo_information,
    check_international_transfers,
    check_security_measures,
    check_breach_notification,
    check_retention_periods,
    gdpr_overall_score,
    gdpr_compliance_percentage,
    gdpr_is_compliant
)

from app.utils.ccpa_compliance_metrics import (
    check_right_to_know_coverage,
    check_right_to_delete_coverage,
    check_right_to_opt_out_coverage,
    check_non_discrimination_coverage,
    check_notice_at_collection,
    check_verification_process,
    check_authorized_agent_process,
    ccpa_overall_score,
    ccpa_compliance_percentage,
    ccpa_is_compliant
)

def analyze_gdpr_compliance_metrics(text: str) -> Optional[GdprComplianceMetrics]:
    """Analyze GDPR compliance metrics with improved detection"""
    if not text or not isinstance(text, str) or len(text.strip()) == 0:
        return None

    try:
        return GdprComplianceMetrics(
            lawful_basis_coverage=check_lawful_basis_coverage(text),
            data_subject_rights_coverage=check_data_subject_rights_coverage(text),
            consent_mechanism_quality=check_consent_mechanism_quality(text),
            dpo_information=check_dpo_information(text),
            international_transfers=check_international_transfers(text),
            security_measures=check_security_measures(text),
            breach_notification=check_breach_notification(text),
            retention_periods=check_retention_periods(text),
            overall_score=gdpr_overall_score(text),
            compliance_percentage=gdpr_compliance_percentage(text),
            is_compliant=gdpr_is_compliant(text)
        )
    except Exception as e:
        print(f"Error in GDPR compliance analysis: {str(e)}")
        return None

def analyze_ccpa_compliance_metrics(text: str) -> Optional[CcpaComplianceMetrics]:
    """Analyze CCPA compliance metrics with improved detection"""
    if not text or not isinstance(text, str) or len(text.strip()) == 0:
        return None

    try:
        return CcpaComplianceMetrics(
            right_to_know_coverage=check_right_to_know_coverage(text),
            right_to_delete_coverage=check_right_to_delete_coverage(text),
            right_to_opt_out_coverage=check_right_to_opt_out_coverage(text),
            non_discrimination_coverage=check_non_discrimination_coverage(text),
            notice_at_collection=check_notice_at_collection(text),
            verification_process=check_verification_process(text),
            authorized_agent_process=check_authorized_agent_process(text),
            overall_score=ccpa_overall_score(text),
            compliance_percentage=ccpa_compliance_percentage(text),
            is_compliant=ccpa_is_compliant(text)
        )
    except Exception as e:
        print(f"Error in CCPA compliance analysis: {str(e)}")
        return None
