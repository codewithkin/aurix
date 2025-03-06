import {urls} from "../urls";
import axios from "axios";

export default async function getJobs (query?: string) {
    try {
        const res = await axios.get(`${urls.backendUrl}/api/jobs`);

        console.log("response: ", res.data);

        if(res.data.jobs) {
            return res.data.jobs;
        }

        return res.data;
    } catch (e) {
        console.log("An error occured while fetching jobs: ", e);
    }
}