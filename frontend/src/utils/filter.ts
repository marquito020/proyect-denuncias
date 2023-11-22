import { Complaint } from "../interfaces/complaint.interface";
import { TypeComplaint } from "../interfaces/typeComplaint.interface";

const complaintsFilter = (
  typeComplaint: TypeComplaint,
  selectedTypeComplaint: string,
  startDate: Date | null,
  endDate: Date | null,
  selectedState: string
) => {
  const complaints = typeComplaint.complaints?.map((complaint) => {
    // filtering by type of complaint
    if (selectedTypeComplaint != "") {
      if (selectedTypeComplaint != complaint.typeComplaintId) return null;
    }

    // filtering bt dates
    if (startDate && endDate) {
      const complaintDate = new Date(complaint.createdAt);
      if (complaintDate < startDate || complaintDate > endDate) return null;
    }

    // filtering by states
    if (selectedState != "") {
      if (selectedState != complaint.state) return null;
    }

    return complaint;
  });

  return complaints;
};

const validateFilter = (
  complaint: Complaint,
  selectedTypeComplaint: string,
  startDate: Date | null,
  endDate: Date | null,
  selectedState: string
) => {
  //filtering by types
  if (selectedTypeComplaint != "") {
    if (selectedTypeComplaint != complaint.typeComplaintId) return false;
  }

  // filtering bt dates
  if (startDate && endDate) {
    const complaintDate = new Date(complaint.createdAt);
    if (complaintDate < startDate || complaintDate > endDate) return false;
  }

  // filtering by states
  if (selectedState != "") {
    if (selectedState != complaint.state) return false;
  }

  return true;
};

export { complaintsFilter, validateFilter };
