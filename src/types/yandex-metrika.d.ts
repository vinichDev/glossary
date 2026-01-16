export {};

declare global {
  interface Window {
    ym?: (
        counterId: number,
        method: string,
        goal: string | object,
        params?: Record<string, unknown>
    ) => void;
  }
}
