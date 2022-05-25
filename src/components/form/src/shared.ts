import { Rules, Values } from "async-validator";
import { InjectionKey } from "vue";

export type Validate = (valid: boolean) => void;

export type FormType = {
  validate: (cb: (isValid: boolean) => void) => void;
};

export type FormItem = {
  validate: () => Promise<Values>;
};

export type FormProp = {
  model: Record<string, unknown>;
  rules?: Rules;
};

export const key: InjectionKey<FormProp> = Symbol("formProp");
