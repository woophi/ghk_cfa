import { style } from '@vanilla-extract/css';

const bottomBtn = style({
  position: 'fixed',
  zIndex: 2,
  width: 'calc(100% - 24px)',
  padding: '12px',
  bottom: 0,
});

const container = style({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  gap: '1rem',
});
const containerSecondary = style({
  display: 'flex',
  padding: '2rem 1rem 1rem',
  flexDirection: 'column',
  gap: '1rem',
  backgroundColor: '#F2F3F5',
  borderRadius: '24px 24px 0px 0px',
});

const btnContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign: 'left',
  gap: '1rem',
});
const btn = style({
  borderRadius: '24px',
  padding: '1rem',
});
const btnArrow = style({
  width: '48px',
  height: '48px',
  flexShrink: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: '1rem',
});

const box = style({
  padding: '1rem',
  border: '1px solid #F2F3F5',
  borderRadius: '1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

const inputContainer = style({
  borderRadius: '12px',
  padding: '4px 4px 4px 16px',
  backgroundColor: '#F3F4F5',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '40px',
});
const inputValue = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

const inputActions = style({
  backgroundColor: '#fff',
  borderRadius: '8px',
  padding: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});
const inputActionsHR = style({
  height: '16px',
  width: '1px',
  backgroundColor: '#F3F4F5',
});

const row = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const rowImg = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

export const appSt = {
  bottomBtn,
  container,
  btnContainer,
  btn,
  box,
  btnArrow,
  inputContainer,
  inputValue,
  inputActions,
  inputActionsHR,
  containerSecondary,
  row,
  rowImg,
};
