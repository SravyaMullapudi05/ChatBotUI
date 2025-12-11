import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadsService {

  constructor() { }

  getAlldownloads() {
    var downloads = [
      { id: 1, name: "General Information" },
      { id: 2, name: "Rules and Circulars" },
      { id: 3, name: "Department Instruction Letter" },
      { id: 4, name: "System Requirement" },
      { id: 5, name: "User Manual" },
      { id: 6, name: "PPT" },
      { id: 7, name: "Video" },
      { id: 8, name: "Land Bank" }
    ];
    return downloads
  }

  getdownloadsSubmodules(moduleSelected) {
    const downloadCategories = [
      {
        id: 1,
        name: "General Information",
        items: [
          { id: 1, title: "About Bhulekh Portal", icon: "download" },
          { id: 2, title: "Services Overview Brochure", icon: "download" },
          { id: 3, title: "User Eligibility Guide", icon: "download" }
        ]
      },
      {
        id: 2,
        name: "Rules and Circulars",
        items: [
          { id: 1, title: "Land Revenue Rules 2024", icon: "download" },
          { id: 2, title: "Latest Government Circulars", icon: "download" },
          { id: 3, title: "Tehsil Office Instructions", icon: "download" }
        ]
      },
      {
        id: 3,
        name: "Department Instruction Letter",
        items: [
          { id: 1, title: "Patwari Workflow Instructions", icon: "download" },
          { id: 2, title: "Tehsildar Operational Letter", icon: "download" },
          { id: 3, title: "Revenue Department Guidelines", icon: "download" }
        ]
      },
      {
        id: 4,
        name: "System Requirement",
        items: [
          { id: 1, title: "System Registration Software", icon: "download" },
          { id: 2, title: "Registration Form - Department Users", icon: "download" },
          { id: 3, title: "Registration Form - Patwari", icon: "download" },
          { id: 4, title: "Registration Form - Bank Users", icon: "download" },
          { id: 5, title: "Registration Form - Local Youth Users", icon: "download" },
          { id: 6, title: "Registration Form - SI Users", icon: "download" }
        ]
      },
      {
        id: 5,
        name: "User Manual",
        items: [
          { id: 1, title: "Portal User Manual (PDF)", icon: "download" },
          { id: 2, title: "Patwari Module Guide", icon: "download" },
          { id: 3, title: "Tehsil Office Workflow Manual", icon: "download" }
        ]
      },
      {
        id: 6,
        name: "PPT",
        items: [
          { id: 1, title: "Bhulekh Presentation Deck", icon: "download" },
          { id: 2, title: "System Architecture PPT", icon: "download" },
          { id: 3, title: "Training Material Presentation", icon: "download" }
        ]
      },
      {
        id: 7,
        name: "Video",
        items: [
          { id: 1, title: "How to Use Bhulekh Portal", icon: "download" },
          { id: 2, title: "Mutation Process Walkthrough", icon: "download" },
          { id: 3, title: "Land Record Search Tutorial", icon: "download" }
        ]
      },
      {
        id: 8,
        name: "Land Bank",
        items: [
          { id: 1, title: "Industrial Land Bank Brochure", icon: "download" },
          { id: 2, title: "District-wise Land Availability", icon: "download" },
          { id: 3, title: "Land Bank Policy Document", icon: "download" }
        ]
      }
    ];
    
    var downloadData = downloadCategories.find(
      (e) => e.name.toLowerCase().trim() === moduleSelected.name.toLowerCase().trim()
    );

    return downloadData ? downloadData.items : [];
  }

  download(downloaditem){}

}
