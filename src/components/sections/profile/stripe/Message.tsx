// Message.tsx
import React from 'react';

interface IProps {
  message: string;
}

const Message: React.FC<IProps> = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default Message;
