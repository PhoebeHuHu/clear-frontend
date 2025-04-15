import {
  IEDIDecodeResponse,
  ICargoItem,
  IEDIGenerateResponse,
} from "@/types/cargo";
import { http } from "@/utils/request";

export const ediService = {
  generateEDI: async (items: ICargoItem[]): Promise<IEDIGenerateResponse> => {
    return http.post<IEDIGenerateResponse>("/edi/generate", { items });
  },

  decodeEDI: async (ediContent: string): Promise<IEDIDecodeResponse> => {
    return http.post<IEDIDecodeResponse>("/edi/decode", {
      edi_content: ediContent,
    });
  },
};
