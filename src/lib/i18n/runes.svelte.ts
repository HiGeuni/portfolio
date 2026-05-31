let _locale = $state<'en' | 'ko'>('ko');

export const locale = {
  get current() {
    return _locale;
  },
  toggle() {
    _locale = _locale === 'ko' ? 'en' : 'ko';
  },
};
