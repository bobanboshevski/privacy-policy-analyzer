'use client';

import GenericInputFormContainer from "@/components/forms/generic/GenericInputFormContainer";
import {gdprConfig} from "@/lib/config/gdprConfig";

export default function GdprInputFormContainer() {
    return <GenericInputFormContainer config={gdprConfig}/>;
}