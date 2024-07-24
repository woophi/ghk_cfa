import { BottomSheet } from '@alfalab/core-components/bottom-sheet';
import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { CDNIcon } from '@alfalab/core-components/cdn-icon';
import { Gap } from '@alfalab/core-components/gap';
import { IconButton } from '@alfalab/core-components/icon-button';
import { Typography } from '@alfalab/core-components/typography';
import { useCallback, useState } from 'react';
import cfa from './assets/cfa.png';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';

export const App = () => {
  const [cfaValue, setCFA] = useState(0);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState('');
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [open, setOpen] = useState(false);

  const submit = useCallback(() => {
    if (!cfaValue) {
      setError('У вас не выбрано ни одной категории');
      return;
    }
    setLoading(true);
    // LS.setItem(LSKeys.ShowThx, true);
    setLoading(false);
    setThx(true);
    // sendDataToGA(checkedBox).then(() => {
    //   LS.setItem(LSKeys.ShowThx, true);
    //   setLoading(false);
    //   setThx(true);
    // });
  }, [cfaValue]);

  const onUp = useCallback(() => {
    setCFA(v => (v >= 999 ? 999 : v + 1));
  }, []);
  const onDown = useCallback(() => {
    setCFA(v => (v <= 0 ? 0 : v - 1));
  }, []);

  if (thxShow) {
    return <ThxLayout />;
  }

  return (
    <>
      <div className={appSt.container}>
        <Typography.TitleResponsive tag="h1" view="medium" font="system" weight="medium">
          Заявка на ЦФА
        </Typography.TitleResponsive>

        <div className={appSt.box}>
          <img src={cfa} width={48} height={48} />

          <div>
            <Typography.Text tag="p" weight="bold" view="primary-medium" defaultMargins={false}>
              Индекс Санкт-Петербург
            </Typography.Text>
            <Typography.Text tag="p" view="primary-small" defaultMargins={false}>
              Недвижимость
            </Typography.Text>
          </div>
        </div>

        <div className={appSt.inputContainer}>
          <div className={appSt.inputValue}>
            <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
              {cfaValue}
            </Typography.Text>
            <Typography.Text tag="p" weight="bold" view="primary-medium" defaultMargins={false}>
              ЦФА
            </Typography.Text>
          </div>

          <div className={appSt.inputActions}>
            <span onClick={onDown} style={{ display: 'inline-flex' }}>
              <CDNIcon name="glyph_minus_m" />
            </span>
            <div className={appSt.inputActionsHR} />

            <span onClick={onUp} style={{ display: 'inline-flex' }}>
              <CDNIcon name="glyph_plus_m" />
            </span>
          </div>
        </div>
      </div>
      <div className={appSt.containerSecondary}>
        <Typography.TitleResponsive tag="h1" view="medium" font="system" weight="medium">
          Индекс Санкт-Петербург
        </Typography.TitleResponsive>
        <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
          Цифровые квадратные метры — это такие специальные квадратные метры, которые можно быстро покупать и продавать
        </Typography.Text>
        <div />
        <div>
          <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
            Тип ЦФА
          </Typography.Text>
          <Typography.Text tag="p" view="primary-medium" weight="bold" defaultMargins={false}>
            Цифровые обязательства
          </Typography.Text>
        </div>

        <div />
        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Цена ЦФА
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" weight="bold" defaultMargins={false}>
              1000 ₽
            </Typography.Text>
          </div>
          <IconButton
            view="primary"
            onClick={() => setOpen(true)}
            size={32}
            icon={<CDNIcon name="glyph_information-circle_m" />}
          />
        </div>

        <div />
        <div>
          <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
            Объем выпуска в денежном выражении
          </Typography.Text>
          <Typography.Text tag="p" view="primary-medium" weight="bold" defaultMargins={false}>
            от 1 000 000 ₽ до 700 000 000 ₽
          </Typography.Text>
        </div>

        <div />
        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Тип процентной ставки
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" weight="bold" defaultMargins={false}>
              Фиксированная
            </Typography.Text>
          </div>
          <IconButton view="primary" size={32} icon={<CDNIcon name="glyph_information-circle_m" />} />
        </div>

        <div />
        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Процентная ставка
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" weight="bold" defaultMargins={false}>
              19,75%
            </Typography.Text>
          </div>
          <IconButton view="primary" size={32} icon={<CDNIcon name="glyph_information-circle_m" />} />
        </div>

        <div />
        <div>
          <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
            Процентный доход выплачиваемости
          </Typography.Text>
          <Typography.Text tag="p" view="primary-medium" weight="bold" defaultMargins={false}>
            Ежемесячно
          </Typography.Text>
        </div>

        <div />
        <div>
          <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
            Срок обращения
          </Typography.Text>
          <Typography.Text tag="p" view="primary-medium" weight="bold" defaultMargins={false}>
            8 месяцев
          </Typography.Text>
        </div>

        <Gap size={96} />
      </div>
      <div className={appSt.bottomBtn}>
        <ButtonMobile loading={loading} onClick={submit} block className={appSt.btn} view="primary" hint={err}>
          <div className={appSt.btnContainer}>
            <div>
              <Typography.TitleResponsive font="system" tag="h2" view="xsmall" weight="bold">
                1000 ₽
              </Typography.TitleResponsive>
              <Typography.Text color="secondary-inverted" tag="p" view="primary-medium" defaultMargins={false}>
                Комиссия 0 ₽
              </Typography.Text>
            </div>
            <div className={appSt.btnArrow}>
              <CDNIcon name="glyph_chevron-right_m" color="#000000" />
            </div>
          </div>
        </ButtonMobile>
      </div>

      <BottomSheet
        title={
          <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
            Цена ЦФА
          </Typography.Text>
        }
        open={open}
        onClose={() => setOpen(false)}
        hasCloser
      >
        <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
          Цифровые квадратные метры — это такие специальные квадратные метры, которые можно быстро покупать и продавать
        </Typography.Text>
      </BottomSheet>
    </>
  );
};
