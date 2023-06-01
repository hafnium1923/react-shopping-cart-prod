import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { OrderListType } from '../types/types';

const useOrderFetch = () => {
  const navigation = useNavigate();

  const fetchAddOrderData = useMutation(
    async ({ body }: { body?: object }) => {
      const res = await fetch(`/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      return res;
    },
    {
      onSuccess: async (res) => {
        const orderLocation = res.headers.get('Location');
        navigation(`/${orderLocation}`);
      },
      onError: (e) => {
        console.log(e);
      },
    },
  );

  const addOrderDataAPI = (body?: object) => {
    fetchAddOrderData.mutate({ body });
  };

  const { data: orderListData, refetch: orderListRefetch } = useQuery<OrderListType[]>(
    'orderList',
    async () => {
      const res = await fetch(`/orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      return data;
    },
    {
      onError: (e) => {
        console.log(e);
      },
    },
  );

  return {
    addOrderDataAPI,
    orderListData,
    orderListRefetch,
  };
};

export default useOrderFetch;
