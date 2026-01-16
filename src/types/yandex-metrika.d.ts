export {};

declare global {
  interface Window {
    ym?: (
      counterId: number,
      method: "reachGoal",
      goal: string,
      params?: Record<string, unknown>
    ) => void;
  }
}
