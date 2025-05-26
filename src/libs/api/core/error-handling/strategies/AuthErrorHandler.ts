import { IErrorHandler } from "../models";
import { dispatchManualErrorMessages } from "../utils/dispatchErrorMessages";

export class AuthErrorHandler implements IErrorHandler {
  handle(error: any) {
    dispatchManualErrorMessages(["Auth"], "خطای احراز هویت");
    console.warn("Authentication error:", error.response?.status);
    // Redirect to login, clear tokens, etc.
  }
}
