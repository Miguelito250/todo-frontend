export interface IConfigActionButtons {
  width: string;
  textToShow: string;
  action: 'action-cancel' | 'action-continue__proccess';
  type: 'submit' | 'button';
  disabled?: boolean;
}
