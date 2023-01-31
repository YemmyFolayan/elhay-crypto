import api from 'appRedux/api';
import { useState } from 'react';
import { useQuery } from 'react-query';

export const useStep = number => {
  const [step, setStep] = useState(number);
  const previousStep = () => setStep(step - 1);
  const nextStep = () => setStep(step + 1);
  return { step, previousStep, nextStep, setStep };
};

export const useUserData = () => {
  const { isLoading, data: userData, refetch } = useQuery(
    'userData',
    // {refetchOnWindowFocus:true},
    async () =>
      await api.get('/auth/logged-in-user').then(res => res.data.data),
  );
  // localStorage.setItem('userData', userData);
  return { isLoading, userData, refetch };
};

export const useFounders = (id, stripeAccountStatus) => {
  // alert('hhiii')
  const {
    isLoading: foundersLoad,
    data: balance,
    refetch: foundersRefetch,
    isPreviousData: isPreviousFoundersData,
  } = useQuery(
    'Founders balance',

    async () =>
      stripeAccountStatus === 'VERIFIED' &&
      (await api
        .get(
          `/stripe/fetchSingleFinancialAccount/${
            JSON.parse(localStorage.getItem('userData')).id
          }`,
        )
        .then(res => {
          // console.log(res.data.data.balance.cash.usd)
          return res.data.data.balance.cash.usd;
        })),
  );
  return { foundersLoad, balance, foundersRefetch, isPreviousFoundersData };
};

export const useRates = () => {
  const { isLoading, data: pricesData, refetch } = useQuery(
    'Merchant Prices',
    async () => await api.get('/merchant-prices').then(res => res.data),
  );
  // localStorage.setItem('userData', userData);
  return { isLoading, pricesData, refetch };
};

export const useSilaData = () => {
  const { isLoading, data: userSila } = useQuery(
    'userSila',
    async () =>
      await api.get('/sila/get_single_wallet').then(res => res.data.data[1]),
  );
  // localStorage.setItem('userData', userData);
  return { isLoading, userSila };
};

export const parseDate = (input, format) => {
  // format = format || 'yyyy-mm-dd'; // default format

  // var fc = input.replace(/-/g, "/")

  // var tt = fc.replace(" ", 'T')
  // var parts = input.match(/(\d+)/g),
  //     i = 0, fmt = {};
  // // extract date-part indexes from the format
  // format.replace(/(yyyy|dd|mm|hh|mm|ss)/g, function(part) { fmt[part] = i++; });
  // // format.replace(/ /g,"T");
  // var st = JSON.stringify(fc)
  // console.log(tt)
  // return new Date(tt);
  // var mytime = new Date (input)
  // var vall = moment(mytime, 'yyyy/mm/dd');
  // console.log(vall)
  // return vall;
  // format = format || 'yyyy-mm-dd'; // default format
  // var parts = input.match(/(\d+)/g),
  //     i = 0, fmt = {};
  // // extract date-part indexes from the format
  // format.replace(/(yyyy|dd|mm)/g, function(part) { fmt[part] = i++; });

  // return new Date(parts[fmt['yyyy']], parts[fmt['mm']]-1, parts[fmt['dd']]);
  // var fc = input.replace(/-/g, "/")

  var addT = input.replace(' ', 'T');
  var replaceZone = addT.replace('+00:00', '');
  var replaceDec = replaceZone.slice(0, -5);
  var replaceEmp = replaceDec.concat(' ');
  var final = replaceEmp.replace(' ', 'Z');

  // console.log(finall)

  return final;
};

export const openMail = value => {
  window.location.href = `mailto:${value}`;
};

export const useFoundersData = id => {
  const {
    isLoading: foundersLoad,
    data: balance,
    refetch: foundersRefetch,
  } = useQuery(
    'Founders balance',

    async () =>
      await api
        .get(`/stripe/fetchSingleFinancialAccount/${id}`)
        .then(res => res.data.balance.cash.usd),
  );
  // localStorage.setItem('userData', userData);
  return { foundersLoad, balance, foundersRefetch };
};

export const useAmount = value => {
  const [amount, setAmount] = useState(value);
  const handleAmount = e => {
    var newValue = parseFloat(
      e.target.value
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        .replace(/,/g, ''),
    ).toLocaleString('en-US');
    setAmount(newValue);
  };
  return { amount, setAmount, handleAmount };
};
