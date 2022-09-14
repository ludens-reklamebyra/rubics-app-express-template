import Text from '@ludens-reklame/rubics-theme/dist/components/Text';
import { TightBlock } from '../style-guide/Content';

interface Props {
  error: Error;
}

export default function ApiError({ error }: Props) {
  return (
    <TightBlock>
      <Text element="p" variant="display1">
        Error: {error.message}
      </Text>
    </TightBlock>
  );
}
