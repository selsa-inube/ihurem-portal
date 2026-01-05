import { ETaskStatus } from "@ptypes/humanResourcesRequest.types";

export type Variant = "primary" | "danger" | "success";

export interface IStep {
  id: number;
  number: number;
  name: string;
  label: string;
  description?: string;
  status?: ETaskStatus;
}
