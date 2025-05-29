import {fetchFromApi} from "@/services/api";

export async function getTrainingText(): Promise<TrainingDataResponse> {
    return await fetchFromApi<TrainingDataResponse>("/api/education/", {
        method: "GET"
    });


}