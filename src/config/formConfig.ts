// Type definitions for form configuration
export interface InputTypeConfig {
  label: string;
  show_form_fields: string[];
}

export interface FormField {
  type: InputType | "";
  config: Record<string, any>;
}

export interface FormFieldConfig {
  label: string;
  placeholder?: string;
  type: "text" | "number" | "date" | "checkbox" | "list";
  default?: string | number | boolean | string[];
  help_text?: string;
}

export interface FormConfig {
  input_types: {
    text: InputTypeConfig;
    number: InputTypeConfig;
    date: InputTypeConfig;
    email: InputTypeConfig;
    select: InputTypeConfig;
    checkbox: InputTypeConfig;
    radio: InputTypeConfig;
  };
  form_fields: {
    label: FormFieldConfig;
    placeholder: FormFieldConfig;
    required: FormFieldConfig;
    min_length: FormFieldConfig;
    max_length: FormFieldConfig;
    min_value: FormFieldConfig;
    max_value: FormFieldConfig;
    min_date: FormFieldConfig;
    max_date: FormFieldConfig;
    options: FormFieldConfig;
  };
}

export const FORM_CONFIG: FormConfig = {
  input_types: {
    text: {
      label: "Text",
      show_form_fields: ["label", "placeholder", "required", "min_length", "max_length"],
    },
    number: {
      label: "Number",
      show_form_fields: ["label", "placeholder", "required", "min_value", "max_value"],
    },
    date: {
      label: "Date",
      show_form_fields: ["label", "required", "min_date", "max_date"],
    },
    email: {
      label: "Email",
      show_form_fields: ["label", "placeholder", "required"],
    },
    select: {
      label: "Dropdown",
      show_form_fields: ["label", "required", "options"],
    },
    checkbox: {
      label: "Checkbox Group",
      show_form_fields: ["label", "required", "options"],
    },
    radio: {
      label: "Multiple Choice",
      show_form_fields: ["label", "required", "options"],
    },
  },
  form_fields: {
    label: {
      label: "Label",
      placeholder: "Label...",
      type: "text",
      default: "",
      help_text: "The label displayed above the input field.",
    },
    placeholder: {
      label: "Placeholder",
      placeholder: "Placeholder...",
      type: "text",
      default: "",
      help_text: "Placeholder text inside the field.",
    },
    required: {
      label: "Required",
      type: "checkbox",
      default: false,
      help_text: "Whether this field is required or optional.",
    },
    min_length: {
      label: "Min Length",
      placeholder: "Min Length...",
      type: "number",
      default: 0,
    },
    max_length: {
      label: "Max Length",
      placeholder: "Max Length...",
      type: "number",
      default: 100,
    },
    min_value: {
      label: "Min Value",
      placeholder: "Min Value...",
      type: "number",
      default: 0,
    },
    max_value: {
      label: "Max Value",
      placeholder: "Max Value...",
      type: "number",
      default: 100,
    },
    min_date: {
      label: "Min Date",
      placeholder: "Min Date...",
      type: "date",
    },
    max_date: {
      label: "Max Date",
      placeholder: "Max Date...",
      type: "date",
    },
    options: {
      label: "Options",
      type: "list",
      default: ["Option 1", "Option 2"],
      help_text: "Enter options separated by commas.",
    },
  },
} as const;

// Type exports for better type safety
export type InputType = keyof typeof FORM_CONFIG.input_types;
export type FormFieldKey = keyof typeof FORM_CONFIG.form_fields;
