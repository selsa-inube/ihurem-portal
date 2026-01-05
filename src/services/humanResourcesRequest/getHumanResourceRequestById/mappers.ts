import {
  HumanResourceRequest,
  ERequestType,
  HumanResourceRequestStatus,
  ETaskStatus,
  TaskToManageHumanResourceRequest,
  HumanResourceRequestApi,
} from "@ptypes/humanResourcesRequest.types";

interface ApiTask {
  description?: string;
  humanResourceRequestId?: string;
  taskCode?: string;
  taskManagingId?: string;
  taskName?: string;
  taskStatus: string;
}

const mapTask = (task: ApiTask): TaskToManageHumanResourceRequest => ({
  description: task.description ?? "",
  humanResourceRequestId: task.humanResourceRequestId ?? "",
  taskCode: task.taskCode ?? "",
  taskManagingId: task.taskManagingId ?? "",
  taskName: task.taskName ?? "",
  taskStatus: task.taskStatus as ETaskStatus,
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
