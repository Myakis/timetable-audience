import { StylesConfig } from "react-select";

export const options = [
  { value: "8:00", label: "8:00" },
  { value: "8:30", label: "8:30" },
  { value: "9:00", label: "9:00" },
  { value: "9:30", label: "9:30" },
  { value: "10:00", label: "10:00" },
  { value: "10:30", label: "10:30" },
  { value: "11:00", label: "11:00" },
  { value: "11:30", label: "11:30" },
  { value: "12:00", label: "12:00" },
  { value: "12:30", label: "12:30" },
  { value: "13:00", label: "13:00" },
  { value: "13:30", label: "13:30" },
  { value: "14:00", label: "14:00" },
  { value: "14:30", label: "14:30" },
  { value: "15:00", label: "15:00" },
  { value: "15:30", label: "15:30" },
  { value: "16:00", label: "16:00" },
  { value: "16:30", label: "16:30" },
  { value: "17:00", label: "17:00" },
  { value: "17:30", label: "17:30" },
  { value: "18:00", label: "18:00" },
];

export interface IOptions {
  value: string;
  label: string;
  isDisabled?: boolean;
}

export const colorStyles: StylesConfig<any> = {
  menuList: (styles) => {
    return {
      ...styles,
      maxHeight: 270,
      position: "relative",
      "::-webkit-scrollbar": { width: "10px" },
      "::-webkit-scrollbar-track": { background: "darkgrey", borderRadius: 7 },
      "::-webkit-scrollbar-thumb": { borderRadius: 7, background: "rgb(70, 70, 70)" },
    };
  },
  menu: (styles) => {
    return {
      ...styles,
      zIndex: 2,
    };
  },
  indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
};
