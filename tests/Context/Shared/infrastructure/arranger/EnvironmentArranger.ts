import { injectable } from "inversify";

@injectable()
export abstract class EnvironmentArranger {
  public abstract arrange(): Promise<void>;

  public abstract close(): Promise<void>;
}
