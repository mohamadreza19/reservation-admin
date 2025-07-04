import { OtpRequestDto } from "@/libs/api/generated/models";
import { create } from "zustand";

interface ISendOtp extends OtpRequestDto {
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  clearPhoneNumber: () => void;
}

export const useSendOtpStore = create<ISendOtp>((set) => ({
  phoneNumber: "",
  setPhoneNumber: (phone) => set(() => ({ phoneNumber: phone })),
  clearPhoneNumber: () => set(() => ({ phoneNumber: "" })),
}));

interface BusinessIdStore {
  businessId: string;
  setBusinessId: (id: string) => void;
  clearBusinessId: () => void;
}

export const useBusinessIdStore = create<BusinessIdStore>((set) => ({
  businessId: "",
  setBusinessId: (id) => set({ businessId: id }),
  clearBusinessId: () => set({ businessId: "" }),
}));
