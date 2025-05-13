import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

export function SignupSucess() {
  const navigate = useNavigate();
  const { t } = useTranslation('signup');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('success.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{t('success.description')}</p>
        <Button onClick={() => navigate('/login')}>{t('success.cta')}</Button>
      </CardContent>
    </Card>
  );
}
