import {
  HumanResourceRequest,
  ERequestType,
  HumanResourceRequestStatus,
  ETaskStatus,
  TaskToManageHumanResourceRequest,
  HumanResourceRequestApi,
  TaskToManageHumanResourceRequestApi,
} from "@ptypes/humanResourcesRequest.types";

const mapTask = (
  task: TaskToManageHumanResourceRequestApi,
): TaskToManageHumanResourceRequest => ({
  description: task.description ?? "",
  humanResourceRequestId: task.humanResourceRequestId ?? "",
  taskCode: task.taskCode ?? "",
  taskManagingId: task.taskManagingId ?? "",
  taskName: task.taskName ?? "",
  taskStatus: task.taskStatus as ETaskStatus,
  staffName: task.staffName ?? undefined,
  staffLastName: task.staffLastName ?? undefined,
  identificationDocumentNumber: task.identificationDocumentNumber ?? undefined,
  positionName: task.positionName ?? undefined,
});

export const mapHumanResourceRequestApiToEntity = (
  item: HumanResourceRequestApi,
): HumanResourceRequest => ({
  humanResourceRequestId: item.humanResourceRequestId,
  humanResourceRequestNumber: item.humanResourceRequestNumber,

  humanResourceRequestType: item.humanResourceRequestType as ERequestType,

  humanResourceRequestStatus:
    item.humanResourceRequestStatus as HumanResourceRequestStatus,

  humanResourceRequestDate: item.humanResourceRequestDate,
  humanResourceRequestDescription: item.humanResourceRequestDescription,

  humanResourceRequestData: item.humanResourceRequestData
    ? JSON.parse(item.humanResourceRequestData)
    : {},

  employeeId: item.employeeId,

  humanResourceRequestTraceabilities:
    item.humanResourceRequestTraceabilities ?? [],

  tasksToManageTheHumanResourcesRequests:
    item.tasksToManageTheHumanResourcesRequests?.map(mapTask) ?? [],

  userCodeInCharge: "",
  userNameInCharge: "",
});
