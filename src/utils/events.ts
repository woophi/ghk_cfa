declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

type Paylaod = {
  cfa_quantity: number;
  cfa_sum: number;
  cfa_commission: string | number;
};

export const sendDataToGA = async (payload: Paylaod) => {
  try {
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await fetch(
      'https://script.google.com/macros/s/AKfycbwaYuRusjAqUUXmTolinNRDspWVHIUax6ZTwJQZLhjJ4hEWkeMqgt0FiwRKtwFxDdmaqQ/exec',
      {
        redirect: 'follow',
        method: 'POST',
        body: JSON.stringify({ date, variant: 'cfa', ...payload }),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
      },
    );
  } catch (error) {
    console.error('Error!', error);
  }
};
