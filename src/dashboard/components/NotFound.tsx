import Main from '@ludens-reklame/rubics-theme/dist/components/Main';
import Text from '@ludens-reklame/rubics-theme/dist/components/Text';
import { ButtonLink } from './ButtonLink';

export default function NotFound() {
  return (
    <Main>
      <Text element="h1" variant="display3">
        Ikke funnet
      </Text>
      <ButtonLink href="..">Tilbake</ButtonLink>
    </Main>
  );
}
