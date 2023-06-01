import { base64 } from '../service/apiURL';
import { checkCartListState, serverState } from '../service/atom';
import { CartItemType } from '../types/types';
import { useMutation, useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export const useCartFetch = () => {
  const serverURL = useRecoilValue(serverState);
  const setCheckCartList = useSetRecoilState(checkCartListState);

  const {
    data: cartData,
    refetch: cartRefetch,
    isLoading,
  } = useQuery<CartItemType[]>(
    'cart',
    async () => {
      const res = await fetch(`${serverURL}/cart-items`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${base64}`,
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

  const fetchCartData = useMutation(
    async ({
      method,
      cartId,
      body,
    }: {
      method: 'DELETE' | 'PATCH';
      cartId: number;
      body?: object;
    }) =>
      await fetch(`${serverURL}/cart-items/${cartId}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${base64}`,
        },
        body: JSON.stringify(body),
      }),
    {
      onSuccess: () => {
        cartRefetch();
      },
    },
  );

  const fetchAddCartData = useMutation(
    async ({ body }: { body?: object }) => {
      const res = await fetch(`${serverURL}/cart-items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${base64}`,
        },
        body: JSON.stringify(body),
      });
      return res;
    },
    {
      onSuccess: async (res) => {
        const cartId = Number(res.headers.get('Location')?.split('/')[2]);
        if (cartId) {
          setCheckCartList((prev) => [...prev, cartId]);
        }
        cartRefetch();
      },
      onError: (e) => {
        console.log(e);
      },
    },
  );

  const addCartItemAPI = (body?: object) => {
    fetchAddCartData.mutate({ body });
  };

  const changeCartQuantityAPI = (cartId: number, body?: object) =>
    fetchCartData.mutate({ method: 'PATCH', cartId, body });

  const deleteCartItemAPI = (cartId: number) => fetchCartData.mutate({ method: 'DELETE', cartId });

  return {
    cartData,
    isLoading,
    cartRefetch,
    addCartItemAPI,
    changeCartQuantityAPI,
    deleteCartItemAPI,
  };
};
