export interface StaffProfile {
  id: string;
  status: 1 | 2 | 3; //1: Active, 2: "Inactive", 3: "Suspended"
  employeeCode: string;
  department: string;
  designation: string;
  assignDate: string;
  createdAt: Date;

  user: { id: string; firstName: string; mobile: string };
  role: { id: number; name: string };
  shop: { id: number; name: string };
}

export interface StaffFilters {
  page: number;
  limit: number;
  status?: number; //1: Active, 2: "Inactive", 3: "Suspended"
  search?: string;
}
