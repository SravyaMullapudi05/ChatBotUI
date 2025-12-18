import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnecttobotService {

  constructor(private http: HttpClient) { }

  connectToBot(message) {
    const botmessages = [
      {
        id: 1,
        name: "Diversion",
        items: [
          { id: 1, name: "Application Form for Diversion" },
          { id: 2, name: "Rules and Guidelines for Diversion" },
          { id: 3, name: "Documents Required for Diversion Approval" }
        ]
      },
      {
        id: 2,
        name: "Registration",
        items: [
          { id: 1, name: "Property Registration Process" },
          { id: 2, name: "Required Documents for Registration" },
          { id: 3, name: "Registration Fee Details" }
        ]
      },
      {
        id: 3,
        name: "Mutation",
        items: [
          { id: 1, name: "Mutation Application Procedure" },
          { id: 2, name: "Documents Required for Mutation" },
          { id: 3, name: "Mutation Status Verification Process" }
        ]
      },
      {
        id: 4,
        name: "Land Records",
        items: [
          { id: 1, name: "How to View Land Records" },
          { id: 2, name: "Khasra and Khatauni Information" },
          { id: 3, name: "Certified Copy of Land Records" }
        ]
      },
      {
        id: 5,
        name: "Grievance",
        items: [
          { id: 1, name: "How to File a Grievance" },
          { id: 2, name: "Grievance Tracking Process" },
          { id: 3, name: "Grievance Disposal Timeline" }
        ]
      },
      {
        id: 6,
        name: "Maps & GIS Services",
        items: [
          { id: 1, name: "Village Map Viewing Process" },
          { id: 2, name: "Plot Boundary and Location Details" },
          { id: 3, name: "GIS-based Land Information Services" }
        ]
      }
    ];

    const match = botmessages.find(
      b => b.name.toLowerCase().trim() === message.toLowerCase().trim()
    );

    var data = {
      data: match ? match.items : [{ id: 1, name: "I'm sorry, I didn't quite catch that.Could you please rephrase or clarify your request?" }]
    }

    return of(data);
  }
}
