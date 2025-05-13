import {
  HumanResourceRequest,
  HumanResourceRequestTraceability,
  TaskToManageHumanResourceRequest,
} from "@ptypes/humanResourcesRequest.types";

const mapHumanResourceRequestApiToEntity = (
  item: Partial<HumanResourceRequest>,
): HumanResourceRequest => ({
  humanResourceRequestId: String(item.humanResourceRequestId ?? ""),
  humanResourceRequestNumber: String(item.humanResourceRequestNumber ?? ""),
  humanResourceRequestDescription: String(
    item.humanResourceRequestDescription ?? "",
  ),
  humanResourceRequestDate: String(item.humanResourceRequestDate ?? ""),
  // Use non-null assertion for succinct removal of null/undefined per eslint rule
  humanResourceRequestStatus: item.humanResourceRequestStatus!,
  humanResourceRequestData:
    item.humanResourceRequestData ??
    ({} as HumanResourceRequest["humanResourceRequestData"]),
  humanResourceRequestType: item.humanResourceRequestType!,
  employeeId: String(item.employeeId ?? ""),
  userCodeInCharge: String(item.userCodeInCharge ?? ""),
  userNameInCharge: String(item.userNameInCharge ?? ""),
  humanResourceRequestTraceabilities: Array.isArray(
    item.humanResourceRequestTraceabilities,
  )
    ? item.humanResourceRequestTraceabilities.map(
        mapHumanResourceRequestTraceabilityApiToEntity,
      )
    : [],
  tasksToManageTheHumanResourcesRequests: Array.isArray(
    item.tasksToManageTheHumanResourcesRequests,
  )
    ? item.tasksToManageTheHumanResourcesRequests.map(
        mapTaskManagingHumanResourceRequestApiToEntity,
      )
    : [],
});

const mapHumanResourceRequestTraceabilityApiToEntity = (
  item: Partial<HumanResourceRequestTraceability>,
): HumanResourceRequestTraceability => ({
  traceabilityId: String(item.traceabilityId ?? ""),
  humanResourceRequestId: String(item.humanResourceRequestId ?? ""),
  actionExecuted: String(item.actionExecuted ?? ""),
  userWhoExecutedAction: String(item.userWhoExecutedAction ?? ""),
  executionDate: String(item.executionDate ?? ""),
  description: String(item.description ?? ""),
});

const mapTaskManagingHumanResourceRequestApiToEntity = (
  item: Partial<TaskToManageHumanResourceRequest>,
): TaskToManageHumanResourceRequest => ({
  taskManagingId: String(item.taskManagingId ?? ""),
  humanResourceRequestId: String(item.humanResourceRequestId ?? ""),
  taskCode: String(item.taskCode ?? ""),
  taskName: String(item.taskName ?? ""),
  // Apply non-null assertion here as well
  taskStatus: item.taskStatus!,
  description: String(item.description ?? ""),
});

export {
  mapHumanResourceRequestApiToEntity,
  mapHumanResourceRequestTraceabilityApiToEntity,
  mapTaskManagingHumanResourceRequestApiToEntity,
};
