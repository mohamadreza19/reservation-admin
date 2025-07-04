import moment from "moment-jalaali";
moment.loadPersian();
import {
  AvailableDateRangeDto,
  TimeslotByDateDto,
} from "../api/generated/models";
import { IDateSlot } from "@/app/appointment/components/model";

export function mapIsoToJalali(date: string) {
  const parseDate = moment(date, "YYYY-MM-DD");

  const formatted = parseDate.format("jYYYY/jMM/jDD");

  return formatted;
}

export function base64ToBlob(base64: string, mimeType = "") {
  console.log(mimeType);

  // Decode base64 string to a binary string
  const byteCharacters = atob(base64);

  // Create an array of byte values
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  // Convert the byte numbers array to a Uint8Array
  const byteArray = new Uint8Array(byteNumbers);

  // Create and return a Blob object
  return new Blob([byteArray], { type: mimeType });
}

const extensionToMime: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  bmp: "image/bmp",
  webp: "image/webp",
  svg: "image/svg+xml",
  pdf: "application/pdf",
  txt: "text/plain",
  csv: "text/csv",
  json: "application/json",
};

export function getMimeTypeFromFilename(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  return extensionToMime[ext] || "application/octet-stream";
}

export function toDateSlotFromAvailableDate(
  dto: AvailableDateRangeDto
): IDateSlot | null {
  if (!dto.date) return null;

  const baseDate = moment(dto.date, "YYYY-MM-DD");

  return {
    date: baseDate,
    formatted: baseDate.format("YYYY-MM-DD"),
    dayNumber: baseDate.weekday(),
    mouthDay: baseDate.jDate(), // replace with .date() if not using moment-jalaali
  };
}
