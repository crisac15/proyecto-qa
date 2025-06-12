import ActivityDTO from "./activity";

interface WorkplanDTO {
  _id: string;
  name: string;
  description: string;
  activities: Array<ActivityDTO>;
}

export default WorkplanDTO;
