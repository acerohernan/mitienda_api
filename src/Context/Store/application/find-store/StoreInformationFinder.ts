import { injectable } from "inversify";

@injectable()
export class StoreInformationFinder {
  constructor() {}

  async run(): Promise<{ store: string }> {
    return {
      store: "store",
    };
  }
}
