import { globalStyle, style } from '@vanilla-extract/css';

const bottomBtn = style({
  position: 'fixed',
  zIndex: 2,
  width: '100%',
  padding: '12px',
  bottom: 0,
});

const container = style({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  gap: '1rem',
  borderRadius: '24px 24px 0px 0px',
  backgroundColor: '#ffffff',
  marginTop: '-2rem',
  position: 'relative',
  zIndex: 1,
});

const topBanner = style({
  backgroundColor: '#000000',
  borderRadius: '1rem',
  padding: '12px',
  gap: '8px',
  display: 'flex',
  flexDirection: 'column',
  width: 'calc(100% - 2rem)',
  position: 'absolute',
  zIndex: '1',
  top: '-102px',
  left: '16px',
});
const topBannerText = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});
const topBannerProgress = style({
  backgroundColor: '#ffffff',
});

const btnContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign: 'left',
  gap: '1rem',
});
const btnContainerWrap = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});
const btn = style({
  borderRadius: '24px',
  padding: '1rem',
  height: '144px',
  backgroundColor: '#000000',
  color: '#fff',
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
  backgroundColor: '#333333',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '48px',
});
const inputValue = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

const inputActions = style({
  backgroundColor: '#000000',
  borderRadius: '8px',
  padding: '8px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  color: '#fff',
});
const inputActionsHR = style({
  height: '16px',
  width: '1px',
  backgroundColor: '#333333',
});
const inputActionsMinus = style({});

globalStyle(`${inputActionsMinus} > svg > rect:last-child`, {
  fill: '#fff',
});

const row = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '1rem',
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
  row,
  rowImg,
  topBanner,
  topBannerText,
  topBannerProgress,
  btnContainerWrap,
  inputActionsMinus,
};
