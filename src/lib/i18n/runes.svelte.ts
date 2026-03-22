import { en } from './translations';

export const t = en;

export const locale = {
  get current() {
    return 'en';
  },
  set(value: string) {
    // no-op
  },
  toggle() {
    // no-op
  },
};
