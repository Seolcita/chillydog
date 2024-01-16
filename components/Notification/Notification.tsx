import ReactDOM from 'react-dom';
import { Toast } from 'sk-storybook';

import * as S from './Notification.styles';

export type ToastVariant = 'success' | 'warning' | 'error' | 'info';

interface NotificationProps {
  variant: ToastVariant;
  message: string;
}

export const Notification = ({ variant, message }: NotificationProps) => {
  return ReactDOM.createPortal(
    <S.Container>
      <Toast variant={variant} message={message} />
    </S.Container>,
    document.getElementById('notifications')!
  );
};
