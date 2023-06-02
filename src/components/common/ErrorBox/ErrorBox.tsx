import styled from '@emotion/styled';
import { ErrorIcon } from '../../../assets';
import { Text } from '../Text/Text';

<<<<<<< HEAD
type ErrorType = 'emptyList' | 'network' | 'emptyOrder';
=======
type ErrorType = 'emptyList' | 'network';
>>>>>>> upstream/hafnium1923

const ErrorBox = ({ errorType }: { errorType: ErrorType }) => {
  const errorText = {
    emptyList: '상품 리스트가 없습니다.',
<<<<<<< HEAD
    emptyOrder: '잘못된 접근입니다.',
=======
>>>>>>> upstream/hafnium1923
    network: '잠시 후 다시 시도해주세요.',
  };

  return (
    <ErrorWrapper>
      <ErrorIcon width={100} />
      <Text weight="normal" size="large">
        {errorText[errorType]}
      </Text>
    </ErrorWrapper>
  );
};

export default ErrorBox;

const ErrorWrapper = styled.div`
  display: flex;
  align-items: center;
`;
