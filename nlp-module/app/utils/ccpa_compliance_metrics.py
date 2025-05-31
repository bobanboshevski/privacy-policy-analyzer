import re

def check_right_to_know_coverage(text: str) -> float:
    """Check coverage of consumer's right to know with broader patterns"""
    patterns = [
        r'right to know|right to be informed',
        r'categories.*personal information|types.*personal.*data',
        r'what.*information.*collect|what.*data.*collect',
        r'personal information.*collect|personal.*data.*collect',
        r'sources.*information|sources.*data',
        r'information.*we.*collect|data.*we.*collect|information.*collected',
        r'how.*we.*collect|when.*we.*collect|why.*we.*collect',
        r'types.*information|kinds.*information|categories.*data',
        r'collect.*following|following.*information|following.*data',
        r'automatically.*collect|directly.*collect|passively.*collect',
        r'device.*information|browser.*information|usage.*information',
        r'contact.*information|account.*information|profile.*information',
        r'third.*party.*source|partner.*provide|receive.*from.*third'
    ]
    
    lower_text = text.lower()
    matches = sum(1 for pattern in patterns if re.search(pattern, lower_text))
    return min(matches / 6, 1.0)


def check_right_to_delete_coverage(text: str) -> float:
    """Check coverage of right to delete with practical language"""
    patterns = [
        r'right to delete|right to deletion',
        r'delete.*personal information|delete.*personal.*data',
        r'request.*deletion|deletion.*request',
        r'remove.*information|erase.*data',
        r'delete.*account|close.*account|deactivate.*account',
        r'cancel.*account|terminate.*account',
        r'remove.*profile|delete.*profile',
        r'contact.*us.*delete|request.*removal|ask.*us.*delete',
        r'permanently.*delete|completely.*remove|fully.*delete',
        r'data.*deletion|information.*removal',
        r'delete.*request|removal.*request|erasure.*request',
        r'exercise.*deletion|deletion.*right'
    ]
    
    lower_text = text.lower()
    matches = sum(1 for pattern in patterns if re.search(pattern, lower_text))
    return min(matches / 4, 1.0)


def check_right_to_opt_out_coverage(text: str) -> float:
    """Check coverage of right to opt-out of sale with flexible detection"""
    patterns = [
        r'right to opt[- ]out|opt[- ]out.*right',
        r'do not sell|don\'t sell|not.*sell.*information',
        r'opt[- ]out.*sale|sale.*opt[- ]out',
        r'sale.*personal information.*opt|selling.*information.*opt',
        r'stop.*selling.*information|cease.*selling',
        r'opt[- ]out.*sharing|stop.*sharing|don\'t.*share',
        r'third.*party.*sharing|sharing.*third.*party',
        r'advertising.*opt[- ]out|marketing.*opt[- ]out',
        r'personalized.*ad|targeted.*ad|behavioral.*ad',
        r'cookie.*opt[- ]out|tracking.*opt[- ]out',
        r'preference.*center|privacy.*control|manage.*preference',
        r'unsubscribe|opt[- ]out.*communication|stop.*receiving',
        r'do.*not.*track|dnt|global.*privacy.*control|gpc'
    ]
    
    lower_text = text.lower()
    matches = sum(1 for pattern in patterns if re.search(pattern, lower_text))
    return min(matches / 4, 1.0)


def check_non_discrimination_coverage(text: str) -> float:
    """Check coverage of non-discrimination rights with practical language"""
    patterns = [
        r'non[- ]discrimination|not.*discriminate',
        r'equal.*service|same.*service|equivalent.*service',
        r'same.*quality|equal.*quality',
        r'penalize.*exercising.*rights|retaliate.*request',
        r'retaliate.*exercising|punish.*exercising',
        r'will.*not.*charge.*different|won\'t.*charge.*different',
        r'same.*price|equal.*price|standard.*price|regular.*price',
        r'continue.*provide|maintain.*service|keep.*providing',
        r'no.*penalty|without.*penalty|free.*exercise',
        r'treat.*equally|treat.*same|fair.*treatment',
        r'rights.*without.*impact|exercise.*without.*consequence'
    ]
    
    lower_text = text.lower()
    matches = sum(1 for pattern in patterns if re.search(pattern, lower_text))
    return min(matches / 3, 1.0)


def check_notice_at_collection(text: str) -> float:
    """Check notice at collection requirements with broader detection"""
    patterns = [
        r'notice.*collection|at.*time.*collection|point.*collection',
        r'at.*collection|when.*collect|before.*collect',
        r'categories.*information.*collect|types.*information.*collect',
        r'purposes.*collect|reason.*collect|why.*collect',
        r'before.*collect|prior.*collect|time.*collect',
        r'when.*you.*provide|when.*you.*give|when.*you.*share',
        r'information.*you.*provide|data.*you.*provide',
        r'sign.*up|create.*account|register|registration',
        r'form.*submission|submit.*form|complete.*form',
        r'automatically.*collect|passively.*collect|collect.*automatically',
        r'visit.*website|use.*service|access.*platform',
        r'cookies.*collect|tracking.*collect|analytics.*collect'
    ]
    
    lower_text = text.lower()
    matches = sum(1 for pattern in patterns if re.search(pattern, lower_text))
    return min(matches / 5, 1.0)


def check_verification_process(text: str) -> float:
    """Check verification process description with flexible patterns"""
    patterns = [
        r'verification.*process|verify.*identity|verifiable.*request',
        r'authenticate.*request|confirm.*identity|validate.*request',
        r'identity.*verification|request.*verification',
        r'confirm.*request|validate.*identity|check.*identity',
        r'security.*question|verification.*code|authentication',
        r'prove.*identity|demonstrate.*identity|establish.*identity',
        r'additional.*information.*verify|information.*confirm.*identity',
        r'two.*factor|multi.*factor|2fa|mfa',
        r'email.*verification|phone.*verification|sms.*verification',
        r'account.*holder|authorized.*person|legitimate.*request'
    ]
    
    lower_text = text.lower()
    matches = sum(1 for pattern in patterns if re.search(pattern, lower_text))
    return min(matches / 3, 1.0)


def check_authorized_agent_process(text: str) -> float:
    """Check authorized agent process description with broader detection"""
    patterns = [
        r'authorized agent|authorised agent',
        r'agent.*behalf|representative.*behalf',
        r'third party.*request|third.*party.*acting',
        r'representative.*request|proxy.*request',
        r'someone.*else.*request|another.*person.*request',
        r'family.*member|legal.*guardian|power.*attorney',
        r'parent.*request|guardian.*request',
        r'attorney.*request|lawyer.*request|legal.*representative',
        r'designate.*someone|authorize.*someone|permit.*someone'
    ]
    
    lower_text = text.lower()
    return 1.0 if any(re.search(pattern, lower_text) for pattern in patterns) else 0.0


def check_california_specific_language(text: str) -> float:
    """Check for California-specific language and CCPA awareness"""
    patterns = [
        r'ccpa|california consumer privacy act',
        r'california|ca\b|calif\.',
        r'california.*resident|ca.*resident',
        r'shine.*light|shine the light',
        r'california.*law|california.*statute',
        r'sacramento|california.*legislature',
        r'consumer.*privacy.*act|privacy.*act.*california'
    ]
    
    lower_text = text.lower()
    matches = sum(1 for pattern in patterns if re.search(pattern, lower_text))
    return min(matches / 3, 1.0)


def ccpa_overall_score(text: str) -> float:
    """Calculate overall CCPA compliance score with more balanced approach"""
    scores = {
        'right_to_know': check_right_to_know_coverage(text) * 0.22,
        'right_to_delete': check_right_to_delete_coverage(text) * 0.20,
        'right_to_opt_out': check_right_to_opt_out_coverage(text) * 0.18,
        'non_discrimination': check_non_discrimination_coverage(text) * 0.15,
        'notice_at_collection': check_notice_at_collection(text) * 0.15,
        'verification_process': check_verification_process(text) * 0.05,
        'authorized_agent': check_authorized_agent_process(text) * 0.05
    }
    
    total_score = sum(scores.values())
    
    lower_text = text.lower()
    if re.search(r'ccpa|california consumer privacy act|california.*privacy', lower_text):
        total_score += 0.08
    if re.search(r'california|ca\b|california.*resident', lower_text):
        total_score += 0.05
    if re.search(r'privacy policy|privacy notice|consumer.*privacy', lower_text):
        total_score += 0.03
    if re.search(r'personal information|consumer.*right|privacy.*right', lower_text):
        total_score += 0.02
    
    return min(total_score, 1.0)


def ccpa_compliance_percentage(text: str) -> int:
    """Get CCPA compliance as percentage"""
    return round(ccpa_overall_score(text) * 100)


def ccpa_is_compliant(text: str) -> bool:
    """Check if text meets minimum CCPA compliance threshold"""
    return ccpa_compliance_percentage(text) >= 50 