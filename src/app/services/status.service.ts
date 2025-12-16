import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class StatusService {
  private baseUrl = `${environment.apiBase}`;

  constructor(private http: HttpClient) { }

  getTicketStatus(appId: string | number, selectedmodule) {
    if (selectedmodule == 'Application Status') {
      // return this.http.get<any>(`${this.baseUrl}ticket/v1/status/${appId}`);
      let tempdata = {
        "status": true,
        "success": true,
        "count": 4,
        "data": [
          {
            "transaction_id": 2400600000129,
            "applicant_email": "",
            "transaction_date": "12-09-2025 16:15:28",
            "applicant_mobile_no": "******4364",
            "applicant_name": "Gopi",
            "name": "",
            "mobile": "",
            "designation_en": "Citizen",
            "designation_ll": "नागरिक",
            "status": "Opened",
            "status_ll": "खुला",
            "remarks": "टेस्ट",
            "applicant_designation_en": "Citizen",
            "applicant_designation_ll": "नागरिक",
            "file_path": "",
            "response_time_seconds": 0,
            "assignee_role_id": 0,
          },
          {
            "transaction_id": 2400600000129,
            "applicant_email": "",
            "transaction_date": "17-09-2025 16:30:44",
            "applicant_mobile_no": "******4364",
            "applicant_name": "Gopi",
            "name": "Geeta Sharma",
            "mobile": "******0895",
            "designation_en": "SI Helpdesk",
            "designation_ll": "SI हेल्पडेस्क",
            "status": "Closed",
            "status_ll": "बंद",
            "remarks": "अदफ",
            "applicant_designation_en": "Citizen",
            "applicant_designation_ll": "नागरिक",
            "file_path": "",
            "response_time_seconds": 32444,
            "assignee_role_id": 0,
          },
          {
            "transaction_id": 2400600000129,
            "applicant_email": "",
            "transaction_date": "16-09-2025 16:45:00",
            "applicant_mobile_no": "******4364",
            "applicant_name": "Gopi",
            "name": "",
            "mobile": "",
            "designation_en": "Citizen",
            "designation_ll": "नागरिक",
            "status": "Re-open",
            "status_ll": "पुनः खोला गया",
            "remarks": "रोपें",
            "applicant_designation_en": "Citizen",
            "applicant_designation_ll": "नागरिक",
            "file_path": "",
            "response_time_seconds": 0,
            "assignee_role_id": 0,
          },
          {
            "transaction_id": 2400600000129,
            "applicant_email": "",
            "transaction_date": "16-09-2025 16:53:15",
            "applicant_mobile_no": "******4364",
            "applicant_name": "Gopi",
            "name": "Geeta Sharma",
            "mobile": "******0895",
            "designation_en": "SI Helpdesk",
            "designation_ll": "SI हेल्पडेस्क",
            "status": "Closed",
            "status_ll": "बंद",
            "remarks": "क्लोजिंग",
            "applicant_designation_en": "Citizen",
            "applicant_designation_ll": "नागरिक",
            "file_path": "",
            "response_time_seconds": 0,
            "assignee_role_id": 0,
          }
        ],
        "encrypted": false,
        "req_id": "5c00406e-8793-4803-95b3-1d38810a87d4",
        "type": "array",
        "is_xml": false
      }
      return of(tempdata)
    } else if (selectedmodule == 'Grievance Status') {
      return this.http.get<any>(`${this.baseUrl}appadmin/user/status/${appId}`);
    }
  }
  }
