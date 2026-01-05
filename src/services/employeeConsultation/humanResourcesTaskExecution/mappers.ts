import { HumanResourceTaskExecution } from "@ptypes/humanResourcesTaskExecution.types";

export const mapTaskExecutionApiToEntity = (
  item: Partial<HumanResourceTaskExecution>,
): HumanResourceTaskExecution => ({
  methodOfExecution: String(item.methodOfExecution ?? ""),
  status: String(item.status ?? ""),
  taskCode: String(item.taskCode ?? ""),
  taskName: String(item.taskName ?? ""),
});
