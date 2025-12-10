import * as Yup from "yup"

// Step 1: Company & Contact Information
const step1Schema = Yup.object().shape({
  company_name: Yup.string().trim().required("Company name is required"),
  no_of_employees: Yup.string().trim().required("Number of employees is required"),
  location: Yup.string().trim().required("Location is required"),
  contact_person: Yup.string().trim().required("Contact person is required"),
  role: Yup.string().trim().required("Role is required"),
  email: Yup.string().trim().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .trim()
    .matches(/^\+?\d{7,15}$/, "Invalid phone number")
    .required("Phone number is required"),
  industries: Yup.array().of(Yup.string()).min(1, "Please select at least one industry"),
  industry_other: Yup.string()
    .trim()
    .when("industries", {
      is: (industries: string[]) => industries.includes("Other"),
      then: (schema) =>
        schema
          .required("Please specify your industry")
          .test("not-only-spaces", "Please specify your industry", (value) => !!value && value.trim().length > 0),
      otherwise: (schema) => schema.notRequired(),
    }),
})

// Step 2: Current System Overview
const step2Schema = Yup.object().shape({
  current_systems: Yup.array().of(Yup.string()).min(1, "Select at least one system"),
  current_system_other: Yup.string()
    .trim()
    .when("current_systems", {
      is: (systems: string[]) => systems.includes("Other"), // only required if "Other" is selected
      then: (schema) => schema.required("Please specify your system"),
      otherwise: (schema) => schema.notRequired(),
    }),
  satisfaction_level: Yup.string().trim().required("Select your satisfaction level"),
})

// Step 3: Operational Challenges
const step3Schema = Yup.object().shape({
  system_performance_issues: Yup.array().of(Yup.string()).min(1, "Select at least one"),
  process_workflow_issues: Yup.array().of(Yup.string()).min(1, "Select at least one"),
  reporting_data_issues: Yup.array().of(Yup.string()).min(1, "Select at least one"),
  hr_payroll_issues: Yup.array().of(Yup.string()).min(1, "Select at least one"),
  customer_sales_issues: Yup.array().of(Yup.string()).min(1, "Select at least one"),
  inventory_supply_chain_issues: Yup.array().of(Yup.string()).min(1, "Select at least one"),
  digital_marketing_issues: Yup.array().of(Yup.string()).min(1, "Select at least one"),
})

// Step 4: Hidden Needs Discovery
const step4Schema = Yup.object().shape({
  daily_situations: Yup.array().of(Yup.string()).min(1, "Select at least one"),
  improvement_areas: Yup.array().of(Yup.string()).min(1, "Select at least one"),
})

// Step 5: System Customization Interest
const step5Schema = Yup.object().shape({
  systems_of_interest: Yup.array().of(Yup.string()).min(1, "Select at least one"),
  system_of_interest_other: Yup.string()
    .trim()
    .when("systems_of_interest", {
      is: (systems: string[] = []) => systems.includes("Other"),
      then: (schema) => schema.required("Please specify the system you're interested in"),
      otherwise: (schema) => schema.notRequired(),
    }),
  preferred_features: Yup.array().of(Yup.string()).min(1, "Select at least one"),
})

// Step 6: Open Feedback (optional)
const step6Schema = Yup.object().shape({
  pain_points: Yup.string().trim().required("Please describe your pain points"),
  ideal_system: Yup.string().trim().required("Please describe your ideal system"),
  additional_comments: Yup.string().trim().required("Please add additional comments"),
})

export const stepSchemas = [step1Schema, step2Schema, step3Schema, step4Schema, step5Schema, step6Schema]
