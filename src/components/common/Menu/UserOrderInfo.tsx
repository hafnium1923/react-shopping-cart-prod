import styled from '@emotion/styled';
import { Text } from '../Text/Text';
import { Link } from 'react-router-dom';
import { URL } from '../../../abstract/constants';

const UserOrderInfo = () => {
  return (
    <EventInfoWrapper to={URL.ORDER}>
      <Text color="#fff" size="small">
        주문 목록
      </Text>
    </EventInfoWrapper>
  );
};

export default UserOrderInfo;

const EventInfoWrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 0 6px;
`;
