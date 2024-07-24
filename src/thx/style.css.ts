import { style } from '@vanilla-extract/css';

const container = style({
  display: 'flx',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 1rem',
});

const rocket = style({
  width: '100%',
});

export const thxSt = {
  container,
  rocket,
};
