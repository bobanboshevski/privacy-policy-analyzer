import {fetchFromApi} from "@/services/api";
import {TrainingDataResponse} from "@/lib/types/education";

export async function getTrainingText(): Promise<TrainingDataResponse> {
    return await fetchFromApi<TrainingDataResponse>("/api/education/", {
        method: "GET"
    });


}