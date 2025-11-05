export function usePrivileges() {
  const privileges = [
    "reportAbsencesHR",
    "viewDetailsReportAbsencesHR",
    "uploadDocumentsReportAbsences",
  ];

  const hasPrivilege = (privilege: string) => privileges.includes(privilege);

  return { hasPrivilege };
}
