export interface TextFieldProps {
  placeholder?: string;
  value?: any;
  fullWidth?: boolean;
  appendIcon?: string;
  searchTerm: any;
  setSearchTerm: any;
  ref?: any;
  onBlur?: (event: any) => void;
  onFocus?: (event: any) => void;
}
