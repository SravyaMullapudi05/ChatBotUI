import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FaqsService {

  constructor() { }

  getAllFaqs() {
    var faqs = [
      { id: 1, name: "General Information" },
      { id: 2, name: "Re-assessment (Diversion)" },
      { id: 3, name: "Copy Of Land Records" },
      { id: 4, name: "Registration" },
      { id: 5, name: "Order Compliance" },
      { id: 6, name: "Mutation" },
      { id: 7, name: "Rules and Circulars" }
    ];
    return faqs
  }

  getfaqSubmodules(moduleSelected) {
    var qshnans = [
      {
        "id": 1,
        "name": "General Information",
        "faqs": [
          {
            "id": 1,
            "question": "Operational Difficulties Technical Solutions",
            "answer": "The request is filed by the applicant or Patwari to update or execute any court order, transfer, partition, etc., in the e-Khasra system. The Tehsildar or Naib Tehsildar accepts or rejects the request. After approval, the Patwari updates the record online. The system does not directly show the application stage, but users can track the request using Request ID on the portal homepage."
          },
          {
            "id": 2,
            "question": "Updation of new Khasra numbers is not happening?",
            "answer": "New Khasra numbers are visible only after approval by the Tehsil office. If not updated, the request may still be pending. Please check with the concerned Patwari or Tehsildar."
          },
          {
            "id": 3,
            "question": "Map numbers Z1, Z2 etc. are written in the software.",
            "answer": "Z1, Z2, etc., are temporary identifiers used during mapping for technical markings. They do not affect ownership and are later updated or removed after final approval."
          },
          {
            "id": 4,
            "question": "Has the option of adding a new number after distribution in Khasra been closed?",
            "answer": "Yes. Once Bantwara (distribution) is finalized and approved, new numbers cannot be added. Any change requires fresh approval from the Tehsil office."
          },
          {
            "id": 5,
            "question": "How to register for application?",
            "answer": "Visit the Bhulekh / e-Khasra website → Click 'New User Registration' → Enter mobile number/Aadhaar → Verify OTP → Fill details → Submit. Use the generated login ID and password to access services."
          },
          {
            "id": 6,
            "question": "How to retrieve password in case lost or forgotten?",
            "answer": "Click 'Forgot Password' on login page → Enter registered mobile → Verify OTP → Create a new password → Login again."
          },
          {
            "id": 7,
            "question": "How can you register your account on the Bhulekh portal?",
            "answer": "Go to the official portal → Click 'Register' → Fill personal details → Verify OTP → Set password → Login to access land-related services."
          }
        ]
      },

      {
        "id": 2,
        "name": "Re-assessment (Diversion)",
        "faqs": [
          {
            "id": 1,
            "question": "What is Diversion (Re-assessment)?",
            "answer": "Diversion refers to changing the land use category, such as converting agricultural land to residential or commercial. A re-assessment determines the applicable revenue based on new land use."
          },
          {
            "id": 2,
            "question": "How to apply for land diversion?",
            "answer": "Submit an online diversion application through the official portal with required documents such as map, Khasra copy and ownership proof. The Tehsildar reviews and approves the request."
          },
          {
            "id": 3,
            "question": "Why is my diversion request pending?",
            "answer": "It may be awaiting scrutiny by the Tehsildar, site inspection, document verification, or fee payment confirmation. You can track status using the application ID."
          }
        ]
      },

      {
        "id": 3,
        "name": "Copy Of Land Records",
        "faqs": [
          {
            "id": 1,
            "question": "How to download Khasra, Khatauni, and B-1 online?",
            "answer": "Visit the Bhulekh portal → Select 'Land Records' → Enter district, village, and Khasra number → Download the desired record (Khasra, B-1, or Map)."
          },
          {
            "id": 2,
            "question": "Are downloaded documents valid for official use?",
            "answer": "Yes. Digitally signed documents downloaded from the Bhulekh portal are valid for legal and administrative purposes."
          },
          {
            "id": 3,
            "question": "What if the land data is incorrect?",
            "answer": "Contact the concerned Patwari to verify and initiate correction through the Tehsil office."
          }
        ]
      },

      {
        "id": 4,
        "name": "Registration",
        "faqs": [
          {
            "id": 1,
            "question": "How to register a property?",
            "answer": "Prepare sale deed → Pay stamp duty and registration fee → Book appointment on the registration portal → Visit Sub-Registrar office → Complete biometric verification → Registration is completed."
          },
          {
            "id": 2,
            "question": "What documents are required for registration?",
            "answer": "Owner ID, sale deed draft, Khasra/Khatauni, tax receipts, and photographs."
          }
        ]
      },

      {
        "id": 5,
        "name": "Order Compliance",
        "faqs": [
          {
            "id": 1,
            "question": "How to check compliance of court orders?",
            "answer": "Track the status on the Bhulekh portal using the court order ID or application number."
          },
          {
            "id": 2,
            "question": "How are court orders updated in land records?",
            "answer": "After submission, the Tehsildar verifies the order and instructs the Patwari to update the records accordingly."
          }
        ]
      },

      {
        "id": 6,
        "name": "Mutation",
        "faqs": [
          {
            "id": 1,
            "question": "What is mutation?",
            "answer": "Mutation updates the land records to reflect new ownership after sale, inheritance, gift, or partition."
          },
          {
            "id": 2,
            "question": "How to apply for mutation?",
            "answer": "Submit an online or offline application with documents such as registered deed, death certificate (if applicable), and Khasra copy."
          },
          {
            "id": 3,
            "question": "How long does mutation take?",
            "answer": "Mutation generally takes 15 to 30 days depending on verification and inspection by the Patwari."
          }
        ]
      },

      {
        "id": 7,
        "name": "Rules and Circulars",
        "faqs": [
          {
            "id": 1,
            "question": "Where can I find official circulars?",
            "answer": "All government circulars and notifications related to land records are available on the Bhulekh or Revenue Department portal."
          },
          {
            "id": 2,
            "question": "Are old circulars still applicable?",
            "answer": "Only those not superseded by newer circulars remain applicable. Refer to the latest updates before proceeding with any application."
          }
        ]
      }
    ]
    var faqsData = qshnans.find(
      (e) => e.name.toLowerCase().trim() === moduleSelected.name.toLowerCase().trim()
    );
    
    return faqsData ? faqsData.faqs : [];    
  }
}
