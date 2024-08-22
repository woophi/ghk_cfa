import { BottomSheet } from '@alfalab/core-components/bottom-sheet';
import { CDNIcon } from '@alfalab/core-components/cdn-icon';
import { IconButton } from '@alfalab/core-components/icon-button';
import { Notification } from '@alfalab/core-components/notification';
import { ProgressBar } from '@alfalab/core-components/progress-bar';
import { TooltipDesktop } from '@alfalab/core-components/tooltip/desktop';
import { Typography } from '@alfalab/core-components/typography';
import { useCallback, useState } from 'react';
import main from './assets/main.jpg';
import { data } from './data';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';
import { useCopyToClipboard } from './useCopyToClipBoard';
import { sendDataToGA } from './utils/events';

export const App = () => {
  const [cfaValue, setCFA] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({ title: '', subtitle: '' });
  const [err, setError] = useState('');
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [open, setOpen] = useState(false);
  const { copiedText, copy } = useCopyToClipboard();
  const [isVisible, setIsVisible] = useState(false);

  const submit = useCallback(() => {
    setError('');
    if (!cfaValue) {
      setError('Введите количество ЦФА');
      setIsVisible(true);
      return;
    }
    setLoading(true);
    sendDataToGA({
      cfa_commission: cfaValue ? ((cfaValue * data.cfaPriceNumber) / 100).toFixed(2) : 0,
      cfa_quantity: cfaValue,
      cfa_sum: cfaValue * data.cfaPriceNumber,
    }).then(() => {
      LS.setItem(LSKeys.ShowThx, true);
      setLoading(false);
      setThx(true);
    });
  }, [cfaValue]);

  const hideNotification = useCallback(() => setIsVisible(false), []);

  const onUp = useCallback(() => {
    setCFA(v => (v >= 999 ? 999 : v + 1));
  }, []);
  const onDown = useCallback(() => {
    setCFA(v => (v <= 0 ? 0 : v - 1));
  }, []);

  const openModal = useCallback((data: { title: string; subtitle: string }) => {
    setModalData(data);
    setOpen(true);
  }, []);

  if (thxShow) {
    return <ThxLayout />;
  }

  return (
    <>
      <img src={main} width="100%" />
      <div className={appSt.container}>
        <div className={appSt.topBanner}>
          <div className={appSt.topBannerText}>
            <Typography.Text view="primary-medium" defaultMargins={false} color="primary-inverted">
              Собрано заявок
            </Typography.Text>
            <Typography.Text view="primary-medium" defaultMargins={false} weight="bold" color="primary-inverted">
              {data.minRequest.toLocaleString('ru')} / {data.maxRequest.toLocaleString('ru')}
            </Typography.Text>
          </div>
          <ProgressBar
            value={(data.minRequest / data.maxRequest) * 100}
            view="attention"
            className={appSt.topBannerProgress}
          />
          <div className={appSt.topBannerText}>
            <Typography.Text view="primary-small" defaultMargins={false} color="primary-inverted">
              Сбор заявок до
            </Typography.Text>
            <Typography.Text view="primary-small" defaultMargins={false} weight="bold" color="primary-inverted">
              01.10.2024 18:00 мск
            </Typography.Text>
          </div>
        </div>

        <div style={{ margin: '1rem 0' }}>
          <Typography.TitleResponsive tag="h1" view="medium" font="system" weight="medium">
            {data.titleName}
          </Typography.TitleResponsive>
          <Typography.Text view="primary-small" color="secondary">
            {data.titleType} • Срок {data.titlePeriod}
          </Typography.Text>
        </div>

        <Typography.Text view="primary-medium" defaultMargins={false}>
          {data.p1}
        </Typography.Text>
        <Typography.Text view="primary-medium" defaultMargins={false}>
          {data.p2}
        </Typography.Text>
        <Typography.Text view="primary-medium" defaultMargins={false}>
          {data.p3}
        </Typography.Text>

        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Номер ЦФА
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" weight="medium" defaultMargins={false}>
              {data.cfaNumber}
            </Typography.Text>
          </div>
        </div>

        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Цена ЦФА
            </Typography.Text>

            <div style={{ display: 'inline-flex', gap: '1rem' }}>
              <Typography.Text tag="p" view="primary-medium" weight="medium" defaultMargins={false}>
                {data.cfaPrice}
              </Typography.Text>
              <Typography.Text tag="p" view="primary-medium" color="secondary" defaultMargins={false}>
                1 ЦФА = 0,1 м2
              </Typography.Text>
            </div>
          </div>

          <IconButton
            view="primary"
            size={32}
            icon={<CDNIcon name="glyph_information-circle_m" color="#C1C1C3" />}
            onClick={() =>
              openModal({
                title: 'Цена ЦФА',
                subtitle:
                  'Цену устанавливает эмитент, она не меняется. Купить или продать актив по другой цене можно будет только на вторичном рынке.',
              })
            }
          />
        </div>

        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Объем выпуска в денежном выражении
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" weight="medium" defaultMargins={false}>
              {data.cfaVolume}
            </Typography.Text>
          </div>
        </div>

        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Объём выпуска в квадратных метрах
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" weight="medium" defaultMargins={false}>
              {data.cfaVolumeM2}
            </Typography.Text>
          </div>
        </div>

        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Выплата дохода
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" weight="medium" defaultMargins={false}>
              {data.cfaPeriodPayment}
            </Typography.Text>
          </div>
        </div>

        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Срок обращения
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" weight="medium" defaultMargins={false}>
              {data.cfaDuration}
            </Typography.Text>
          </div>
        </div>

        <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h2" view="medium" font="system" weight="medium">
          Ключевые даты
        </Typography.TitleResponsive>

        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Дата выпуска
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" weight="medium" defaultMargins={false}>
              01.10.2024
            </Typography.Text>
          </div>

          <IconButton
            view="primary"
            size={32}
            icon={<CDNIcon name="glyph_information-circle_m" color="#C1C1C3" />}
            onClick={() =>
              openModal({
                title: 'Дата выпуска',
                subtitle: 'В этот день купленный ЦФА появится в вашем портфеле',
              })
            }
          />
        </div>

        {data.hideSellDate ? null : (
          <div className={appSt.row}>
            <div>
              <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
                Возможная продажа не ранее
              </Typography.Text>
              <Typography.Text tag="p" view="primary-medium" weight="medium" defaultMargins={false}>
                05.10.2024
              </Typography.Text>
            </div>

            <IconButton
              view="primary"
              size={32}
              icon={<CDNIcon name="glyph_information-circle_m" color="#C1C1C3" />}
              onClick={() =>
                openModal({
                  title: 'Когда можно продать ЦФА',
                  subtitle: 'Дату, с которой можно перепродать ЦФА на вторичном рынке устанавливает эмитент',
                })
              }
            />
          </div>
        )}

        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Дата погашения
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" weight="medium" defaultMargins={false}>
              01.10.2027
            </Typography.Text>
          </div>

          <IconButton
            view="primary"
            size={32}
            icon={<CDNIcon name="glyph_information-circle_m" color="#C1C1C3" />}
            onClick={() =>
              openModal({
                title: 'Дата погашения',
                subtitle: 'В этот день эмитент перечислит вам деньги на счет',
              })
            }
          />
        </div>

        <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h2" view="medium" font="system" weight="medium">
          Почему стоит купить
        </Typography.TitleResponsive>

        {data.imgRows.map(imgRow => (
          <div key={imgRow.title} className={appSt.rowImg}>
            <img style={{ objectFit: 'contain' }} src={imgRow.img} width={48} height={48} />

            <div>
              <Typography.Text tag="p" view="primary-small" defaultMargins={false} color="secondary">
                {imgRow.title}
              </Typography.Text>
              <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
                {imgRow.subtitle}
              </Typography.Text>
            </div>
          </div>
        ))}

        <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h2" view="medium" font="system" weight="medium">
          Дополнительно
        </Typography.TitleResponsive>

        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Эмитент
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" weight="medium" defaultMargins={false}>
              {data.emitment}
            </Typography.Text>
          </div>
        </div>

        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Юридический адрес эмитента
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" weight="medium" defaultMargins={false}>
              {data.address}
            </Typography.Text>
          </div>
        </div>

        <TooltipDesktop view="hint" open={!!copiedText} content="Скопировано" position="top" offset={[0, -10]}>
          <div className={appSt.row} onClick={() => copy(data.site)}>
            <div>
              <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
                Cайт эмитента
              </Typography.Text>
              <Typography.Text
                tag="p"
                view="primary-medium"
                weight="medium"
                defaultMargins={false}
                style={{ textDecoration: 'underline' }}
              >
                {data.site}
              </Typography.Text>
            </div>

            <IconButton view="primary" size={32} icon={<CDNIcon name="glyph_copy-line_m" color="#C1C1C3" />} />
          </div>
        </TooltipDesktop>

        <div style={{ height: '160px' }} />
      </div>
      <div className={appSt.bottomBtn}>
        <div className={appSt.btn}>
          <div className={appSt.btnContainerWrap}>
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
                  <CDNIcon name="glyph_minus_m" className={appSt.inputActionsMinus} />
                </span>
                <div className={appSt.inputActionsHR} />

                <span onClick={onUp} style={{ display: 'inline-flex' }}>
                  <CDNIcon name="glyph_plus_m" />
                </span>
              </div>
            </div>

            <div className={appSt.btnContainer}>
              <div>
                <Typography.TitleResponsive font="system" tag="h2" view="xsmall" weight="bold">
                  {cfaValue * data.cfaPriceNumber} ₽
                </Typography.TitleResponsive>
                <Typography.Text color="secondary-inverted" tag="p" view="primary-medium" defaultMargins={false}>
                  Комиссия {cfaValue ? ((cfaValue * data.cfaPriceNumber) / 100).toFixed(2) : 0} ₽
                </Typography.Text>
              </div>
              <IconButton
                icon={<CDNIcon name="glyph_chevron-right_m" color="#000000" />}
                loading={loading}
                onClick={submit}
                className={appSt.btnArrow}
              />
            </div>
          </div>
        </div>
      </div>

      <BottomSheet
        title={
          <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
            {modalData.title}
          </Typography.Text>
        }
        open={open}
        onClose={() => setOpen(false)}
        hasCloser
      >
        <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
          {modalData.subtitle}
        </Typography.Text>
      </BottomSheet>

      <Notification
        badge="attention"
        title={err}
        visible={isVisible}
        offset={160}
        onClose={hideNotification}
        onCloseTimeout={hideNotification}
        position="bottom"
      />
    </>
  );
};
