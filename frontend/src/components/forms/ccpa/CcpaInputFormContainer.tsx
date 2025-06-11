import GenericInputFormContainer from "@/components/forms/generic/GenericInputFormContainer";
import {ccpaConfig} from "@/lib/config/ccpaConfig";

export default function CcpaInputFormContainer() {
    return <GenericInputFormContainer config={ccpaConfig}/>;
}